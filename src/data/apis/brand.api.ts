/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => brand list */
const brandList = (data: models.ListProcessProps) => {
  const path = `brands?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.BrandListSuccessProps[]>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};

/** === EXPORT FUNCTIONS === */
export const BrandApi = {
  brandList,
};
