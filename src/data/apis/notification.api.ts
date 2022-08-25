/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
import moment from 'moment';
/** === FUNCTION === */
const startEndDate = () => {
  // only get 30 day
  //(YYYY-MM-DD)
  const formatDate = 'YYYY-MM-DD';
  const day30Before = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  const startDate = moment(day30Before).format(formatDate);
  const endDate = moment().format(formatDate);

  return { startDate, endDate };
};
/** => notification list */
const notificationList = (
  data: models.ListProcessV3Props<{ perPage: number }>,
) => {
  const { endDate, startDate } = startEndDate();

  const path = `notifications?page=${data.page}&perPage=${data.perPage}&startDate=${startDate}&endDate=${endDate}`;

  return apiMapping<models.NotificationListSuccessProps[]>(
    'auth',
    path,
    'common',
    'v1',
    'LIST',
  );
};

/** => notification list */
const notificationTotal = () => {
  const { endDate, startDate } = startEndDate();

  const path = `notifications/unread?startDate=${startDate}&endDate=${endDate}`;

  return apiMapping<models.NotificationTotalSuccess>(
    'auth',
    path,
    'common',
    'v1',
    'DETAIL',
  );
};

/** => notification mark read */
const notificationMarkRead = (id: string) => {
  const path = `notifications/${id}/read`;
  return apiMapping('auth', path, 'common', 'v1', 'CREATE');
};
/** === EXPORT FUNCTIONS === */
export const NotificationApi = {
  notificationList,
  notificationTotal,
  notificationMarkRead,
};
