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
  return apiMapping<models.ICreateBasicAccountData>(
    'auth',
    path,
    'account',
    'v2',
    'UPDATE',
    data,
  );
};

const getCompleteData = () => {
  const path = 'profile/complete-data';
  return apiMapping<models.ICompleteData>(
    'auth',
    path,
    'account',
    'v2',
    'DETAIL',
  );
};

const completeDataConfirmation = () => {
  const path = 'profile/confirmation';
  return apiMapping<models.ICompleteData>(
    'auth',
    path,
    'account',
    'v2',
    'UPDATE',
  );
};

const updateCompleteData = (data: models.IUpdateCompleteData) => {
  const path = 'profile/complete-data-buyer';
  return apiMapping<any>('auth', path, 'account', 'v2', 'UPDATE', data);
};

export const easyRegistrationApi = {
  createBasicAccount,
  getBuyerCategory,
  getProductCategory,
  getCompleteData,
  updateCompleteData,
  completeDataConfirmation,
};
