import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import React, { useEffect, useRef, useState } from 'react';
import { GET_CATEGORIES, GET_TODOS, ME } from '../../../graphQL/queries';
import { Category, CreateTodo, Todo, User } from '../../../types';
import { ProfileHeader } from '../../organisms/header/profileHeader';
import { LoadingPage } from '../../pages';
import CheckButtonImg from '../../../assets/img/checkButton.png';
import CalendarButtonImg from '../../../assets/img/calendarButton.png';
import SettingButtonImg from '../../../assets/img/settingButton.png';
import TodoMenuButtonImg from '../../../assets/img/todoMenuButtonImg.png';
import { Select } from '../../molecules';
import { CREATE_TODO } from '../../../graphQL/mutations';
import { CategorySettingTemplate } from '../category';
import { ColorCircle } from '../../atoms';
import { SideTodo } from '../../organisms';
import { consoleLog, getTodayZeroTimeTimestamp } from '../../../utils';

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

const StyledTodoHeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeaderInputWrapper = styled.div`
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  background: #ffffff;
  border: 0.5px solid #afafaf;
  box-sizing: border-box;
  border-radius: 100px;
  padding: 13px 0px 12px 20px;
  font-weight: 300;
  font-size: 20px;
`;

const StyledHeaderInput = styled.input`
  width: 85%;
  border: 0;
  font-weight: 300;
  font-size: 20px;
  outline: none;
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
  left: 0;
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

const StyledCategorySelectorWrapper = styled.div`
  width: 90%;
  height: 5%;
  min-height: 44px;
  margin-top: 23px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;

  /* scroll styling */
  ::-webkit-scrollbar {
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6c2ff;
  }

  ::-webkit-scrollbar-track {
    background-color: #bfbfbf;
  }
  /* fireFox scroll style*/
  scrollbar-width: thin;
  scrollbar-color: #d6c2ff #bfbfbf;
`;

const StyledTodoListWrapper = styled.div`
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

export const MainTemplate = () => {
  const [selectedCategoryType, SetSelectedCategoryType] = useState<
    'ALL' | 'CATEGORY'
  >('ALL');

  const [selectedCategoryId, SetSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  // 스크롤 저장
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const categoryScrollSaveRef = useRef<number>(0);

  useEffect(() => {
    categoryScrollRef.current?.scrollTo(categoryScrollSaveRef.current, 0);
  });
  // 스크롤 저장

  consoleLog({ selectedCategoryType, selectedCategoryId });

  const {
    loading: loadingMe,
    data: meData,
    error: errorMe,
  } = useQuery<{ me: User }>(ME, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  if (meData) {
    consoleLog('--------me--------');
    consoleLog(JSON.stringify(meData.me, null, 2));
    consoleLog('--------me--------');
  }

  const {
    loading: loadingGetTodos,
    data: getTodosData,
    error: errorGetTodos,
    refetch: refetchGetTodos,
  } = useQuery<{ getTodos: Todo[] }>(GET_TODOS, {
    variables: {
      input: { type: 'ALL', categoryId: selectedCategoryId },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  if (getTodosData) {
    consoleLog('--------getTodos--------');
    consoleLog(getTodosData.getTodos);
    consoleLog('--------getTodos--------');
  }

  const {
    loading: loadingGetCategories,
    data: getCategoriesData,
    error: errorGetCategories,
    refetch: getCategoriesRefetch,
  } = useQuery<{ getCategories: Category[] }>(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  if (getCategoriesData) {
    consoleLog('--------getCategories--------');
    consoleLog(getCategoriesData.getCategories);
    consoleLog('--------getCategories--------');
  }

  // true: 모든 할 일 / false: 오늘의 할 일
  const [isAllTodo, setIsAllTodo] = useState<boolean>(true);

  // Todo 데이터
  const [createTodo, setCreateTodo] = useState<CreateTodo>({
    contents: '',
  });

  // 카테고리 관리페이지 전환 boolean
  const [isCategorySettingOpen, setIsCategorySettingOpen] =
    useState<boolean>(true);

  const [
    createTodoMutation,
    { loading: createTodoLoading, data: createTodoData },
  ] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      setCreateTodo({
        contents: '',
      });
      refetchGetTodos();
    },
    onError: () => {
      window.alert('투두생성에 실패했어요, 잠시 후에 시도해주세요!');
    },
  });

  if (createTodoData) {
    consoleLog('--------createTodoData--------');
    consoleLog(createTodoData);
    consoleLog('--------createTodoData--------');
  }

  const onCheckButtonClickHandler = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    consoleLog({ ...createTodo });
    if (createTodo.contents.length > 0) {
      createTodoMutation({ variables: { input: createTodo } });
    } else {
      window.alert('내용을 입력해주세요');
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCheckButtonClickHandler();
    }
  };

  if (
    loadingMe ||
    createTodoLoading ||
    loadingGetTodos ||
    loadingGetCategories
  ) {
    return <LoadingPage />;
  }

  if (errorMe || errorGetTodos || errorGetCategories) {
    consoleLog({ errorMe, errorGetTodos });
    window.alert('Http Error');
  }

  const onScrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    categoryScrollSaveRef.current = event.currentTarget.scrollLeft;
  };

  return (
    <StyledMainTemplate>
      <StyledHeader>
        <ProfileHeader me={meData?.me} />
        <StyledTodoHeaderWrapper>
          <StyledHeaderInputWrapper>
            <StyledHeaderInput
              name="contents"
              placeholder="내가 해야될 일은?"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                setCreateTodo({ ...createTodo, [name]: value });
              }}
              onKeyPress={onKeyPress}
              value={createTodo.contents}
            />
            <button
              style={{
                border: 0,
                outline: 0,
                backgroundColor: '#00000000',
                cursor: 'pointer',
              }}
              type="button"
              onClick={onCheckButtonClickHandler}
            >
              <img
                style={{ width: 28, height: 28 }}
                src={CheckButtonImg}
                alt="체크버튼"
              />
            </button>
            <button
              style={{
                border: 0,
                outline: 0,
                backgroundColor: '#00000000',
                cursor: 'pointer',
              }}
              type="button"
              onClick={() => {
                consoleLog('calendar');
              }}
            >
              <img
                style={{ width: 28, height: 28 }}
                src={CalendarButtonImg}
                alt="달력버튼"
              />
            </button>
          </StyledHeaderInputWrapper>
          <button
            style={{
              border: 0,
              outline: 0,
              backgroundColor: '#00000000',
              cursor: 'pointer',
              marginRight: 20,
            }}
            type="button"
            onClick={() => {
              consoleLog('profile setting');
            }}
          >
            <img
              style={{ width: 40, height: 40 }}
              src={SettingButtonImg}
              alt="셋팅버튼"
            />
          </button>
        </StyledTodoHeaderWrapper>
      </StyledHeader>
      <StyledBody>
        <StyledSideWrapper>
          <Select
            isLeft={isAllTodo}
            leftWord="모든할 일"
            rightWord="오늘의 할 일"
            onLeftClick={() => {
              setIsAllTodo(true);
            }}
            onRightClick={() => {
              setIsAllTodo(false);
            }}
            wrapperStyles={{ marginTop: 26 }}
          />
          {isCategorySettingOpen ? (
            <>
              <CategorySettingTemplate
                onClickCloseBtn={() => {
                  setIsCategorySettingOpen(false);
                }}
                categories={getCategoriesData?.getCategories}
                getCategoriesRefetch={getCategoriesRefetch}
              />
            </>
          ) : (
            <>
              <StyledCategorySelectorWrapper
                ref={categoryScrollRef}
                onScroll={onScrollHandler}
              >
                <button
                  key="settingImg"
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 20,
                    border: 0,
                    cursor: 'pointer',
                    outline: 0,
                    backgroundColor: '#00000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  type="button"
                  onClick={() => {
                    setIsCategorySettingOpen(true);
                  }}
                >
                  <img
                    style={{ width: 30, height: 30 }}
                    src={SettingButtonImg}
                    alt="카테고리셋팅버튼"
                  />
                </button>
                <button
                  key="all"
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 30,
                    border: 0,
                    cursor: 'pointer',
                    outline: 0,
                    backgroundColor: '#00000000',
                    fontWeight: 500,
                    fontSize: 20,
                    color: '#8E8E8E',
                  }}
                  type="button"
                  onClick={() => {
                    SetSelectedCategoryType('ALL');
                    SetSelectedCategoryId(undefined);
                  }}
                >
                  all
                </button>
                {getCategoriesData?.getCategories.map((category) => {
                  return (
                    <button
                      key={category.id}
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: 30,
                        border: 0,
                        cursor: 'pointer',
                        outline: 0,
                        backgroundColor: '#00000000',
                        fontWeight: 500,
                        fontSize: 20,
                        color: '#8E8E8E',
                      }}
                      type="button"
                      onClick={() => {
                        SetSelectedCategoryType('CATEGORY');
                        SetSelectedCategoryId(Number(category.id));
                      }}
                    >
                      <ColorCircle
                        width={20}
                        height={20}
                        borderRadius={100}
                        backgroundColor={category.color}
                      />
                    </button>
                  );
                })}
              </StyledCategorySelectorWrapper>
              <StyledTodoListWrapper>
                {getTodosData?.getTodos.map((todo) => {
                  if (!isAllTodo) {
                    const todayTimestamp = getTodayZeroTimeTimestamp();
                    const todoKorTimestamp = +new Date(todo.createdAt);
                    if (todoKorTimestamp >= todayTimestamp) {
                      if (selectedCategoryType === 'CATEGORY') {
                        return todo.Category?.id === selectedCategoryId ? (
                          <SideTodo
                            key={todo.id}
                            contents={todo.contents}
                            period={todo.TodoPeriod}
                          />
                        ) : null;
                      }
                    }
                  }
                  if (selectedCategoryType === 'CATEGORY') {
                    return todo.Category?.id === selectedCategoryId ? (
                      <SideTodo
                        key={todo.id}
                        contents={todo.contents}
                        period={todo.TodoPeriod}
                      />
                    ) : null;
                  }
                  return (
                    <SideTodo
                      key={todo.id}
                      contents={todo.contents}
                      period={todo.TodoPeriod}
                    />
                  );
                })}
              </StyledTodoListWrapper>
            </>
          )}
        </StyledSideWrapper>
        <StyledCalendarWrapper />
      </StyledBody>
    </StyledMainTemplate>
  );
};
