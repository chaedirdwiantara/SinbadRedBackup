/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => delete reserve stock */
const deleteReserveStock = (data: models.DeleteProcessProps) => {
  const path = `warehouse-products/unreserve-stock/${data.id}`;
  return apiMapping<models.DeleteSuccessProps>(
    'auth',
    path,
    'warehouse',
    'v1',
    'DELETE',
  );
};
/** => create reserve stock */
const createReserveStock = (data: models.ReserveStockPayload) => {
  const path = 'warehouse-products/reserve-stock';
  return apiMapping<models.CreateSuccessProps>(
    'auth',
    path,
    'warehouse',
    'v1',
    'CREATE',
    data,
  );
};
/** => get error reserve stock */
const getErrorReserveStock = (data: models.DetailProcessProps) => {
  const path = `warehouse-products/get-stock-error/${data.id}`;
  return apiMapping<models.ReserveStockError>(
    'auth',
    path,
    'warehouse',
    'v1',
    'DETAIL',
    data,
  );
};

/** === EXPORT FUNCTIONS === */
export const ReserveStockApi = {
  deleteReserveStock,
  createReserveStock,
  getErrorReserveStock,
};
