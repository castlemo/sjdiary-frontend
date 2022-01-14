import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { ME } from '../../graphQL/queries';
import { MeOutput } from '../../graphQL/types';
import { LoadingTemplate } from '../templates';
import { MainTemplate } from '../templates/mainTemplate';

export const MainPage = (): JSX.Element => {
  const [today, setToday] = useState(new Date());

  const {
    data: dataMe,
    loading: isLoadingMe,
    refetch: refetchMe,
  } = useQuery<{ me: MeOutput }>(ME, {
    fetchPolicy: 'network-only',
  });

  if (isLoadingMe) {
    return <LoadingTemplate />;
  }

  return <MainTemplate dataMe={dataMe?.me} today={today} setToday={setToday} />;
};
