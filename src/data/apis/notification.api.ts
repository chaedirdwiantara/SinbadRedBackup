/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => notification list */
const notificationList = (
  data: models.ListProcessV3Props<{ perPage: number }>,
) => {
  const path = `notifications?page=${data.page}&perPage=${data.perPage}`;
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
  const path = 'notifications/unread';
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
