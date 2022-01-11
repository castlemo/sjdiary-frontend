import { useMemo } from 'react';
import styled from 'styled-components';
import { DAYS } from '../../constant';

import { MeOutput } from '../../graphQL/types';
import { MainHeader } from '../organisms';

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
  flex-direction: row;

  /* background-color: pink; */
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

interface PropTypes {
  dataMe?: MeOutput;
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
  onClickUpdateToday: (type: 'left' | 'right') => void;
}

export const MainTemplate = ({
  dataMe,
  today = new Date(),
  setToday = () => {},
  onClickUpdateToday = () => {},
}: PropTypes): JSX.Element => {
  const dates = useMemo(() => {
    const startOfWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 3,
    );

    return [...new Array(7).keys()].map(
      (num) =>
        new Date(
          startOfWeekDate.getFullYear(),
          startOfWeekDate.getMonth(),
          startOfWeekDate.getDate() + num,
        ),
    );
  }, [today]);

  return (
    <StyledMainTemplate>
      <MainHeader
        dataMe={dataMe}
        today={today}
        setToday={setToday}
        onClickUpdateToday={onClickUpdateToday}
      />
      <StyledBody>
        <StyledCalendar>
          {dates.map((date) => (
            <StyledCalendarItem
              isToday={date.toDateString() === today.toDateString()}
              key={date.getTime()}
              onClick={() => {
                setToday(date);
              }}
            >
              <span>{DAYS[date.getDay()]}</span>
              <span>{date.getDate()}</span>
            </StyledCalendarItem>
          ))}
        </StyledCalendar>
      </StyledBody>
    </StyledMainTemplate>
  );
};
