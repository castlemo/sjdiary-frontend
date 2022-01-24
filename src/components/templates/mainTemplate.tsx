import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import styled, { useTheme } from 'styled-components';

import { DiaryCardTypes, THIRTY_MINUTES_TIME } from '../../constant';
import { MeOutput, TodoOutput, TodosOutput } from '../../graphQL/types';
import { getDiaryCardHeight } from '../../utils';
import { DiaryCardDragLayer } from '../molecules';
import { DiaryCard, DiaryCreateCard, MainHeader } from '../organisms';
import { WeekCalendar } from '../organisms/calendar';

import { LoadingTemplate } from '.';
// import { DiaryCalendar } from '../organisms/calendar';

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

const StyledDiaryContainer = styled.div<{ height?: number }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex: 1;

  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledTime = styled.div<{
  isNowHour: boolean;
  width: number;
  top: number;
}>`
  position: absolute;

  width: ${({ width }) => width}px;
  min-height: ${({ theme }) => theme.sizes.diaryCardHeight}px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme, isNowHour }) =>
    isNowHour ? theme.colors.purple1 : theme.colors.grey1};
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;

  border-right: 0.5px solid ${({ theme }) => theme.colors.grey3};

  top: ${({ top }) => top}px;
`;

const StyledDiaryTitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  min-height: 66px;

  color: ${({ theme }) => theme.colors.purple1};
  font-size: 18;
`;

const StyledDiaryTitle = styled.div<{ isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 70px;
  width: ${({ isEmpty }) => (isEmpty ? null : '100%')};
  height: 100%;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  box-sizing: border-box;
`;

const StyledTimeUndecidedContainer = styled.div<{ width: number }>`
  position: fixed;

  width: ${({ width }) => width}px;
  min-height: 180px;

  background-color: ${({ theme }) => theme.colors.black2};

  z-index: 1;
`;

const StyledTimeUndecided = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  min-height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 0.5px solid ${({ theme }) => theme.colors.grey3};
  color: ${({ theme }) => theme.colors.purple1};
`;

const StyledDiaryCarteCardContainer = styled.div<{
  width: number;
  left: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ theme }) => theme.sizes.diaryCardHeight}px;

  position: absolute;

  display: flex;
  flex-direction: row;

  left: ${({ left }) => left}px;
`;

type PropTypes = {
  dataMe?: MeOutput;
  today: Date;
  dataTodo?: TodosOutput;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
};

export const MainTemplate: FC<PropTypes> = ({
  dataMe,
  today,
  dataTodo,
  setToday,
}): JSX.Element => {
  const theme = useTheme();
  const nowHour = today.getHours();

  const todoTitleRef = useRef<HTMLDivElement>(null);
  const reviewTitleRef = useRef<HTMLDivElement>(null);
  const timeTitleRef = useRef<HTMLDivElement>(null);
  const [diaryCardWidth, setDiaryCardWidth] = useState<number>(0);
  const [timeCardWidth, setTimeCardWidth] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const [todoContents, setTodoContents] = useState('');
  const [reviewContents, setReviewContents] = useState('');

  const isTimeUndecidedTodos = useMemo(
    () =>
      dataTodo?.timeUndecidedTodos && dataTodo.timeUndecidedTodos.length > 0,
    [dataTodo],
  );

  useEffect(() => {
    if (timeTitleRef.current) {
      const timeRect = timeTitleRef.current.getBoundingClientRect();
      // console.log('timeRect: ', timeRect);
      setTimeCardWidth(timeRect.width);
    }
  }, [timeTitleRef]);

  useEffect(() => {
    if (todoTitleRef.current) {
      const todoRect = todoTitleRef.current.getBoundingClientRect();
      // console.log('todoRect: ', todoRect);
      setDiaryCardWidth(todoRect.width);
    }
  }, [todoTitleRef]);

  useEffect(() => {
    if (reviewTitleRef.current) {
      const reviewRect = reviewTitleRef.current.getBoundingClientRect();
      // console.log('reviewRect: ', reviewRect);
    }
  }, [reviewTitleRef]);

  const renderDiaryCard = (todo: TodoOutput, index: number) => {
    const { startedAt, finishedAt } = todo;
    const height = getDiaryCardHeight(startedAt, finishedAt);

    return (
      <DiaryCard
        left={1}
        height={height}
        todo={todo}
        today={today}
        key={todo.id}
        originalIndex={index}
        parentWidth={diaryCardWidth}
        styleType="none"
      />
    );
  };

  const renderCreateDiaryCard = () => {
    return (
      <StyledDiaryCarteCardContainer
        left={timeCardWidth}
        width={diaryCardWidth * 2}
      >
        <DiaryCreateCard
          contents={todoContents}
          setContents={setTodoContents}
          inputPlaceHolder="예정된 할일을 입력해주세요."
        />
        <DiaryCreateCard
          contents={reviewContents}
          setContents={setReviewContents}
          inputPlaceHolder="오늘 했던 일을 입력해주세요."
        />
      </StyledDiaryCarteCardContainer>
    );
  };

  const [, drop] = useDrop({
    accept: DiaryCardTypes.TODO,
    drop(item: Record<string, any>, monitor: DropTargetMonitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };

      const year = item.today.getFullYear();
      const month = item.today.getMonth();
      const date = item.today.getDate();
      const todayZeroHour = new Date(year, month, date).getTime();

      const isItemStartedAt = !!item.item.startedAt;
      const itemStartedAt = isItemStartedAt
        ? item.item.startedAt
        : todayZeroHour;

      let scrollingY = delta.y + scrollTop;

      if (!isItemStartedAt) {
        scrollingY -= 30 * (4 - item.originalIndex);
      }

      const diff = Math.ceil(Math.abs(scrollingY) / 30) * THIRTY_MINUTES_TIME;

      const is = new Date(itemStartedAt);
      let before: Date;

      if (delta.y > 0) {
        before = new Date(itemStartedAt + diff);
      } else {
        before = new Date(itemStartedAt - diff);
      }

      console.log({ isItemStartedAt, diff });
      console.log({ ...item });
      console.log({ ...delta });
      console.log(is);
      console.log(before);
    },
  });

  return (
    <StyledMainTemplate>
      <MainHeader dataMe={dataMe} today={today} setToday={setToday} />
      <StyledBody>
        <WeekCalendar dataMe={dataMe} today={today} setToday={setToday} />
        <StyledDiaryTitleContainer>
          <StyledDiaryTitle isEmpty ref={timeTitleRef} />
          <StyledDiaryTitle isEmpty={false} ref={todoTitleRef}>
            오늘은 이렇게 보내고 싶어요
          </StyledDiaryTitle>
          <StyledDiaryTitle isEmpty={false} ref={reviewTitleRef}>
            오늘은 이렇게 보내고 싶어요
          </StyledDiaryTitle>
        </StyledDiaryTitleContainer>
        <StyledDiaryContainer
          ref={drop}
          onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
            const currentScrollTop = e.currentTarget.scrollTop;
            setScrollTop(currentScrollTop);
          }}
        >
          <DiaryCardDragLayer parentWidth={diaryCardWidth} />
          {isTimeUndecidedTodos ? (
            <StyledTimeUndecidedContainer
              width={diaryCardWidth * 2 + timeCardWidth}
            >
              {renderCreateDiaryCard()}
              <StyledTimeUndecided width={timeCardWidth}>
                시간 미정
              </StyledTimeUndecided>
              {isTimeUndecidedTodos &&
                dataTodo?.timeUndecidedTodos.map((todo, i) => {
                  const { startedAt, finishedAt } = todo;
                  const height = getDiaryCardHeight(startedAt, finishedAt);

                  return (
                    <DiaryCard
                      todo={todo}
                      height={height}
                      parentWidth={diaryCardWidth}
                      left={timeCardWidth}
                      key={todo.id}
                      styleType="none"
                      originalIndex={i}
                      today={today}
                    />
                  );
                })}
              {/* 시간 미정 review 작업 해야함 */}
            </StyledTimeUndecidedContainer>
          ) : (
            <>{renderCreateDiaryCard()}</>
          )}
          {[...new Array(24).keys()].map((hour, i) => {
            let top = i * 60;
            top += isTimeUndecidedTodos ? 180 : 0;

            return (
              <StyledTime
                width={timeCardWidth}
                key={hour}
                isNowHour={nowHour === hour}
                top={top}
              >
                {hour}시
              </StyledTime>
            );
          })}
          {[...new Array(48).keys()].map((num, i) => {
            let top = i * 30;
            top += isTimeUndecidedTodos ? 180 : 0;

            const border = `1px dashed ${theme.colors.white1}`;

            return (
              <div
                key={num}
                style={{
                  position: 'absolute',
                  border,
                  top,
                  width: diaryCardWidth,
                  left: timeCardWidth,
                }}
              />
            );
          })}
          {dataTodo?.todos.map((todo, i) => {
            const { startedAt, finishedAt } = todo;
            const height = getDiaryCardHeight(startedAt, finishedAt);

            return (
              <DiaryCard
                todo={todo}
                height={height}
                parentWidth={diaryCardWidth}
                left={timeCardWidth}
                key={todo.id}
                styleType="none"
                originalIndex={i}
                today={today}
                isTimeUndecided={isTimeUndecidedTodos}
              />
            );
          })}
        </StyledDiaryContainer>
      </StyledBody>
    </StyledMainTemplate>
  );
};
