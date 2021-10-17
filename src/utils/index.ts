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
