import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => promo payment list process */
export const promoPaymentListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.PROMO_PAYMENT_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => promo payment list success */
export const promoPaymentListSuccess = (
  data: models.DetailSuccessProps<models.PromoPaymentListSuccessProps>,
): models.DetailSuccessAction<models.PromoPaymentListSuccessProps> => {
  return { type: types.PROMO_PAYMENT_LIST_SUCCESS, payload: data };
};
/** => promo payment list failed */
export const promoPaymentListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PROMO_PAYMENT_LIST_FAILED, payload: data };
};
/** => promo payment list refresh */
export const promoPaymentListRefresh = () => {
  return { type: types.PROMO_PAYMENT_LIST_REFRESH };
};
/** => promo payment list reset */
export const promoPaymentListReset = () => {
  return { type: types.PROMO_PAYMENT_LIST_RESET };
};
/** => promo payment list more */
export const promoPaymentListLoadMore = () => {
  return { type: types.PROMO_PAYMENT_LIST_LOADMORE };
};
