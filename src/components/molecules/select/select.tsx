/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { SelectButton } from '../../atoms';

interface SelectProps {
  isLeft: boolean;
  leftWord: string;
  rightWord: string;
  wrapperStyles?: React.CSSProperties;
  onLeftClick: () => void;
  onRightClick: () => void;
  onCloseModal?: (options?: { isAll: boolean }) => void;
}

export const Select = ({
  leftWord,
  rightWord,
  isLeft,
  onLeftClick,
  onRightClick,
  wrapperStyles = {},
  onCloseModal = () => {},
}: SelectProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: 376,
        height: 50,
        backgroundColor: '#F7F5FF',
        borderRadius: 100,
        ...wrapperStyles,
      }}
      onMouseDown={() => {
        onCloseModal({ isAll: true });
      }}
    >
      <SelectButton id="left" isCheck={isLeft} onClick={onLeftClick}>
        {leftWord}
      </SelectButton>
      <SelectButton id="right" isCheck={!isLeft} onClick={onRightClick}>
        {rightWord}
      </SelectButton>
    </div>
  );
};
