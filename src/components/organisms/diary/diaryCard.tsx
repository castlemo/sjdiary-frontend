import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled, { useTheme } from 'styled-components';

import { Browser, DragItemType, THIRTY_MINUTES_TIME } from '../../../constant';
import {
  GetReviewOutput,
  GetTodoOutput,
  UpdateReviewMutationInput,
  UpdateTodoMutationInput,
} from '../../../graphQL/types';
import { useBrowserInfo } from '../../../hooks';
import { ColorCheckButton } from '../../atoms';

type StyleType = 'drag' | 'none' | 'timeLess';

type StyledDiaryCardWrapperPropTypes = {
  styleType: StyleType;
  height: number;
  left: number;
  top: number;
  parentWidth: number;
  isDragging: boolean;
  isCompleted: boolean;
  isOverTime: boolean;
  itemType: DragItemType;
};

const StyledDiaryCardWrapper = styled.div<StyledDiaryCardWrapperPropTypes>`
  position: ${({ styleType }) => (styleType === 'none' ? 'absolute' : null)};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  width: ${({ parentWidth }) => parentWidth}px;
  height: ${({ height }) => height}px;

  display: ${({ isDragging }) => (isDragging ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.purple1};
  background-color: ${({ theme, isCompleted, isOverTime, itemType }) => {
    if (itemType === 'review') {
      return theme.colors.black2;
    }

    return isCompleted
      ? theme.colors.purple3
      : isOverTime
      ? theme.colors.green2
      : theme.colors.black2;
  }};

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  z-index: 1;
`;

const StyledResizingDragBox = styled.div<{ parentWidth: number }>`
  position: absolute;
  width: ${({ parentWidth }) => parentWidth}px;
  height: 5px;
  cursor: ns-resize;
`;

type PropTypes = {
  itemType: DragItemType;
  styleType: StyleType;
  item: GetReviewOutput | GetTodoOutput;
  parentWidth: number;
  height: number;
  today: Date;
  left: number;
  originalIndex?: number;
  setIsCanDrop: (v: boolean) => void;
  isCompleted?: boolean;
  updateItem: (
    input: UpdateTodoMutationInput | UpdateReviewMutationInput,
  ) => void;
};

export const DiaryCard: FC<PropTypes> = ({
  itemType,
  styleType,
  item,
  originalIndex = 0,
  parentWidth,
  today,
  height,
  left,
  setIsCanDrop,
  isCompleted = false,
  updateItem,
}): JSX.Element => {
  const theme = useTheme();
  const { browser } = useBrowserInfo();

  const dragDivRef = useRef<HTMLDivElement>(null);
  const dragInputRef = useRef<HTMLInputElement>(null);

  const [isDeletedModal, setIsDeletedModal] = useState(false);
  const [content, setContent] = useState(item.content);

  const onEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && 0 < content.length) {
      updateItem({
        id: item.id,
        content,
      });
      setContent('');
    }
  };

  const onChangeContentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const isOverTime = useMemo(() => {
    if (item.finishedAt) {
      return item.finishedAt < today.getTime();
    }

    return false;
  }, [today, item]);

  const diaryCardRef = useRef<HTMLDivElement>(null);

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
    [item],
  );

  const { startedAt, finishedAt } = item;
  const startedStr = timeToString(startedAt);
  const finishedStr = timeToString(finishedAt);

  const top = getTop(startedAt, finishedAt);

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: itemType,
    item: item,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, resizeTopRef, resizeTopPreview] = useDrag({
    type: 'resize-top',
    item: {
      ...item,
      type: itemType,
    },
  });

  const [, resizeBottomRef, resizeBottomPreview] = useDrag({
    type: 'resize-bottom',
    item: {
      ...item,
      type: itemType,
    },
  });

  useEffect(() => {
    if (diaryCardRef.current) {
      dragPreview(diaryCardRef);
      if (browser.name === Browser.Firefox) {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
      }
      resizeTopPreview(getEmptyImage());
      resizeBottomPreview(getEmptyImage());
    }
  }, [diaryCardRef]);

  useEffect(() => {
    if (dragDivRef.current) {
      dragRef(dragDivRef);
    }
  }, [dragDivRef]);

  return (
    <StyledDiaryCardWrapper
      ref={diaryCardRef}
      itemType={itemType}
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
      isCompleted={isCompleted}
      isOverTime={isOverTime}
      onContextMenu={(e) => {
        e.preventDefault();
        console.log('우클!');
      }}
    >
      {styleType === 'none' && (
        <>
          <StyledResizingDragBox
            ref={resizeTopRef}
            parentWidth={parentWidth}
            style={{
              top: 0,
            }}
          />

          <StyledResizingDragBox
            ref={resizeBottomRef}
            parentWidth={parentWidth}
            style={{
              bottom: 0,
            }}
          />
        </>
      )}

      <div
        ref={dragDivRef}
        style={{
          position: 'absolute',
          width: parentWidth * 0.9,
          height: height > 60 ? height * 0.9 : height * 0.7,
          display: 'flex',
          justifySelf: 'center',
          alignSelf: 'center',
          cursor: 'move',
          left: itemType === 'todo' ? 0 : undefined,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'center',
          cursor: 'move',
        }}
      >
        {itemType === 'todo' ? (
          <input
            ref={dragInputRef}
            style={{
              height: 'auto',
              fontSize: 16,
              color: isCompleted
                ? theme.colors.purple1
                : isOverTime
                ? theme.colors.green1
                : theme.colors.purple1,
              fontFamily: theme.fonts.spoqaHanSansNeo,
              backgroundColor: 'transparent',
              border: 0,
              outline: 'none',
              zIndex: 1,
            }}
            defaultValue={content}
            onKeyPress={onEnterPress}
            onChange={onChangeContentInput}
            onMouseOver={() => {
              if (dragInputRef.current) {
                dragRef(dragInputRef);
              }
            }}
            onMouseLeave={() => {
              if (dragDivRef.current) {
                dragRef(dragDivRef);
              }
            }}
          />
        ) : (
          <span
            style={{
              height: 'auto',
              fontSize: 16,
              fontFamily: theme.fonts.spoqaHanSansNeo,
            }}
          >
            {content}
          </span>
        )}

        {height > 30 && (
          <span
            style={{
              height: 'auto',
              fontSize: 12,
              fontFamily: theme.fonts.spoqaHanSansNeo,
            }}
          >
            {startedStr} ~ {finishedStr}
          </span>
        )}
      </div>

      {itemType === 'todo' && item.startedAt && item.finishedAt && (
        <ColorCheckButton
          isChecked={isCompleted}
          onClick={(val: boolean) => {
            updateItem({
              id: item.id,
              isCompleted: val,
            });
          }}
        />
      )}
    </StyledDiaryCardWrapper>
  );
};
