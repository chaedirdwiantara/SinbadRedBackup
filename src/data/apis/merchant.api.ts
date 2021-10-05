/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => supplier list */
const supplierList = (data: models.ListProcessProps) => {
  const path = `suppliers?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.SupplierList[]>(path, 'account', 'v1', 'LIST');
};
/** => merchant edit */
const editMerchant = (data: object) => {
  const path = 'stores/profile';
  return apiMapping(path, 'account', 'v1', 'PATCH', data);
};
/** === EXPORT FUNCTIONS === */
export const MerchantApi = {
  supplierList,
  editMerchant,
};
