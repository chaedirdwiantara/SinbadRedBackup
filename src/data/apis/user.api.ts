/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => store detail */
const storeDetail = (data: models.DetailProcessProps) => {
  const path = `stores/${data.id}`;
  return apiMapping<models.StoreDetail[]>(path, 'account', 'v1', 'DETAIL');
};
/** === EXPORT FUNCTIONS === */
export const UserApi = {
  storeDetail,
};
