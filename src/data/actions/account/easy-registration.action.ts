import * as models from '@models';
import * as types from '@types';

export const createBasicAccount = (
  data: models.ICreateBasicAccount,
): models.IAction<models.ICreateBasicAccount> => ({
  type: types.CREATE_BASIC_ACCOUNT_PROCESS,
  payload: data,
});

export const createBasicAccountSuccess = (data: any) => ({
  type: types.CREATE_BASIC_ACCOUNT_SUCCESS,
  payload: data,
});

export const createBasicAccountFailed = (data: any) => ({
  type: types.CREATE_BASIC_ACCOUNT_FAILED,
  payload: data,
});

export const getBuyerCategory = () => ({
  type: types.BUYER_CATEGORY_PROCESS,
});

export const getBuyerCategorySuccess = (
  data: models.IBuyerCategoryData,
): models.IAction<models.IBuyerCategoryData> => ({
  type: types.BUYER_CATEGORY_SUCCESS,
  payload: data,
});

export const getBuyerCategoryFailed = (data: any) => ({
  type: types.BUYER_CATEGORY_FAILED,
  payload: data,
});

export const getProductCategory = () => ({
  type: types.PRODUCT_CATEGORY_PROCESS,
});

export const getProductCategorySuccess = (
  data: models.IProductCategoryData,
): models.IAction<models.IProductCategoryData> => ({
  type: types.PRODUCT_CATEGORY_SUCCESS,
  payload: data,
});

export const getProductCategoryFailed = (data: any) => ({
  type: types.PRODUCT_CATEGORY_FAILED,
  payload: data,
});

export const getCompleteData = (): models.IAction<any> => ({
  type: types.GET_COMPLETE_DATA_PROCESS,
  payload: null,
});

export const refetchCompleteData = (): models.IAction<any> => ({
  type: types.REFETCH_COMPLETE_DATA_PROCESS,
  payload: null,
});

export const getCompleteDataSuccess = (
  data: models.ICompleteData,
): models.IAction<models.ICompleteData> => ({
  type: types.GET_COMPLETE_DATA_SUCCESS,
  payload: data,
});

export const getCompleteDataFailed = (data: any): models.IAction<any> => ({
  type: types.GET_COMPLETE_DATA_FAILED,
  payload: data,
});

export const updateCompleteData = (
  data: models.IUpdateCompleteData,
): models.IAction<models.IUpdateCompleteData> => ({
  type: types.UPDATE_COMPLETE_DATA_PROCESS,
  payload: data,
});

export const updateCompleteDataSuccess = (data: any) => ({
  type: types.UPDATE_COMPLETE_DATA_SUCCESS,
  payload: data,
});

export const updateCompleteDataFailed = (data: any) => ({
  type: types.UPDATE_COMPLETE_DATA_FAILED,
  payload: data,
});

export const resetUpdateCompleteData = () => ({
  type: types.UPDATE_COMPLETE_DATA_RESET,
});

export const completeDataConfirmation = (): models.IAction<any> => ({
  type: types.COMPLETE_DATA_CONFIRMATION_PROCESS,
  payload: null,
});

export const completeDataConfirmationSuccess = (data: any) => ({
  type: types.COMPLETE_DATA_CONFIRMATION_SUCCESS,
  payload: data,
});

export const completeDataConfirmationFailed = (data: any) => ({
  type: types.COMPLETE_DATA_CONFIRMATION_FAILED,
  payload: data,
});

export const resetCompleteDataConfirmation = () => ({
  type: types.RESET_COMPLETE_DATA_CONFIRMATION,
});