import * as types from '@types';
import * as models from '@models';
/** === CREATE === */
/** => process */
export const verificationOrderCreateProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.VERIFICATION_ORDER_CREATE_PROCESS,
    payload: data,
  });
  return {
    type: types.VERIFICATION_ORDER_CREATE_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const verificationOrderCreateSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.VERIFICATION_ORDER_CREATE_SUCCESS, payload: data };
};
/** => failed */
export const verificationOrderCreateFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.VERIFICATION_ORDER_CREATE_FAILED, payload: data };
};
/** => reset */
export const verificationOrderCreateReset = () => {
  return { type: types.VERIFICATION_ORDER_CREATE_RESET };
};
/** === DETAIL === */
/** => process */
export const verificationOrderDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.VERIFICATION_ORDER_DETAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.VERIFICATION_ORDER_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => process */
export const verificationOrderDetailSuccess = (
  data: models.DetailSuccessProps<models.VerificationOrderDetailProps>,
): models.DetailSuccessAction<models.VerificationOrderDetailProps> => {
  return { type: types.VERIFICATION_ORDER_DETAIL_SUCCESS, payload: data };
};
/** => failed */
export const verificationOrderDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.VERIFICATION_ORDER_DETAIL_FAILED, payload: data };
};
/** => reset */
export const verificationOrderDetailReset = () => {
  return { type: types.VERIFICATION_ORDER_DETAIL_RESET };
};
/** => loading */
export const verificationOrderDetailLoading = () => {
  return { type: types.VERIFICATION_ORDER_DETAIL_LOADING };
};
