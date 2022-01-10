import { MutationFunctionOptions } from '@apollo/client';
import styled, { useTheme } from 'styled-components';

import React, { useEffect, useState } from 'react';
import {
  Category,
  CreateTodo,
  CreateTodoMutationInput,
  DeleteTodoMutationInput,
  GetTodosType,
  Todo,
  TodoModalInfo,
  UpdateTodo,
  User,
} from '../../types';
import { getWeek } from '../../utils';
import { LeftArrowButton, RightArrowButton } from '../../assets/img';

const StyledMainTemplate = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 10%;
  min-height: 90px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  background-color: pink;
`;

interface PropTypes {
  categoryScrollRef: React.RefObject<HTMLDivElement> | null;
  categoryScrollSaveRef: React.RefObject<number>;
  selectCategoryId: number | undefined;
  isUpdateTodoModalOpen: boolean;
  isDatePickerModalOpen: boolean;
  updateTodo: UpdateTodo;
  me: User | undefined;
  todos: Todo[] | undefined;
  categories: Category[] | undefined;
  getTodosType: GetTodosType;
  createTodo: CreateTodo;
  todoModalInfo: TodoModalInfo;
  setSelectCategoryId: (
    value: React.SetStateAction<number | undefined>,
  ) => void;
  setIsUpdateTodoModalOpen: (value: React.SetStateAction<boolean>) => void;
  setIsDatePickerModalOpen: (value: React.SetStateAction<boolean>) => void;
  setUpdateTodo: (value: React.SetStateAction<UpdateTodo>) => void;
  refetchGetTodos: () => void;
  refetchGetCategories: () => void;
  setGetTodosType: (value: React.SetStateAction<GetTodosType>) => void;
  createTodoMutation: (
    value:
      | MutationFunctionOptions<{
          createTodoMutation: CreateTodoMutationInput;
        }>
      | undefined,
  ) => void;
  deleteTodoMutation: (
    value:
      | MutationFunctionOptions<{
          deleteTodoMutation: DeleteTodoMutationInput;
        }>
      | undefined,
  ) => void;
  submitUpdateTodo: () => void;
  setCreateTodo: (value: React.SetStateAction<CreateTodo>) => void;
  submitCreateTodo: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onCloseModal: () => void;
  setTodoModalInfo: (value: React.SetStateAction<TodoModalInfo>) => void;
  onClickTodo: (position: { top: number; right: number }, todo: Todo) => void;
  categoryScrollHandler: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const MainTemplate = (): JSX.Element => {
  const theme = useTheme();
  const [today, setToday] = useState(new Date());

  const month = today.getMonth() + 1;
  const week = getWeek(today);

  const updateToday = (type: 'left' | 'right'): Date => {
    const date = today.getDate();
    if (type === 'left') {
      today.setDate(date - 7);
    } else {
      today.setDate(date + 7);
    }
    return new Date(today);
  };

  return (
    <StyledMainTemplate>
      <StyledHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 10,
          }}
        >
          <LeftArrowButton
            style={{
              cursor: 'pointer',
              marginTop: 3,
            }}
            onClick={() => {
              const newDate = updateToday('left');
              setToday(newDate);
            }}
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
            onClick={() => {
              const newDate = updateToday('right');
              setToday(newDate);
            }}
          />
        </div>
        <div>
          <span
            style={{
              fontSize: 18,
              color: theme.colors.purple1,
            }}
          >
            오늘의 도달률 0%
          </span>
          image
        </div>
      </StyledHeader>
      <StyledBody>
        <span>body</span>
      </StyledBody>
    </StyledMainTemplate>
  );
};
