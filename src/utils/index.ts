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

export const consoleLog = (v: any) => {
  if (process.env.REACT_APP_MODE === 'local') {
    console.log(v);
  }
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
