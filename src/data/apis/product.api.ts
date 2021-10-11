/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => product list */
const productList = (data: models.ListProcessProps) => {
  const path = `products?limit=${data.limit}&skip=${data.skip}`;
  return apiMapping<models.ProductList[]>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};
/** === EXPORT FUNCTIONS === */
export const ProductApi = {
  productList,
};
