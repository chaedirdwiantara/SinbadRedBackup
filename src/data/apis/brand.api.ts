/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (payload: models.ListProcessProps) => {
  const path = `brands?limit=${payload.limit}&skip=${payload.skip}`;
  return apiMapping<models.BrandListItem[]>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};

export const BrandApi = {
  getList,
};
