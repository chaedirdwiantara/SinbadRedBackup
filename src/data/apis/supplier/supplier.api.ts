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

const createSupplierStore = (
  payload: models.CreateProcessProps<models.SendDataSupplierProps>,
) => {
  const path = 'supplier-stores';
  return apiMapping('auth', path, 'account', 'v1', 'CREATE', payload.data);
};

export const SupplierApi = {
  getSegmentation,
  createSupplierStore,
};
