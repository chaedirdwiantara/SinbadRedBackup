/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const productListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ProductListProcessProps,
  subModule?: models.ProductSubModule,
): models.ProductListProcessAction => {
  contextDispatch({ type: types.PRODUCT_LIST_PROCESS, payload });
  return {
    type: types.PRODUCT_LIST_PROCESS,
    payload,
    contextDispatch,
    subModule,
  };
};
/** => Succeeded */
export const productListSuccess = (
  payload: models.ListSuccessProps<models.ProductList[]>,
): models.ListSuccessAction<models.ProductList[]> => {
  return { type: types.PRODUCT_LIST_SUCCESS, payload };
};
/** => Failed */
export const productListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload };
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
