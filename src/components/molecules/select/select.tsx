import React from 'react';
import styled from 'styled-components';

import { SelectButton } from '../../atoms';

interface SelectProps {
  isLeft: boolean;
  leftWord: string;
  rightWord: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  wrapperStyles?: React.CSSProperties;
}

export const Select = ({
  leftWord,
  rightWord,
  isLeft,
  onLeftClick,
  onRightClick,
  wrapperStyles = {},
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
