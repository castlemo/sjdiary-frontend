import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

import { CONTENTS_MAX_LENGTH } from '../../../constant';

const StyledDiaryCreateCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-height: 60px;
  min-height: 60px;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.black1};
`;

type PropTypes = {
  contents: string;
  inputPlaceHolder: string;
  setContents: (value: string) => void;
};

export const DiaryCreateCard = ({
  contents = '',
  inputPlaceHolder = '',
  setContents = () => {},
}: PropTypes) => {
  const theme = useTheme();

  return (
    <StyledDiaryCreateCard>
      <input
        style={{
          width: '90%',
          fontSize: 16,
          color: contents.length > 0 ? theme.colors.white1 : theme.colors.grey2,
          backgroundColor: 'transparent',
          border: 'none',
          outlineStyle: 'none',
        }}
        maxLength={CONTENTS_MAX_LENGTH}
        type="text"
        value={contents}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = e;
          setContents(target.value);
        }}
        placeholder={inputPlaceHolder}
      />
      <span
        style={{
          width: '90%',
          fontSize: 12,
          fontFamily: theme.fonts.spoqaHanSansNeo,
          color: theme.colors.grey1,
          marginTop: 2,
        }}
      >
        드래그해서 시간을 설정해주세요.
      </span>
    </StyledDiaryCreateCard>
  );
};
