// import apiGeneral from '@core/services/apiGeneral';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';

const searchLocation = () => {
  const path = 'locations';
  return apiMappingMock<models.ListSuccessProps<models.ISearchLocationsData>>(
    'https://1574b265-8c26-4f34-90ea-4b1ae296bf46.mock.pstmn.io',
    path,
    'account',
    'v1',
    'LIST',
  );
};

const getBuyerCategory = () => {
  const path = 'buyer-category';
  return apiMappingMock<models.ListSuccessProps<models.IBuyerCategoryData>>(
    'https://aea8524f-cf86-4a9d-bf5d-2ed0340e6de8.mock.pstmn.io',
    path,
    'account',
    'v1',
    'LIST',
  );
};

const getProductCategory = () => {
  const path = 'product-categories?allParent=true';
  return apiMappingMock<models.ListSuccessProps<models.IProductCategoryData>>(
    'https://ad534493-7558-4d8f-a1b5-47288a49b84f.mock.pstmn.io',
    path,
    'account',
    'v1',
    'LIST',
  );
};

const createBasicAccount = (data: models.ICreateBasicAccount) => {
  const path = 'profile/complete-data';
  return apiMappingMock<any>(
    'https://aea8524f-cf86-4a9d-bf5d-2ed0340e6de8.mock.pstmn.io',
    path,
    'account',
    'v2',
    'UPDATE',
    data,
  );
};

export const easyRegistrationApi = {
  searchLocation,
  createBasicAccount,
  getBuyerCategory,
  getProductCategory,
};
