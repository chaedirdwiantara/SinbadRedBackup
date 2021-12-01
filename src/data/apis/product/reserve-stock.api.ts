/** === IMPORT EXTERNAL FUNCTION === */
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => delete reserve stock */
const deleteReserveStock = (data: models.DeleteProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `reserve-stock/${data.id}`;
  return apiMappingMock<models.DeleteSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'DELETE',
  );
};
/** => create reserve stock */
const createReserveStock = (data: models.CreateProcessProps<{}>) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = 'reserve-stock';
  return apiMappingMock<models.CreateSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};

/** === EXPORT FUNCTIONS === */
export const ReserveStockApi = {
  deleteReserveStock,
  createReserveStock,
};
