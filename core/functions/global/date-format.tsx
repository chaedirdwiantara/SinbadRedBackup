import moment from 'moment';

const idLocale = require('moment/locale/id');
const TimeZone = {
  7: 'WIB',
  8: 'WITA',
  9: 'WIT',
};

moment.locale('id', idLocale);

const toLocalDateTime = (ISOStringDate: string) => {
  const dateInstance = new Date(ISOStringDate);
  const timeZoneOffset = Math.abs(dateInstance.getTimezoneOffset() / 60);
  const localTimeZone = TimeZone[timeZoneOffset as keyof typeof TimeZone] || '';
  const localDateTime = moment(dateInstance)
    .format('lll')
    .replace('pukul ', '');
  const localDateTimeWithTimeZone = `${localDateTime} ${localTimeZone}`;

  return localDateTimeWithTimeZone;
};

export { toLocalDateTime };
