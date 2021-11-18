import * as types from '@types';
import * as models from '@models';
/** === PROMO PAYMENT LIST === */
/** => promo payment list process */
export const promoPaymentListProcess = (
  contextDispatch: (action: any) => any,
  data: models.PromoPaymentListProcessProps,
): models.PromoPaymentListProcessAction => {
  contextDispatch({ type: types.PROMO_PAYMENT_LIST_PROCESS, payload: data });
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
/** === PROMO PAYMENT DETAIL === */
/** => promo payment detail process */
export const promoPaymentDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.PROMO_PAYMENT_DETAIL_PROCESS, payload: data });
  return {
    type: types.PROMO_PAYMENT_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => promo payment detail success */
export const promoPaymentDetailSuccess = (
  data: models.DetailSuccessProps<models.PromoPaymentDetailSuccessProps>,
): models.DetailSuccessAction<models.PromoPaymentDetailSuccessProps> => {
  return { type: types.PROMO_PAYMENT_DETAIL_SUCCESS, payload: data };
};
/** => promo payment detail failed */
export const promoPaymentDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PROMO_PAYMENT_DETAIL_FAILED, payload: data };
};
/** => promo payment detail reset */
export const promoPaymentDetailReset = () => {
  return { type: types.PROMO_PAYMENT_DETAIL_RESET };
};
/** === PROMO GENERAL DETAIL === */
/** => promo general detail process */
export const promoGeneralDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.PROMO_GENERAL_DETAIL_PROCESS, payload: data });
  return {
    type: types.PROMO_GENERAL_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => promo general detail success */
export const promoGeneralDetailSuccess = (
  data: models.DetailSuccessProps<models.PromoGeneralDetailSuccessProps>,
): models.DetailSuccessAction<models.PromoGeneralDetailSuccessProps> => {
  return { type: types.PROMO_GENERAL_DETAIL_SUCCESS, payload: data };
};
/** => promo general detail failed */
export const promoGeneralDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PROMO_GENERAL_DETAIL_FAILED, payload: data };
};
/** => promo general detail reset */
export const promoGeneralDetailReset = () => {
  return { type: types.PROMO_GENERAL_DETAIL_RESET };
};
/** === POTENTIAL PROMO PRODUCT === */
/** => potential promo product process */
export const potentialPromoProductProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.POTENTIAL_PROMO_PRODUCT_PROCESS,
    payload: data,
  });
  return {
    type: types.POTENTIAL_PROMO_PRODUCT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => potential promo product success */
export const potentialPromoProductSuccess = (
  data: models.ListSuccessProps<models.PotentialPromoProductProps[]>,
): models.ListSuccessAction<models.PotentialPromoProductProps[]> => {
  return { type: types.POTENTIAL_PROMO_PRODUCT_SUCCESS, payload: data };
};
/** => potential promo product failed */
export const potentialPromoProductFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.POTENTIAL_PROMO_PRODUCT_FAILED, payload: data };
};
/** => potential promo product reset */
export const potentialPromoProductReset = () => {
  return { type: types.POTENTIAL_PROMO_PRODUCT_RESET };
};
