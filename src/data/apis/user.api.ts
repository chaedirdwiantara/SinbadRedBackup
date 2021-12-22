/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => store detail */
const storeDetail = () => {
  const path = 'stores';
  return apiMapping<models.StoreDetail>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};
/** => verfication order create */
const changePassword = (data: object) => {
  const path = 'change-password';
  return apiMapping('auth', path, 'auth', 'v1', 'UPDATE', data);
};
/** === EXPORT FUNCTIONS === */
export const UserApi = {
  storeDetail,
  changePassword,
};
