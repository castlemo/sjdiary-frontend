import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { ME } from '../../graphQL/queries';
import { MeOutput } from '../../graphQL/types';
import { LoadingTemplate } from '../templates';
import { MainTemplate } from '../templates/mainTemplate';

export const MainPage = (): JSX.Element => {
  const [today, setToday] = useState(new Date());

  const { data: dataMe, loading: isLoadingMe } = useQuery<{ me: MeOutput }>(
    ME,
    {
      fetchPolicy: 'network-only',
    },
  );

  if (isLoadingMe) {
    return <LoadingTemplate />;
  }

  const onClickUpdateToday = (type: 'left' | 'right'): void => {
    const date = today.getDate();
    const newDate = new Date(today);
    if (type === 'left') {
      newDate.setDate(date - 7);
    } else {
      newDate.setDate(date + 7);
    }

    setToday(newDate);
  };

  return (
    <MainTemplate
      dataMe={dataMe?.me}
      today={today}
      onClickUpdateToday={onClickUpdateToday}
    />
  );
};
