import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const searchLocation = (data: models.ISearchLocation) => {
  const path = `location?keyword=${data.keyword}&page=${data.page}&perPage=${data.perPage}`;
  return apiMapping<models.ListSuccessProps<models.ISearchLocationsData>>(
    'public',
    path,
    'location',
    'v1',
    'LIST',
  );
};

const getBuyerCategory = () => {
  const path = 'buyer-category';
  return apiMapping<models.ListSuccessProps<models.IBuyerCategoryData>>(
    'auth',
    path,
    'account',
    'v1',
    'LIST',
  );
};

const getProductCategory = () => {
  const path = 'product-categories?allParent=true';
  return apiMapping<models.ListSuccessProps<models.IProductCategoryData>>(
    'auth',
    path,
    'product',
    'v1',
    'LIST',
  );
};

const createBasicAccount = (data: models.ICreateBasicAccount) => {
  const path = 'profile/complete-data';
  return apiMapping<any>('auth', path, 'account', 'v2', 'UPDATE', data);
};

export const easyRegistrationApi = {
  searchLocation,
  createBasicAccount,
  getBuyerCategory,
  getProductCategory,
};
