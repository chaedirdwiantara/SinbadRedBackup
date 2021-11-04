/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTIONS === */
const getSegmentation = (payload: models.DetailProcessProps) => {
  const path = `stores/suppliers/${payload.id}`;
  return apiMapping<models.SupplierSegmentationSuccessProps>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};

export const SupplierApi = {
  getSegmentation,
};
