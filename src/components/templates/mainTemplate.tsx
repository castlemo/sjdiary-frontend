import styled, { useTheme } from 'styled-components';

import { MeOutput } from '../../graphQL/types';
import { MainHeader } from '../organisms';
import { DiaryHeader } from '../organisms/header';

const StyledMainTemplate = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.black2};

  overflow: hidden;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledDiaryWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  overflow: auto;
`;

const StyledTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 70px;
  height: auto;
`;

const StyledTimeItem = styled.div`
  width: 100%;
  height: 60px;
  min-height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.purple1};

  background-color: ${({ theme }) => theme.colors.black2};

  overflow: auto;
`;

const StyledTodoWrapper = styled.div`
  display: flex;
  flex: 5;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
  background-color: pink;
`;

const StyledReviewWrapper = styled.div`
  display: flex;
  flex: 5;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
  background-color: blue;
`;

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
  const theme = useTheme();

  return (
    <StyledMainTemplate>
      <MainHeader dataMe={dataMe} today={today} setToday={setToday} />
      <StyledBody>
        <DiaryHeader dataMe={dataMe} today={today} setToday={setToday} />
        <StyledDiaryWrapper>
          <StyledTimeWrapper>
            <div
              style={{
                width: '100%',
                height: 66,
                minHeight: 66,
                border: `0.5px solid ${theme.colors.grey3}`,
                boxSizing: 'border-box',
              }}
            />
            {[...new Array(24).keys()].map((hour) => (
              <StyledTimeItem key={hour}>{hour}</StyledTimeItem>
            ))}
          </StyledTimeWrapper>
          <StyledTodoWrapper />
          <StyledReviewWrapper />
        </StyledDiaryWrapper>
      </StyledBody>
    </StyledMainTemplate>
  );
};
