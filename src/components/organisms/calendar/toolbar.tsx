import styled, { useTheme } from 'styled-components';
import { useMemo } from 'react';

import { getWeek } from '../../../utils';
import { LeftArrowButton, RightArrowButton } from '../../../assets/img';
import { MeOutput } from '../../../graphQL/types';

const StyledHeaderWrapper = styled.header`
  width: 100%;
  height: 10%;
  min-height: 90px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLeftHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin-left: 10px;
`;

const StyledRightHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin-right: 40px;
`;

const StyledTodayButton = styled.button`
  margin: 3px 0px 0px 10px;

  width: 48px;
  height: 31px;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 4px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.black2};

  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey1};

  cursor: pointer;
`;

type NavigateActionType = 'TODAY' | 'PREV' | 'NEXT';

type PropTypes = {
  dataMe?: MeOutput;
};

type BigCalendarPropTypes = PropTypes & {
  date: Date;
  onNavigate: (action: NavigateActionType) => void;
};

export const ToolBar =
  ({ dataMe }: PropTypes) =>
  ({ date, onNavigate }: BigCalendarPropTypes) => {
    const theme = useTheme();

    const week = useMemo(() => getWeek(date), [date]);

    const month = useMemo(() => date.getMonth() + 1, [date]);

    const navigate = (action: NavigateActionType) => {
      onNavigate(action);
    };

    const goToLastWeek = () => {
      onNavigate('PREV');
    };

    const goToNextWeek = () => {
      onNavigate('NEXT');
    };

    const goToToday = () => {
      onNavigate('TODAY');
    };

    return (
      <StyledHeaderWrapper>
        <StyledLeftHeader>
          <LeftArrowButton
            style={{
              cursor: 'pointer',
              marginTop: 3,
            }}
            onClick={goToLastWeek}
          />
          <span
            style={{
              fontSize: 30,
              color: theme.colors.white1,
            }}
          >
            {month}월 {week}째주
          </span>
          <RightArrowButton
            style={{
              cursor: 'pointer',
              marginTop: 3,
            }}
            onClick={goToNextWeek}
          />
          <StyledTodayButton onClick={goToToday}>오늘</StyledTodayButton>
        </StyledLeftHeader>
        <StyledRightHeader>
          <span
            style={{
              textAlign: 'center',
              lineHeight: '40px',
              fontSize: 18,
              color: theme.colors.purple1,
              marginRight: 16,
            }}
          >
            오늘의 도달률 0%
          </span>
          <img
            style={{
              display: 'table-cell',
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            src={dataMe?.profileImageUrl}
            alt="프로필사진"
          />
        </StyledRightHeader>
      </StyledHeaderWrapper>
    );
  };
