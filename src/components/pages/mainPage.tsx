import { useEffect, useMemo, useState } from 'react';

import {
  useCreateReviewMutation,
  useCreateTodoMutation,
  useCreateUserMutation,
} from '../../graphQL/mutations';
import {
  useGetMeQuery,
  useGetReviewsQuery,
  useGetTodosQuery,
} from '../../graphQL/queries';
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

  useEffect(() => {
    const updateDateInterval = setInterval(() => {
      setToday(new Date(today.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(updateDateInterval);
    };
  }, [today]);

  const {
    data: dataMe,
    loading: isLoadingGetMe,
    error: errorGetMe,
  } = useGetMeQuery();

  const {
    data: dataTodos,
    loading: isLoadingGetTodos,
    error: errorGetTodos,
  } = useGetTodosQuery({ startDate, endDate });

  const {
    data: dataReviews,
    loading: isLoadingGetReviews,
    error: errorGetReviews,
  } = useGetReviewsQuery({ startDate, endDate });

  const {
    createTodo,
    loading: isLoadingCreateTodo,
    error: errorCreateTodo,
  } = useCreateTodoMutation({ startDate, endDate });

  const {
    createReview,
    loading: isLoadingCreateReview,
    error: errorCreateReview,
  } = useCreateReviewMutation({ startDate, endDate });

  const isLoading =
    isLoadingGetMe ||
    isLoadingGetTodos ||
    isLoadingGetReviews ||
    isLoadingCreateTodo ||
    isLoadingCreateReview;

  const isError =
    errorGetMe ||
    errorGetTodos ||
    errorGetReviews ||
    errorCreateTodo ||
    errorCreateReview;

  if (isLoading) {
    return <LoadingTemplate />;
  }

  if (isError) {
    alert('error');
    console.log(
      errorGetMe ||
        errorGetTodos ||
        errorGetReviews ||
        errorCreateTodo ||
        errorCreateReview ||
        '???',
    );
  }

  return (
    <MainTemplate
      dataMe={dataMe}
      dataTodos={dataTodos}
      dataReviews={dataReviews}
      today={today}
      setToday={setToday}
    />
  );
};
