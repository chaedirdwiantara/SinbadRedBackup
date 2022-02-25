import * as models from '@models';
import * as types from '@types';

export const createBasicAccount = (
  data: models.ICreateBasicAccount,
): models.IAction<models.ICreateBasicAccount> => {
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
): models.IAction<models.IBuyerCategoryData> => {
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
): models.IAction<models.IProductCategoryData> => {
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
