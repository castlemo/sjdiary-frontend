import { Console } from 'console';

export const getTodayZeroTimeTimestamp = (): number => {
  const todayDate = new Date();
  return +new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    0,
    0,
    0,
  );
};

export const convertToDate = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month =
    dateObj.getMonth() + 1 >= 10
      ? `${dateObj.getMonth() + 1}`
      : `0${dateObj.getMonth() + 1}`;

  const date =
    dateObj.getDate() >= 10
      ? dateObj.getDate().toString()
      : `0${dateObj.getDate()}`;

  const day = dateObj.getDay();

  const hour =
    dateObj.getHours() >= 10
      ? dateObj.getHours().toString()
      : `0${dateObj.getHours()}`;

  const minute =
    dateObj.getMinutes() >= 10
      ? dateObj.getMinutes().toString()
      : `0${dateObj.getMinutes()}`;

  return {
    year,
    month,
    date,
    day,
    hour,
    minute,
  };
};

// 주차의 시작은 월요일
export const getWeek = (date = new Date()): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  let dayCount = 1;
  if (firstDay !== 0) {
    for (let i = firstDay; i < 7; i++) {
      dayCount++;
    }
  }

  const nowDate = date.getDate();

  if (nowDate <= dayCount) {
    return 1;
  }

  let week = 1;
  for (let i = dayCount + 8; i <= 32; i += 7) {
    week++;
    if (nowDate < i) {
      break;
    }
  }

  return week;
};
