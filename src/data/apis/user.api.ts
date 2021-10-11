/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from '@core/services/apiGeneral';
import * as models from '@models';
/** === FUNCTION === */
/** => store detail */
const storeDetail = () => {
  const path = 'stores';
  return apiGeneral<models.StoreDetail>(
    'account',
    path,
    'account',
    'v1',
    'GET',
  );
};
/** => verfication order create */
const changePassword = (data: object) => {
  const path = 'change-password';
  return apiGeneral('auth', path, 'auth', 'v1', 'PATCH', data);
};
/** === EXPORT FUNCTIONS === */
export const UserApi = {
  storeDetail,
  changePassword,
};
