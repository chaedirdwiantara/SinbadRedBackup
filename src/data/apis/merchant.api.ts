/** === IMPORT EXTERNAL FUNCTION === */
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
  return apiMapping('auth', path, 'account', 'v1', 'PATCH', data);
};
/** => profile edit */
const editProfile = (data: object) => {
  const path = 'completed-data/profile-account-type';
  return apiMapping('auth', path, 'account', 'v1', 'PATCH', data);
};
/** => change email */
const changeEmail = (data: object) => {
  const path = 'request-change/email';
  return apiMapping('auth', path, 'account', 'v1', 'CREATE', data);
};
/** => verification email */
const verificationEmail = (data: object) => {
  const path = 'verification/email';
  return apiMapping('auth', path, 'common', 'v1', 'CREATE', data);
};
/** === EXPORT FUNCTIONS === */
export const MerchantApi = {
  supplierList,
  editMerchant,
  editProfile,
  changeEmail,
  verificationEmail,
};
