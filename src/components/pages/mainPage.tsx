import { useMemo, useState } from 'react';

import {
  useCreateReviewMutation,
  useCreateTodoMutation,
  useDeleteReviewMutation,
  useDeleteTodoMutation,
  useUpdateReviewMutation,
  useUpdateTodoMutation,
} from '../../graphQL/mutations';
import {
  useGetMeQuery,
  useGetReviewsQuery,
  useGetTodosQuery,
} from '../../graphQL/queries';
import { useInterval } from '../../hooks';
import { LoadingTemplate, MainTemplate } from '../templates';

export const MainPage = (): JSX.Element => {
  const [today, setToday] = useState(new Date());

  const dateObj = useMemo(() => {
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
      hour: today.getHours(),
    };
  }, [today]);

  const { startDate, endDate } = useMemo(() => {
    const { year, month, date } = dateObj;

    return {
      startDate: new Date(year, month, date).getTime(),
      endDate: new Date(year, month, date, 23, 59, 59, 999).getTime(),
    };
  }, [dateObj, today]);

  useInterval(() => {
    setToday(new Date(today.getTime() + 1000));
  }, 1000);

  const { data: dataMe, loading: isLoadingGetMe } = useGetMeQuery();

  const { data: dataTodos, loading: isLoadingGetTodos } = useGetTodosQuery(
    {
      startDate,
      endDate,
    },
    today,
  );

  const { data: dataReviews, loading: isLoadingGetReviews } =
    useGetReviewsQuery({ startDate, endDate }, today);

  const { createTodo, loading: isLoadingCreateTodo } = useCreateTodoMutation({
    startDate,
    endDate,
  });

  const { createReview, loading: isLoadingCreateReview } =
    useCreateReviewMutation({ startDate, endDate });

  const { updateTodo, loading: isLoadingUpdateTodo } = useUpdateTodoMutation({
    startDate,
    endDate,
  });

  const { updateReview, loading: isLoadingUpdateReview } =
    useUpdateReviewMutation({
      startDate,
      endDate,
    });

  const { deleteTodo } = useDeleteTodoMutation();
  const { deleteReview } = useDeleteReviewMutation();

  const isLoading = useMemo(
    () =>
      isLoadingGetMe ||
      isLoadingGetTodos ||
      isLoadingGetReviews ||
      isLoadingCreateTodo ||
      isLoadingCreateReview ||
      isLoadingUpdateTodo ||
      isLoadingUpdateReview,
    [
      isLoadingGetMe,
      isLoadingGetTodos,
      isLoadingGetReviews,
      isLoadingCreateTodo,
      isLoadingCreateReview,
      isLoadingUpdateTodo,
      isLoadingUpdateReview,
    ],
  );

  return (
    <>
      <MainTemplate
        dataMe={dataMe}
        dataTodos={dataTodos}
        dataReviews={dataReviews}
        today={today}
        setToday={setToday}
        createTodo={createTodo}
        createReview={createReview}
        updateTodo={updateTodo}
        updateReview={updateReview}
        deleteTodo={deleteTodo}
        deleteReview={deleteReview}
      />
      {isLoading && <LoadingTemplate />}
    </>
  );
};
