import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

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
    'public',
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

const getCoachmark = () => {
  const path = 'coachmark';
  return apiMapping<models.ICoachmarkData>(
    'auth',
    path,
    'auth',
    'v1',
    'DETAIL',
  );
};

const updateCoachmark = (data: models.ICoachmarkAction) => {
  const path = 'coachmark';
  return apiMapping<models.ICoachmarkData>(
    'auth',
    path,
    'auth',
    'v1',
    'UPDATE',
    { [data]: true },
  );
};

export const easyRegistrationApi = {
  createBasicAccount,
  getBuyerCategory,
  getProductCategory,
  getCoachmark,
  updateCoachmark,
};
