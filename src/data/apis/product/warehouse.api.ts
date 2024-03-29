/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTIONS === */

const getStockValidation = ({
  warehouseId,
  productId,
}: models.StockValidationProcessProps) => {
  const path = `warehouse-products/stock-validations?warehouseId=${warehouseId}&productId=${productId}`;
  return apiMapping<models.IStockValidaitonSuccess>(
    'auth',
    path,
    'warehouse',
    'v1',
    'DETAIL',
  );
};

const getStockInformation = ({ id }: models.DetailProcessProps) => {
  const path = `warehouse-products/get-stock-error/${id}`;
  return apiMapping<models.IStockInformationSuccess>(
    'auth',
    path,
    'warehouse',
    'v1',
    'DETAIL',
  );
};

export const WarehouseApi = {
  getStockValidation,
  getStockInformation,
};
