/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const productListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ProductListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.PRODUCT_LIST_PROCESS, payload: data });
  return { type: types.PRODUCT_LIST_PROCESS, payload: data, contextDispatch };
};
/** => Succeeded */
export const productListSuccess = (
  data: models.ListSuccessProps<models.ProductList[]>,
): models.ListSuccessAction<models.ProductList[]> => {
  return { type: types.PRODUCT_LIST_SUCCESS, payload: data };
};
/** => Failed */
export const productListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload: data };
};
/** => Refresh */
export const productListRefresh = () => {
  return { type: types.PRODUCT_LIST_REFRESH };
};
/** => Load More */
export const productListLoadMore = () => {
  return { type: types.PRODUCT_LIST_LOADMORE };
};
/** => Reset */
export const productListReset = () => {
  return { type: types.PRODUCT_LIST_RESET };
};
