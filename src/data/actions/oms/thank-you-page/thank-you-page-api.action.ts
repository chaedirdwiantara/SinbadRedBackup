import * as types from '@types';
import * as models from '@models';

/** === ORDER DETAIL === */
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

/** ===  PAYMENT GUIDE LIST ACTION  ===*/
/** => Process */
export const thankYouPagePaymentGuideListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.QUEST_LIST_PROCESS, payload });
  return {
    type: types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const thankYouPagePaymentGuideListSuccess = (
  payload: models.ListSuccessProps<models.PaymentGuideListItem[]>,
): models.ListSuccessAction<models.PaymentGuideListItem[]> => {
  return { type: types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_SUCCESS, payload };
};
/** => Failed */
export const thankYouPagePaymentGuideListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_FAILED, payload };
};
/** => Loading */
export const thankYouPagePaymentGuideListLoading = () => {
  return { type: types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_LOADING };
};
/** => Reset */
export const thankYouPagePaymentGuideListReset = () => {
  return { type: types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_RESET };
};