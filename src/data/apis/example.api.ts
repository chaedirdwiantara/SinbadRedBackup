/** === IMPORT EXTERNAL FUNCTION === */
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
const listExample = (data: models.ListProcessProps) => {
  const mockHost =
    'https://dc687b55-e036-4881-bd9d-e293f9177435.mock.pstmn.io/';
  const path = `example?limit=${data.limit}&skip=${data.skip}`;
  return apiMappingMock<models.ProductList[]>(mockHost, path, 'LIST');
};
/** => detail example */
const detailExample = (data: models.DetailProcessProps) => {
  const mockHost =
    'https://dc687b55-e036-4881-bd9d-e293f9177433.mock.pstmn.io/';
  const path = `example/${data.id}`;
  return apiMappingMock<models.Example>(mockHost, path, 'DETAIL');
};
/** === EXPORT FUNCTIONS === */
export const ExampleApi = {
  listExample,
  detailExample,
};
