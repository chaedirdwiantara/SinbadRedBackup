const TimeZone = {
  7: 'WIB',
  8: 'WITA',
  9: 'WIT',
};
const Month = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'Mei',
  5: 'Jun',
  6: 'Jul',
  7: 'Agust',
  8: 'Sept',
  9: 'Okt',
  10: 'Nov',
  11: 'Des',
};

const toLocalDateTime = (ISOStringDate: string) => {
  const dateInstance = new Date(ISOStringDate);
  const timeZoneOffset = Math.abs(dateInstance.getTimezoneOffset() / 60);
  const date = dateInstance.getDate();
  const month = Month[dateInstance.getMonth() as keyof typeof Month];
  const year = dateInstance.getFullYear();
  const hour =
    dateInstance.getHours() < 10
      ? `0${dateInstance.getHours()}`
      : dateInstance.getHours();
  const minute =
    dateInstance.getMinutes() < 10
      ? `0${dateInstance.getMinutes()}`
      : dateInstance.getMinutes();
  const localTimeZone = TimeZone[timeZoneOffset as keyof typeof TimeZone] || '';
  const localDateTime = `${date} ${month} ${year} ${hour}:${minute} ${localTimeZone}`;

  return localDateTime;
};

export { toLocalDateTime };
