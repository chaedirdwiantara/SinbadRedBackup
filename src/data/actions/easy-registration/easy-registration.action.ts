import * as models from '@models';
import * as types from '@types';

// SEARH LOCATION AFTER SUCCESS REGISTER
export const searchLocation = (
  data: models.ISearchLocation,
): models.IRegisterAction<models.ISearchLocation> => {
  return {
    type: types.SEARCH_LOCATION_PROCESS,
    payload: data,
  };
};

export const searchLocationSuccess = (
  data: models.ListSuccessProps<models.ISearchLocationsData>,
): models.ListSuccessAction<models.ISearchLocationsData> => {
  return {
    type: types.SEARCH_LOCATION_SUCCESS,
    payload: data,
  };
};

export const searchLocationFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return {
    type: types.SEARCH_LOCATION_FAILED,
    payload: data,
  };
};

export const loadMoreSearchLocation = (
  data: models.ISearchLocation,
): models.IRegisterAction<models.ISearchLocation> => {
  return {
    type: types.LOAD_MORE_SEARCH_LOCATION_PROCESS,
    payload: data,
  };
};

export const loadMoreSearchLocationSuccess = (
  data: models.ListSuccessProps<models.ISearchLocationsData>,
): models.ListSuccessAction<models.ISearchLocationsData> => {
  return {
    type: types.LOAD_MORE_SEARCH_LOCATION_SUCCESS,
    payload: data,
  };
};

export const loadMoreSearchLocationFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return {
    type: types.LOAD_MORE_SEARCH_LOCATION_FAILED,
    payload: data,
  };
};

export const createBasicAccount = (
  data: models.ICreateBasicAccount,
): models.IRegisterAction<models.ICreateBasicAccount> => {
  return {
    type: types.CREATE_BASIC_ACCOUNT_PROCESS,
    payload: data,
  };
};

export const createBasicAccountSuccess = (data: any): any => {
  return {
    type: types.CREATE_BASIC_ACCOUNT_SUCCESS,
    payload: data,
  };
};

export const createBasicAccountFailed = (data: any): any => {
  return {
    type: types.CREATE_BASIC_ACCOUNT_FAILED,
    payload: data,
  };
};

export const getBuyerCategory = () => {
  return {
    type: types.BUYER_CATEGORY_PROCESS,
  };
};

export const getBuyerCategorySuccess = (
  data: models.IBuyerCategoryData,
): models.IRegisterAction<models.IBuyerCategoryData> => {
  return {
    type: types.BUYER_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const getBuyerCategoryFailed = (data: any): any => {
  return {
    type: types.BUYER_CATEGORY_FAILED,
    payload: data,
  };
};

export const getProductCategory = () => {
  return {
    type: types.PRODUCT_CATEGORY_PROCESS,
  };
};

export const getProductCategorySuccess = (
  data: models.IProductCategoryData,
): models.IRegisterAction<models.IProductCategoryData> => {
  return {
    type: types.PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const getProductCategoryFailed = (data: any): any => {
  return {
    type: types.PRODUCT_CATEGORY_FAILED,
    payload: data,
  };
};
