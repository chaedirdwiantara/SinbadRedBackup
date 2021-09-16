import * as types from '@types';
import * as models from '@models';
/** === VERIFICATION ORDER === */
/** => verfication order process */
export const verificationOrderProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.CreateProcessAction => {
  contextDispatch({ type: types, payload: data });
  return { type: types.PRODUCT_LIST_PROCESS, payload: data, contextDispatch };
};
/** => verfication order success */
export const verificationOrderSuccess = (
  data: models.ListSuccessProps<models.ProductList[]>,
): models.ListSuccessAction<models.ProductList[]> => {
  return { type: types.PRODUCT_LIST_SUCCESS, payload: data };
};
/** => verfication order failed */
export const verificationOrderFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload: data };
};
