/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTIONS === */

const getStockValidation = (payload: models.StockValidationProcessProps) => {
  const path = `warehouse-products/stock-validations?warehouseId=${payload.warehouseId}&productId=${payload.productId}`;
  return apiMapping<models.IStockValidaitonSuccess>(
    'auth',
    path,
    'warehouse',
    'v1',
    'DETAIL',
  );
};

export const WarehouseApi = {
  getStockValidation,
};
