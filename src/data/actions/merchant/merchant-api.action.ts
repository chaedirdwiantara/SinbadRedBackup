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
