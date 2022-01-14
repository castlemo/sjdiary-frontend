import { useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { MeOutput } from '../../graphQL/types';
import { DiaryCreateCard, MainHeader } from '../organisms';
import { DiaryCalendar } from '../organisms/calendar';

const StyledMainTemplate = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.black2};
`;

const StyledBody = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex: 1;
  flex-direction: column;

  overflow: hidden;
`;

const StyledDiaryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  overflow: auto;
`;

const StyledTimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 70px;
  height: 100%;
`;

const StyledTimeItem = styled.div<{ isNowHour: boolean }>`
  width: 100%;
  height: 60px;
  min-height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme, isNowHour }) =>
    isNowHour ? theme.colors.purple1 : theme.colors.grey1};
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;

  background-color: ${({ theme }) => theme.colors.black2};

  border-right: 0.5px solid ${({ theme }) => theme.colors.grey3};

  overflow: auto;
`;

const StyledTodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;
  height: 100vh;

  /* background-color: pink; */
`;

const StyledReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;
  height: 100%;

  /* background-color: blue; */
`;

const StyledDiaryTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 66px;

  color: ${({ theme }) => theme.colors.purple1};
  font-size: 18;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;
`;

const StyledDiaryCreateCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 66px;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.black1};
`;

type PropTypes = {
  dataMe?: MeOutput;
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
};

export const MainTemplate = ({
  dataMe,
  today = new Date(),
  setToday = () => {},
}: PropTypes): JSX.Element => {
  const theme = useTheme();
  const nowHour = today.getHours();

  const [todoContents, setTodoContents] = useState('');
  const [reviewContents, setReviewContents] = useState('');

  return (
    <StyledMainTemplate>
      <MainHeader dataMe={dataMe} today={today} setToday={setToday} />
      <StyledBody>
        <DiaryCalendar dataMe={dataMe} today={today} setToday={setToday} />
        <StyledDiaryContainer>
          <StyledTimeContainer>
            <StyledDiaryTitle />
            {[...new Array(24).keys()].map((hour) => (
              <StyledTimeItem key={hour} isNowHour={nowHour === hour}>
                {hour}시
              </StyledTimeItem>
            ))}
          </StyledTimeContainer>
          <StyledTodoContainer>
            <StyledDiaryTitle>오늘은 이렇게 보내고 싶어요</StyledDiaryTitle>
            <DiaryCreateCard
              contents={todoContents}
              setContents={setTodoContents}
              inputPlaceHolder="예정된 할일을 입력해주세요."
            />
          </StyledTodoContainer>
          <StyledReviewWrapper>
            <StyledDiaryTitle>오늘은 이렇게 보냈어요</StyledDiaryTitle>
            <DiaryCreateCard
              contents={reviewContents}
              setContents={setReviewContents}
              inputPlaceHolder="오늘 했던 일을 입력해주세요."
            />
          </StyledReviewWrapper>
        </StyledDiaryContainer>
      </StyledBody>
    </StyledMainTemplate>
  );
};
