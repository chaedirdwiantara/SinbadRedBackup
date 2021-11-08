/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => notification list */
const notificationList = (data: models.ListProcessProps) => {
  const path = `notifications?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.NotificationListSuccessProps[]>(
    'auth',
    path,
    'common',
    'v1',
    'LIST',
  );
};

/** === EXPORT FUNCTIONS === */
export const NotificationApi = {
  notificationList,
};
