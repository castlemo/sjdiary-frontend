import { MutationFunctionOptions } from '@apollo/client';
import styled from 'styled-components';

import React, { useState } from 'react';
import {
  Category,
  CreateTodo,
  CreateTodoMutationInput,
  GetTodosType,
  Todo,
  TodoModalInfo,
  UpdateTodo,
  User,
} from '../../../types';
import { ProfileHeader } from '../../organisms/header/profileHeader';
import SettingButtonImg from '../../../assets/img/settingButton.png';
import { Select } from '../../molecules';
import { CategorySettingTemplate } from '../category';
import {
  MainHeader,
  SideCategorySelectorList,
  TodoModal,
} from '../../organisms';
import { SideTodoList } from '../../organisms/todo/sideTodoList';

const StyledMainTemplate = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 90px;
  min-height: 90px;

  /* shadow styling */
  -webkit-box-shadow: 0px 8px 0px 0px #f3f3f3;
  -moz-box-shadow: 0px 8px 0px 0px #f3f3f3;
  box-shadow: 0px 8px 0px 0px #f3f3f3;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledSideWrapper = styled.div`
  width: 420px;
  height: 100%;
  min-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 8px;
`;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 100%;

  /* shadow styling */
  -webkit-box-shadow: -8px 0px 0px 0px #f3f3f3;
  -moz-box-shadow: -8px 0px 0px 0px #f3f3f3;
  box-shadow: -8px 0px 0px 0px #f3f3f3;
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
  setCreateTodo: (value: React.SetStateAction<CreateTodo>) => void;
  submitCreateTodo: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onCloseModal: () => void;
  setTodoModalInfo: (value: React.SetStateAction<TodoModalInfo>) => void;
  onClickTodo: (position: { top: number; right: number }, todo: Todo) => void;
  categoryScrollHandler: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const MainTemplate = ({
  categoryScrollRef = null,
  categoryScrollSaveRef,
  selectCategoryId = undefined,
  isUpdateTodoModalOpen = false,
  isDatePickerModalOpen = false,
  updateTodo,
  me = undefined,
  todos = undefined,
  categories = [],
  getTodosType = 'ALL',
  createTodo,
  todoModalInfo,
  setSelectCategoryId = () => {},
  setIsUpdateTodoModalOpen = () => {},
  setIsDatePickerModalOpen = () => {},
  setUpdateTodo = () => {},
  refetchGetTodos = () => {},
  refetchGetCategories = () => {},
  setGetTodosType = () => {},
  createTodoMutation,
  setCreateTodo = () => {},
  submitCreateTodo = () => {},
  onCloseModal = () => {},
  setTodoModalInfo = () => {},
  onClickTodo = () => {},
  categoryScrollHandler = () => {},
}: PropTypes): JSX.Element => {
  // true: 모든 할 일 Tap / false: 오늘의 할 일 Tap
  const [isAllTodoTap, setIsAllTodoTap] = useState<boolean>(true);

  // 카테고리 관리페이지 전환 boolean
  const [isCategorySettingOpen, setIsCategorySettingOpen] =
    useState<boolean>(false);

  return (
    <StyledMainTemplate>
      <StyledHeader onMouseDown={onCloseModal}>
        <ProfileHeader me={me} />
        <MainHeader
          createTodo={createTodo}
          SettingButtonImg={SettingButtonImg}
          setCreateTodo={setCreateTodo}
          submitCreateTodo={submitCreateTodo}
        />
      </StyledHeader>
      <StyledBody>
        <StyledSideWrapper>
          <Select
            isLeft={isAllTodoTap}
            leftWord="모든할 일"
            rightWord="오늘의 할 일"
            onLeftClick={() => {
              setIsAllTodoTap(true);
            }}
            onRightClick={() => {
              setIsAllTodoTap(false);
            }}
            wrapperStyles={{ marginTop: 26 }}
            onCloseModal={onCloseModal}
          />
          {isCategorySettingOpen ? (
            <CategorySettingTemplate
              onClickCloseBtn={() => {
                setIsCategorySettingOpen(false);
              }}
              categories={categories}
              getCategoriesRefetch={refetchGetCategories}
            />
          ) : (
            <>
              <SideCategorySelectorList
                categoryScrollRef={categoryScrollRef}
                SettingButtonImg={SettingButtonImg}
                categories={categories}
                onCloseModal={onCloseModal}
                categoryScrollHandler={categoryScrollHandler}
                setIsCategorySettingOpen={setIsCategorySettingOpen}
                setSelectCategoryId={setSelectCategoryId}
                setGetTodosType={setGetTodosType}
              />
              <SideTodoList
                todos={todos}
                updateTodo={updateTodo}
                getTodosType={getTodosType}
                isAllTodoTap={isAllTodoTap}
                selectCategoryId={selectCategoryId}
                onClickTodo={onClickTodo}
              />
            </>
          )}
        </StyledSideWrapper>
        <StyledCalendarWrapper onMouseDown={onCloseModal} />
        {isUpdateTodoModalOpen ? (
          <TodoModal
            todo={updateTodo}
            modalType={todoModalInfo.type}
            modalTop={`${todoModalInfo.top + 5}px`}
            modalLeft={`${todoModalInfo.left + 5}px`}
            onCloseModal={onCloseModal}
            setUpdateTodo={setUpdateTodo}
            categories={categories}
            isDatePickerModalOpen={isDatePickerModalOpen}
            setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          />
        ) : null}
      </StyledBody>
    </StyledMainTemplate>
  );
};
