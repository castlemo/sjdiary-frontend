import styled from 'styled-components';
import { JsxEmit } from 'typescript';
import { GetTodosType, Todo, UpdateTodo } from '../../../types';
import { getTodayZeroTimeTimestamp } from '../../../utils';
import { SideTodo } from '../../molecules/todo/sideTodo';

const StyledSideTodoListWrapper = styled.div`
  width: 95%;
  height: 100%;
  max-height: 730px;
  margin-left: 20px;
  /* background-color: pink; */

  overflow-y: auto;
  overflow-x: hidden;

  /* scroll styling */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6c2ff;
  }

  ::-webkit-scrollbar-track {
    background-color: #bfbfbf;
  }
  /* fireFox scroll style*/
  scrollbar-color: #d6c2ff #bfbfbf;
  scrollbar-width: thin;
`;

interface PropTypes {
  todos: Todo[] | undefined;
  updateTodo: UpdateTodo;
  isAllTodoTap: boolean;
  selectCategoryId: number | undefined;
  onClickTodo: (position: { top: number; right: number }, todo: Todo) => void;
}

export const SideTodoList = ({
  todos = [],
  updateTodo,
  isAllTodoTap = true,
  selectCategoryId = undefined,
  onClickTodo = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledSideTodoListWrapper>
      {todos?.map((todo) => {
        const sideTodo = (
          <SideTodo
            key={todo.id}
            todo={todo}
            onClickTodo={onClickTodo}
            isCheck={updateTodo.id === todo.id}
          />
        );

        // 모든할일 상태이고 카테고리가 all일때
        if (isAllTodoTap && !selectCategoryId) {
          return sideTodo;
        }

        // 오늘의 할 일 상태일때
        if (!isAllTodoTap) {
          // 시간 미정이면
          if (todo.TodoPeriod) {
            const today = +new Date();
            const todoStartedAt = +new Date(todo.TodoPeriod.startedAt);
            const todoEndedAt = +new Date(todo.TodoPeriod.endedAt);

            if (today - todoStartedAt > 0 && todoEndedAt - today > 0) {
              if (selectCategoryId) {
                if (todo.Category) {
                  return Number(todo.Category.id) === selectCategoryId
                    ? sideTodo
                    : null;
                }
                return null;
              }
              return sideTodo;
            }
          }

          return null;
        }

        if (selectCategoryId) {
          if (todo.Category) {
            return Number(todo.Category.id) === selectCategoryId
              ? sideTodo
              : null;
          }
          return null;
        }

        return sideTodo;
      })}
    </StyledSideTodoListWrapper>
  );
};
