import styled from 'styled-components';
import ReactDom from 'react-dom';
import { useEffect, useState, createRef, useCallback, useMemo } from 'react';
import { StringLiteralLike } from 'typescript';
import TodoMenuButtonImg from '../../../assets/img/todoMenuButtonImg.png';
import { Todo, TodoPeriod, UpdateTodo } from '../../../types';

const StyledSideTodoWrapper = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #bfbfbf;
  margin-left: 20px;
`;

const StyledEmptyInsideColorCircleButton = styled.button<{
  backgroundColor?: string;
}>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  cursor: pointer;
  margin-top: -20px;
  background-color: ${(p) => p.backgroundColor ?? null};
`;

interface PropTypes {
  todo: Todo;
  isCheck: boolean;
  onClickTodo: (position: { top: number; right: number }, todo: Todo) => void;
}

const todoModalHeight = 423;

const convertKORString = (timestamp: number): string => {
  const today = new Date();
  const todayStartTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0,
  ).getTime();
  const todayEndTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999,
  ).getTime();

  const tomorrowStartTime = todayStartTime + 86400000;
  const tomorrowEndTime = todayEndTime + 86400000;

  const afterTomorrowStartTime = tomorrowStartTime + 86400000;
  const afterTomorrowEndTime = tomorrowEndTime + 86400000;

  if (timestamp < todayStartTime) {
    return '지남';
  }

  if (todayStartTime <= timestamp && timestamp <= todayEndTime) {
    return '오늘';
  }
  if (tomorrowStartTime <= timestamp && timestamp <= tomorrowEndTime) {
    return '내일';
  }
  if (
    afterTomorrowStartTime <= timestamp &&
    timestamp <= afterTomorrowEndTime
  ) {
    return '모레';
  }
  return '';
};

export const SideTodo = ({
  todo,
  isCheck,
  onClickTodo = () => {},
}: PropTypes): JSX.Element => {
  const { id, contents, TodoPeriod: todoPeriod } = todo;
  const [el, setEl] = useState<HTMLDivElement | undefined>(undefined);

  const getThisRect = useCallback((): DOMRect | undefined => {
    if (!el) return undefined;
    return el.getBoundingClientRect();
  }, [el]);

  const time = useMemo(() => {
    if (!todoPeriod) return '시간 미정';
    const dot = ' · ';
    let result = '';

    const startedAt = new Date(
      new Date(todoPeriod.startedAt).getTime() + 9 * 60 * 60 * 1000,
    );
    const endedAt = new Date(
      new Date(todoPeriod.endedAt).getTime() + 9 * 60 * 60 * 1000,
    );
    const [ymd, hmsm] = endedAt.toISOString().split('T');
    const [year, month, date] = ymd.split('-').map(Number);

    result += `${month}/${date}${dot}${convertKORString(
      new Date(todoPeriod.endedAt).getTime(),
    )}`;

    if (todoPeriod?.isTime) {
      const [startHours, startMinutes] = startedAt
        .toISOString()
        .split('T')[1]
        .split(':');
      const [endHours, endMinutes] = hmsm.split(':');
      result += `${dot}${startHours}:${startMinutes} ~ ${endHours}:${endMinutes}`;
    } else {
      result += `${dot}시간미정`;
    }

    return result;
  }, [todoPeriod, todo]);

  return (
    <StyledSideTodoWrapper ref={(element: HTMLDivElement) => setEl(element)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 13,
          alignItems: 'center',
        }}
      >
        <StyledEmptyInsideColorCircleButton
          type="button"
          onClick={() => {}}
          backgroundColor={todo.Category?.color}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 100,
              backgroundColor: '#FFFFFF',
            }}
          />
        </StyledEmptyInsideColorCircleButton>
        <button
          type="button"
          style={{
            height: '100%',
            border: isCheck ? '2px solid #71E3CF' : 0,
            backgroundColor: '#ffffff',
            margin: 0,
            padding: 0,
            minWidth: 283,
            maxWidth: 283,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            marginLeft: 10,
            fontFamily: 'Spoqa Han Sans Neo',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            const rect = getThisRect();
            let top = 0;

            if (rect) {
              if (window.innerHeight - todoModalHeight < rect.bottom) {
                top = window.innerHeight - todoModalHeight - 10;
              } else {
                top = rect.top;
              }
            }

            onClickTodo(
              {
                right: rect?.right ?? 0,
                top,
              },
              todo,
            );
          }}
        >
          <p
            style={{
              minHeight: 20,
              fontWeight: 'bold',
              fontSize: 16,
              margin: '17px 0px 0px 0px',
            }}
          >
            {contents.length < 20
              ? contents
              : `${contents.substring(0, 19)}...`}
          </p>
          <p
            style={{
              marginTop: 6,
              minHeight: 20,
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 16,
              letterSpacing: -0.5,
              lineHeight: '20px',
              color: time.includes('지남') ? '#FC8900' : '#000000',
            }}
          >
            {time}
          </p>
        </button>
        <button
          type="button"
          style={{
            width: 30,
            height: 30,
            border: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
          }}
        >
          <img src={TodoMenuButtonImg} alt="todoMenuImg" />
        </button>
      </div>
    </StyledSideTodoWrapper>
  );
};
