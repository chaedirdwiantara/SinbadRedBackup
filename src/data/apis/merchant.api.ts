/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from '@core/services/apiGeneral';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => supplier list */
const supplierList = (data: models.ListProcessProps) => {
  const path = `suppliers?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.SupplierList[]>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};
/** => merchant edit */
const editMerchant = (data: object) => {
  const path = 'stores/profile';
  return apiGeneral('auth', path, 'account', 'v1', 'PATCH', data);
};
/** => profile edit */
const editProfile = (data: object) => {
  const path = 'completed-data/profile-account-type';
  return apiMapping('auth', path, 'account', 'v1', 'PATCH', data);
};
/** => number of employee list */
const numberOfEmployeeList = () => {
  const path = 'number-of-employees';
  return apiMapping<models.NumberOfEmployeeList[]>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};
/** === EXPORT FUNCTIONS === */
export const MerchantApi = {
  supplierList,
  editMerchant,
  editProfile,
  numberOfEmployeeList,
};
