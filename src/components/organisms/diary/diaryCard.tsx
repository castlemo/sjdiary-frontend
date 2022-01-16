import { FC, useEffect, useMemo, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import styled, { useTheme } from 'styled-components';
import { TodoOutput } from '../../../graphQL/types';

const StyledDiaryCard = styled.div<{
  height: number;
  isDragging: boolean;
  isOver: boolean;
}>`
  width: auto;
  height: ${({ height }) => height}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  color: ${({ theme }) => theme.colors.purple1};

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  z-index: ${({ isDragging }) => (isDragging ? 2 : 0)};

  padding: 0px 0px 0px 20px;

  opacity: 1;
`;

type DragItem = {
  id: number;
  type: string;
  index: number;
};

type PropTypes = {
  todo: TodoOutput;
  originalIndex: number;
  moveCard: (id: number, toIndex: number) => void;
};

const ItemTypes = {
  CARD: 'card',
} as const;

export const DiaryCard: FC<PropTypes> = ({
  todo,
  originalIndex,
  moveCard = () => {},
}) => {
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const timeToString = (date: Date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();

    const str = `${hour}시`;

    if (minute > 0) {
      return `${str} ${minute}분`;
    }

    return str;
  };

  const getHeight = (startedAt: Date, finishedAt: Date) => {
    const THIRTY_MINUTES_TIMESTAMP = 1000 * 60 * 30;

    return (
      Math.floor((+finishedAt - +startedAt) / THIRTY_MINUTES_TIMESTAMP) * 30
    );
  };

  const { startedAt, finishedAt } = todo;
  const startedStr = useMemo(() => timeToString(startedAt), [todo]);
  const finishedStr = useMemo(() => timeToString(finishedAt), [todo]);

  const height = useMemo(() => getHeight(startedAt, finishedAt), [todo]);

  const [{ isOver, handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover({ id: dragId }: DragItem) {
      if (!ref.current) {
        return;
      }

      if (dragId !== todo.id) {
        moveCard(dragId, originalIndex);
      }
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ type: ItemTypes.CARD, id: todo.id, index: originalIndex }),
    collect: (monitor: Record<string, any>) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      console.log(dropResult, monitor.getItem());
      const { id } = monitor.getItem();
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        moveCard(id, originalIndex);
      }
    },
  });

  useEffect(() => {
    drop(dragPreview(ref));
    drag(ref);
  }, [ref]);

  return (
    <StyledDiaryCard
      height={height}
      ref={ref}
      isDragging={isDragging}
      isOver={isOver}
      data-handler-id={handlerId}
    >
      <span
        style={{
          width: '100%',
          height: 'auto',
          fontSize: 16,
          fontFamily: theme.fonts.spoqaHanSansNeo,
        }}
      >
        {todo.contents}
      </span>
      {height > 30 && (
        <span
          style={{
            width: '100%',
            height: 'auto',
            fontSize: 12,
            fontFamily: theme.fonts.spoqaHanSansNeo,
          }}
        >
          {startedStr} ~ {finishedStr}
        </span>
      )}
    </StyledDiaryCard>
  );
};
