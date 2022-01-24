import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { ME, useTodosQuery } from '../../graphQL/queries';
import { MeOutput } from '../../graphQL/types';
import { LoadingTemplate, MainTemplate } from '../templates';

export const MainPage = (): JSX.Element => {
  const [today, setToday] = useState(new Date());

  const {
    data: dataMe,
    loading: isLoadingMe,
    refetch: refetchMe,
  } = useQuery<{ me: MeOutput }>(ME, {
    fetchPolicy: 'network-only',
  });

  const {
    data: dataTodos,
    loading: loadingTodos,
    error: ErrorTodos,
    refetch: refetchTodos,
  } = useTodosQuery({ startDate: Date.now(), endDate: Date.now() });

  if (isLoadingMe || loadingTodos) {
    return <LoadingTemplate />;
  }

  return (
    <MainTemplate
      dataMe={dataMe?.me}
      dataTodo={dataTodos}
      today={today}
      setToday={setToday}
    />
  );
};
