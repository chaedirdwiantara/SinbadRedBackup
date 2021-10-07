/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => category home */
const categoryHome = () => {
  const path = 'product-categories/home';
  return apiMapping<models.CategoryHome[]>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};
/** => category level */
const categoryLevel = () => {
  const path = 'product-categories';
  return apiMapping<models.CategoryLevel[]>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};
/** === EXPORT FUNCTIONS === */
export const CategoryApi = {
  categoryHome,
  categoryLevel,
};
