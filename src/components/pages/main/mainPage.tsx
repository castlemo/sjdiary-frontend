import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { LoadingPage } from '..';
import { CREATE_TODO } from '../../../graphQL/mutations';
import { GET_CATEGORIES, GET_TODOS, ME } from '../../../graphQL/queries';

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
import { consoleLog } from '../../../utils';
import { MainTemplate } from '../../templates/main/mainTemplate';

export const MainPage = (): JSX.Element => {
  // 카테고리 스크롤 저장
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const categoryScrollSaveRef = useRef<number>(0);

  useEffect(() => {
    // 카테고리 스크롤 저장
    categoryScrollRef.current?.scrollTo(categoryScrollSaveRef?.current, 0);
  }, [categoryScrollRef.current]);

  const [getTodosType, setGetTodosType] = useState<GetTodosType>('ALL');
  // 선택한 카테고리 Id
  const [selectCategoryId, setSelectCategoryId] = useState<number | undefined>(
    undefined,
  );

  // 업데이트 투두 모달 오픈 여부
  const [isUpdateTodoModalOpen, setIsUpdateTodoModalOpen] =
    useState<boolean>(false);

  // 업데이트 할 투두 객체
  const [updateTodo, setUpdateTodo] = useState<UpdateTodo>({ id: -1 });

  // Create Todo 데이터
  const [createTodo, setCreateTodo] = useState<CreateTodo>({
    contents: '',
  });

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const [todoModalInfo, setTodoModalInfo] = useState<TodoModalInfo>({
    left: 0,
    top: 0,
    type: 'CREATE',
  });

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
      input: { type: 'ALL', categoryId: selectCategoryId },
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
    refetch: refetchGetCategories,
  } = useQuery<{ getCategories: Category[] }>(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  if (getCategoriesData) {
    consoleLog('--------getCategories--------');
    consoleLog(getCategoriesData.getCategories);
    consoleLog('--------getCategories--------');
  }

  const [
    createTodoMutation,
    { loading: createTodoLoading, data: createTodoData },
  ] = useMutation<{
    createTodoMutation: CreateTodoMutationInput;
  }>(CREATE_TODO, {
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

  if (
    loadingMe ||
    loadingGetTodos ||
    loadingGetCategories ||
    createTodoLoading
  ) {
    return <LoadingPage />;
  }

  if (errorMe || errorGetTodos || errorGetCategories) {
    consoleLog({ errorMe, errorGetTodos });
    window.alert('Http Error');
  }

  const submitCreateTodo = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e?.preventDefault();
    consoleLog('===submitCreateTodo===');
    consoleLog({ ...createTodo });
    if (createTodo.contents.length > 0) {
      createTodoMutation({ variables: { input: createTodo } });
    } else {
      window.alert('내용을 입력해주세요');
    }
  };

  const onCloseModal = (options?: { isAll: boolean }) => {
    if (options?.isAll) {
      setIsDatePickerModalOpen(false);
      setIsUpdateTodoModalOpen(false);
      setUpdateTodo({ id: -1 });
    } else if (isDatePickerModalOpen) {
      setIsDatePickerModalOpen(false);
    } else if (isUpdateTodoModalOpen) {
      setIsUpdateTodoModalOpen(false);
      setUpdateTodo({ id: -1 });
    }
  };

  const onClickTodo = (
    { top, right }: { top: number; right: number },
    todo: Todo,
  ) => {
    setUpdateTodo({ ...todo });
    setTodoModalInfo({
      top,
      left: right,
      type: 'UPDATE',
    });
    setIsUpdateTodoModalOpen(true);
  };

  const categoryScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
    categoryScrollSaveRef.current = e.currentTarget.scrollLeft;
  };

  return (
    <MainTemplate
      categoryScrollRef={categoryScrollRef}
      categoryScrollSaveRef={categoryScrollSaveRef}
      getTodosType={getTodosType}
      selectCategoryId={selectCategoryId}
      isUpdateTodoModalOpen={isUpdateTodoModalOpen}
      updateTodo={updateTodo}
      me={meData?.me}
      todos={getTodosData?.getTodos}
      categories={getCategoriesData?.getCategories}
      createTodo={createTodo}
      isDatePickerModalOpen={isDatePickerModalOpen}
      todoModalInfo={todoModalInfo}
      setGetTodosType={setGetTodosType}
      setSelectCategoryId={setSelectCategoryId}
      setIsUpdateTodoModalOpen={setIsUpdateTodoModalOpen}
      setUpdateTodo={setUpdateTodo}
      refetchGetTodos={refetchGetTodos}
      refetchGetCategories={refetchGetCategories}
      createTodoMutation={createTodoMutation}
      setCreateTodo={setCreateTodo}
      submitCreateTodo={submitCreateTodo}
      setIsDatePickerModalOpen={setIsDatePickerModalOpen}
      onCloseModal={onCloseModal}
      setTodoModalInfo={setTodoModalInfo}
      onClickTodo={onClickTodo}
      categoryScrollHandler={categoryScrollHandler}
    />
  );
};
