/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => supplier list */
const supplierList = (data: models.ListProcessProps) => {
  const path = `suppliers?buyerId=3&limit=10&skip=${data.skip}`;
  console.log('sini:', data);
  return apiMapping<models.SupplierList[]>(path, 'account', 'v1', 'LIST');
};
/** === EXPORT FUNCTIONS === */
export const MerchantApi = {
  supplierList,
};
