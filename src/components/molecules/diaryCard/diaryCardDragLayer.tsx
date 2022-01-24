import { CSSProperties, FC, memo } from 'react';
import { DragLayerMonitor, useDragLayer, XYCoord } from 'react-dnd';
import styled from 'styled-components';

import { getDiaryCardHeight } from '../../../utils';
import { DiaryCard } from '../../organisms';

const StyledDragLayer = styled.div<{ parentWidth: number; height: number }>`
  position: fixed;
  pointer-events: none;

  z-index: 100;

  left: 0;
  top: 0;

  width: ${({ parentWidth }) => parentWidth}px;
  height: ${({ height }) => height}px;

  box-shadow: 5px 5px 10px #000000;

  background-color: ${({ theme }) => theme.colors.black2};
`;

const getDragLayerStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
): CSSProperties => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

interface PropTypes {
  parentWidth?: number;
}

export const DiaryCardDragLayer: FC<PropTypes> = ({ parentWidth = 0 }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor: DragLayerMonitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging) {
    return null;
  }

  const { startedAt, finishedAt } = item.item;
  const height = getDiaryCardHeight(startedAt, finishedAt);

  return (
    <StyledDragLayer
      parentWidth={parentWidth}
      style={getDragLayerStyles(initialOffset, currentOffset)}
      height={height}
    >
      <DiaryCard
        left={1}
        height={height}
        parentWidth={parentWidth}
        styleType="drag"
        todo={item.item}
        originalIndex={item.originalIndex}
        today={item.today}
      />
    </StyledDragLayer>
  );
};
