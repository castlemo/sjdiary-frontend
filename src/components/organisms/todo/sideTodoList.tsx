import styled from 'styled-components';
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
  getTodosType: GetTodosType;
  selectCategoryId: number | undefined;
  onClickTodo: (position: { top: number; right: number }, todo: Todo) => void;
}

export const SideTodoList = ({
  todos = [],
  updateTodo,
  getTodosType = 'ALL',
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
        if (!isAllTodoTap) {
          const todayTimestamp = getTodayZeroTimeTimestamp();
          const todoKorTimestamp = +new Date(todo.createdAt);
          if (todoKorTimestamp >= todayTimestamp) {
            if (getTodosType === 'CATEGORY') {
              return todo.Category?.id === selectCategoryId ? sideTodo : null;
            }
          } else {
            return null;
          }
        }
        if (getTodosType === 'CATEGORY') {
          return todo.Category?.id === selectCategoryId ? sideTodo : null;
        }
        return sideTodo;
      })}
    </StyledSideTodoListWrapper>
  );
};
