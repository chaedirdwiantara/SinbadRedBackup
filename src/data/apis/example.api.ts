/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '../../../core/services/apiMapping';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
const listExample = (data: models.ListProcessProps) => {
  const endpoint = `example?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.Example[]>(endpoint, 'LIST');
};
/** => detail example */
const detailExample = (data: models.DetailProcessProps) => {
  const endpoint = `example/${data.id}`;
  return apiMapping<models.Example>(endpoint, 'DETAIL');
};
/** === EXPORT FUNCTIONS === */
export const ExampleApi = {
  listExample,
  detailExample,
};
