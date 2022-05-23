import * as types from '@types';
import * as models from '@models';

/** => process */
export const checkoutTNCProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.CHECKOUT_TNC_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECKOUT_TNC_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const checkoutTNCSuccess = (
  data: models.DetailSuccessProps<models.CheckoutTnc>,
): models.DetailSuccessAction<models.CheckoutTnc> => {
  return { type: types.CHECKOUT_TNC_SUCCESS, payload: data };
};
/** => failed */
export const checkoutTNCFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CHECKOUT_TNC_FAILED, payload: data };
};
/** => reset */
export const checkoutTNCReset = () => {
  return { type: types.CHECKOUT_TNC_RESET };
};
/** => loading */
export const checkoutTNCLoading = () => {
  return { type: types.CHECKOUT_TNC_LOADING };
};