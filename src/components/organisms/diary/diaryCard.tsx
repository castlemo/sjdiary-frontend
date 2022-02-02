import { FC, useCallback, useEffect } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled, { useTheme } from 'styled-components';

import { DragItemType, THIRTY_MINUTES_TIME } from '../../../constant';
import { GetReviewOutput, GetTodoOutput } from '../../../graphQL/types';

type StyleType = 'drag' | 'none' | 'timeLess';

const StyledDiaryCardWrapper = styled.div<{
  styleType: StyleType;
  height: number;
  left: number;
  top: number;
  parentWidth: number;
  isDragging: boolean;
}>`
  position: ${({ styleType }) => {
    switch (styleType) {
      case 'none':
        return 'absolute';
      default:
        return null;
    }
  }};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  width: ${({ parentWidth }) => parentWidth}px;
  height: ${({ height }) => height}px;

  display: ${({ isDragging }) => (isDragging ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-content: center;

  color: ${({ theme }) => theme.colors.purple1};

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  z-index: ${({ isDragging }) => (isDragging ? 1000 : undefined)};

  cursor: ns-resize;
`;

type PropTypes = {
  dragItemType: DragItemType;
  styleType: StyleType;
  item: GetTodoOutput | GetReviewOutput;
  parentWidth: number;
  height: number;
  today: Date;
  left: number;
  originalIndex?: number;
  setIsCanDrop: (v: boolean) => void;
  is?: boolean;
};

export const DiaryCard: FC<PropTypes> = ({
  dragItemType,
  styleType,
  item: todo,
  originalIndex = 0,
  parentWidth,
  today,
  height,
  left,
  setIsCanDrop,
}): JSX.Element => {
  const theme = useTheme();

  const timeToString = (timestamp?: number) => {
    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    const str = `${hour}시`;

    if (minute > 0) {
      return `${str} ${minute}분`;
    }

    return str;
  };

  const getTop = useCallback(
    (startedAt?: number, finishedAt?: number): number => {
      if (!startedAt || !finishedAt) {
        return 60 + originalIndex * 30;
      }

      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();

      const zeroTimeToday = +new Date(year, month, date, 0, 0, 0);

      const top =
        Math.floor((startedAt - zeroTimeToday) / THIRTY_MINUTES_TIME) * 30;

      return top;
    },
    [todo],
  );

  const { startedAt, finishedAt } = todo;
  const startedStr = timeToString(startedAt);
  const finishedStr = timeToString(finishedAt);

  const top = getTop(startedAt, finishedAt);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: dragItemType,
    item: () => ({
      ...todo,
    }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: false });
  }, [dragPreview]);

  return (
    <StyledDiaryCardWrapper
      styleType={styleType}
      height={height}
      top={top}
      left={left}
      parentWidth={parentWidth ?? 0}
      isDragging={isDragging}
      onDragOver={() => {
        setIsCanDrop(false);
      }}
      onDragLeave={() => {
        setIsCanDrop(true);
      }}
    >
      {styleType === 'none' && (
        <div
          ref={drag}
          style={{
            position: 'absolute',
            width: '90%',
            height: height > 60 ? '90%' : '70%',
            display: 'flex',
            justifySelf: 'center',
            alignSelf: 'center',
            cursor: 'move',
          }}
        />
      )}

      <span
        style={{
          width: '100%',
          height: 'auto',
          fontSize: 16,
          fontFamily: theme.fonts.spoqaHanSansNeo,
          marginLeft: 20,
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
            marginLeft: 20,
          }}
        >
          {startedStr} ~ {finishedStr}
        </span>
      )}
    </StyledDiaryCardWrapper>
  );
};
