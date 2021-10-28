import styled from 'styled-components';
import ReactDom from 'react-dom';
import { useEffect, useState, createRef, useCallback } from 'react';
import { StringLiteralLike } from 'typescript';
import TodoMenuButtonImg from '../../../assets/img/todoMenuButtonImg.png';
import { Todo, TodoPeriod, UpdateTodo } from '../../../types';
import { consoleLog } from '../../../utils';

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

export const SideTodo = ({
  todo,
  isCheck,
  onClickTodo = () => {},
}: PropTypes) => {
  const { id, contents, TodoPeriod: period } = todo;
  const [el, setEl] = useState<HTMLDivElement | undefined>(undefined);

  const getThisRect = useCallback((): DOMRect | undefined => {
    if (!el) return undefined;
    return el.getBoundingClientRect();
  }, [el]);

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
          onClick={() => {
            consoleLog(`todoId: ${id}, category: ${todo.Category}`);
          }}
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
          <span
            style={{
              minHeight: 20,
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {contents.length < 20
              ? contents
              : `${contents.substring(0, 19)}...`}
          </span>
          <span
            style={{
              marginTop: 6,
              minHeight: 20,
              fontWeight: 'normal',
              fontSize: 16,
            }}
          >
            {!period ? '시간 미정' : 'test'}
          </span>
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
