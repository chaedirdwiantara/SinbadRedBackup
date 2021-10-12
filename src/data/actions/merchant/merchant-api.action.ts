import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list supplier process */
export const supplierListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return { type: types.SUPPLIER_LIST_PROCESS, payload: data, contextDispatch };
};
/** => list supplier success */
export const supplierListSuccess = (
  data: models.ListSuccessProps<models.SupplierList[]>,
): models.ListSuccessAction<models.SupplierList[]> => {
  return { type: types.SUPPLIER_LIST_SUCCESS, payload: data };
};
/** => list supplier failed */
export const supplierListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.SUPPLIER_LIST_FAILED, payload: data };
};
/** => list supplier refresh */
export const supplierListRefresh = () => {
  return { type: types.SUPPLIER_LIST_REFRESH };
};
/** => list supplier reset */
export const supplierListReset = () => {
  return { type: types.SUPPLIER_LIST_RESET };
};
/** => list supplier load more */
export const supplierListLoadMore = () => {
  return { type: types.SUPPLIER_LIST_LOADMORE };
};
/** === MERCHANT EDIT === */
/** => process */
export const merchantEditProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({
    type: types.MERCHANT_EDIT_PROCESS,
    payload: data,
  });
  return {
    type: types.MERCHANT_EDIT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const merchantEditSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.MERCHANT_EDIT_SUCCESS, payload: data };
};
/** => failed */
export const merchantEditFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.MERCHANT_EDIT_FAILED, payload: data };
};
/** => merchant edit reset */
export const merchantEditReset = () => {
  return { type: types.MERCHANT_EDIT_RESET };
};
/** === PROFILE ACCOUNT EDIT === */
/** => process */
export const profileEditProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({
    type: types.PROFILE_EDIT_PROCESS,
    payload: data,
  });
  return {
    type: types.PROFILE_EDIT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const profileEditSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.PROFILE_EDIT_SUCCESS, payload: data };
};
/** => failed */
export const profileEditFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
};
/** => profile edit reset */
export const profileEditReset = () => {
  return { type: types.PROFILE_EDIT_RESET };
};
/** === GET NUMBER OF EMPLOYEE LIST === */
/** => list number of employee process */
export const numberOfEmployeeListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.NUMBER_OF_EMPLOYEE_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => list number of employee success */
export const numberOfEmployeeListSuccess = (
  data: models.ListSuccessProps<models.SupplierList[]>,
): models.ListSuccessAction<models.SupplierList[]> => {
  return { type: types.NUMBER_OF_EMPLOYEE_LIST_SUCCESS, payload: data };
};
/** => list number of employee failed */
export const numberOfEmployeeListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.NUMBER_OF_EMPLOYEE_LIST_FAILED, payload: data };
};
