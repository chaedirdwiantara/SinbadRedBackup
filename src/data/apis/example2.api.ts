/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '../../../core/services/apiMapping';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
const listExample2 = (data: models.ListProcessProps) => {
  const endpoint = `example?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.Example2[]>(endpoint, 'LIST');
};
/** => detail example */
const detailExample2 = (data: models.DetailProcessProps) => {
  const endpoint = `example/${data.id}`;
  return apiMapping<models.Example2>(endpoint, 'DETAIL');
};
/** === EXPORT FUNCTIONS === */
export const ExampleApi2 = {
  listExample2,
  detailExample2,
};
