import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list product process */
export const productListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return { type: types.PRODUCT_LIST_PROCESS, payload: data, contextDispatch };
};
/** => list product success */
export const productListSuccess = (
  data: models.ListSuccessProps<models.ProductList[]>,
): models.ListSuccessAction<models.ProductList[]> => {
  return { type: types.PRODUCT_LIST_SUCCESS, payload: data };
};
/** => list product failed */
export const productListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload: data };
};
/** => list product refresh */
export const productListRefresh = () => {
  return { type: types.PRODUCT_LIST_REFRESH };
};
/** => list product reset */
export const productListReset = () => {
  return { type: types.PRODUCT_LIST_REFRESH };
};
/** => list product load more */
export const productListLoadMore = () => {
  return { type: types.PRODUCT_LIST_LOADMORE };
};
