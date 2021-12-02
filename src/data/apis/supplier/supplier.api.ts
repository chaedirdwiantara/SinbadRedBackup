/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTIONS === */
const getSegmentation = (payload: models.DetailProcessProps) => {
  const path = `stores/suppliers/${payload.id}`;
  return apiMapping<models.SupplierSegmentation>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};

const createSupplierStore = (payload: models.SendDataSupplierPayload) => {
  console.log('[payload]: ', payload);
  const path = 'supplier-stores';
  return apiMapping('auth', path, 'account', 'v1', 'CREATE', payload);
};

export const SupplierApi = {
  getSegmentation,
  createSupplierStore,
};
