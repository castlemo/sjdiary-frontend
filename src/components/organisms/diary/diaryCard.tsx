import { FC, useCallback, useEffect, useRef } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled, { useTheme } from 'styled-components';

import { Browser, DragItemType, THIRTY_MINUTES_TIME } from '../../../constant';
import { GetReviewOutput, GetTodoOutput } from '../../../graphQL/types';
import { useBrowserInfo } from '../../../hooks';

type StyleType = 'drag' | 'none' | 'timeLess';

const StyledDiaryCardWrapper = styled.div<{
  styleType: StyleType;
  height: number;
  left: number;
  top: number;
  parentWidth: number;
  isDragging: boolean;
}>`
  position: ${({ styleType }) => (styleType === 'none' ? 'absolute' : null)};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  width: ${({ parentWidth }) => parentWidth}px;
  height: ${({ height }) => height}px;

  display: ${({ isDragging }) => (isDragging ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-content: center;

  color: ${({ theme }) => theme.colors.purple1};
  background-color: ${({ theme }) => theme.colors.black2};

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;
`;

const StyledResizingDragBox = styled.div<{ parentWidth: number }>`
  position: absolute;
  width: ${({ parentWidth }) => parentWidth}px;
  height: 5px;
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
  item,
  originalIndex = 0,
  parentWidth,
  today,
  height,
  left,
  setIsCanDrop,
}): JSX.Element => {
  const theme = useTheme();
  const { browser } = useBrowserInfo();

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
    type: dragItemType,
    item: item,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, resizeTopRef, resizeTopPreview] = useDrag({
    type: 'resize-top',
    item: {
      ...item,
      type: dragItemType,
    },
  });

  const [, resizeBottomRef, resizeBottomPreview] = useDrag({
    type: 'resize-bottom',
    item: {
      ...item,
      type: dragItemType,
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
      ref={diaryCardRef}
    >
      <div
        ref={dragRef}
        style={{
          position: 'absolute',
          width: parentWidth * 0.9,
          height: height > 60 ? height * 0.9 : height * 0.7,
          display: 'flex',
          justifySelf: 'center',
          alignSelf: 'center',
          cursor: 'move',
        }}
      />

      {styleType === 'none' && (
        <>
          <StyledResizingDragBox
            ref={resizeTopRef}
            parentWidth={parentWidth}
            style={{
              top: 0,
              backgroundColor: 'pink',
            }}
          />

          <StyledResizingDragBox
            ref={resizeBottomRef}
            parentWidth={parentWidth}
            style={{
              bottom: 0,
              backgroundColor: 'blue',
            }}
          />
        </>
      )}

      <span
        style={{
          height: 'auto',
          fontSize: 16,
          fontFamily: theme.fonts.spoqaHanSansNeo,
          marginLeft: 20,
        }}
      >
        {item.content}
      </span>
      {height > 30 && (
        <span
          style={{
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
