import { useMemo } from 'react';
import styled from 'styled-components';
import { DAYS } from '../../constant';

import { MeOutput } from '../../graphQL/types';
import { MainHeader } from '../organisms';
import { DiaryCalendar } from '../organisms/calendar';

const StyledMainTemplate = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.black2};
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCalendar = styled.div`
  width: 100%;
  height: 8%;
  min-height: 75px;

  display: flex;
  flex-direction: row;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  border-left: 0px;
  border-right: 0px;

  cursor: pointer;
`;

const StyledCalendarItem = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  font-family: Spoqa Han Sans Neo;

  font-size: 16px;
  color: ${({ theme, isToday }) =>
    isToday ? theme.colors.purple1 : theme.colors.grey1};
`;

const StyledDiaryWrapper = styled.div``;

interface PropTypes {
  dataMe?: MeOutput;
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
}

export const MainTemplate = ({
  dataMe,
  today = new Date(),
  setToday = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledMainTemplate>
      <MainHeader dataMe={dataMe} today={today} setToday={setToday} />
      <StyledBody>
        <DiaryCalendar dataMe={dataMe} today={today} setToday={setToday} />
        <StyledDiaryWrapper>test</StyledDiaryWrapper>
      </StyledBody>
    </StyledMainTemplate>
  );
};
