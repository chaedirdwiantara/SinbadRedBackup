import * as types from '@types';
import * as models from '@models';

/** === DETAIL === */
/** => process */
export const thankYouPageOrderDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.THANK_YOU_PAGE_ORDER_DETAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.THANK_YOU_PAGE_ORDER_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const thankYouPageOrderDetailSuccess = (
  data: models.DetailSuccessProps<models.ThankYouOrderDetailProps>,
): models.DetailSuccessAction<models.ThankYouOrderDetailProps> => {
  return { type: types.THANK_YOU_PAGE_ORDER_DETAIL_SUCCESS, payload: data };
};
/** => failed */
export const thankYouPageOrderDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.THANK_YOU_PAGE_ORDER_DETAIL_FAILED, payload: data };
};
/** => reset */
export const thankYouPageOrderDetailReset = () => {
  return { type: types.THANK_YOU_PAGE_ORDER_DETAIL_RESET };
};
/** => loading */
export const thankYouPageOrderDetailLoading = () => {
  return { type: types.THANK_YOU_PAGE_ORDER_DETAIL_LOADING };
};