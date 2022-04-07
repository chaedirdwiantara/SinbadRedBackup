import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const checkSellerProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckSellerPayload>,
): models.CreateProcessAction<models.CheckSellerPayload> => {
  contextDispatch({
    type: types.CHECK_SELLER_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECK_SELLER_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const checkSellerSuccess = (
  data: models.CreateSuccessV3Props<models.CheckSellerResponse[]>,
): models.CreateSuccessV3Action<models.CheckSellerResponse[]> => {
  return { type: types.CHECK_SELLER_SUCCESS, payload: data };
};
/** => FAILED */
export const checkSellerFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHECK_SELLER_FAILED, payload: data };
};
/** => RESET */
export const checkSellerReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CHECK_SELLER_RESET });
  return { type: types.CHECK_SELLER_RESET };
};
