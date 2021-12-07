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
  data: models.DetailSuccessProps<models.PotentialPromoProductProps>,
): models.DetailSuccessAction<models.PotentialPromoProductProps> => {
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

/** === DELETE RESERVE DISCOUNT === */
/** => delete reserve discount process */
export const deleteReserveDiscountProcess = (
  contextDispatch: (action: any) => any,
  data: models.DeleteProcessProps,
): models.DeleteProcessAction => {
  contextDispatch({
    type: types.DELETE_RESERVE_DISCOUNT_PROCESS,
    payload: data,
  });
  return {
    type: types.DELETE_RESERVE_DISCOUNT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => delete reserve discount success */
export const deleteReserveDiscountSuccess = (
  data: models.DeleteSuccessProps,
): models.DeleteSuccessAction => {
  return { type: types.DELETE_RESERVE_DISCOUNT_SUCCESS, payload: data };
};
/** => delete reserve discount failed */
export const deleteReserveDiscountFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.DELETE_RESERVE_DISCOUNT_FAILED, payload: data };
};
/** => delete reserve discount reset */
export const deleteReserveDiscountReset = () => {
  return { type: types.DELETE_RESERVE_DISCOUNT_RESET };
};

/** === CREATE RESERVE DISCOUNT === */
/** => create reserve discount process */
export const createReserveDiscountProcess = (
  contextDispatch: (action: any) => any,
  data: models.ReserveDiscountPostPayload,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.CREATE_RESERVE_DISCOUNT_PROCESS,
    payload: data,
  });
  return {
    type: types.CREATE_RESERVE_DISCOUNT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => create reserve discount success */
export const createReserveDiscountSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CREATE_RESERVE_DISCOUNT_SUCCESS, payload: data };
};
/** => create reserve discount failed */
export const createReserveDiscountFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CREATE_RESERVE_DISCOUNT_FAILED, payload: data };
};
/** => create reserve discount reset */
export const createReserveDiscountReset = () => {
  return { type: types.CREATE_RESERVE_DISCOUNT_RESET };
};

/** === DETAIL RESERVE DISCOUNT === */
/** => detail reserve discount process */
export const detailReserveDiscountProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.DETAIL_RESERVE_DISCOUNT_PROCESS,
    payload: data,
  });
  return {
    type: types.DETAIL_RESERVE_DISCOUNT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => detail reserve discount success */
export const detailReserveDiscountSuccess = (
  data: models.DetailSuccessProps<models.ReserveDiscountDetail>,
): models.DetailSuccessAction<models.ReserveDiscountDetail> => {
  return { type: types.DETAIL_RESERVE_DISCOUNT_SUCCESS, payload: data };
};
/** => detail reserve discount failed */
export const detailReserveDiscountFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.DETAIL_RESERVE_DISCOUNT_FAILED, payload: data };
};
/** => detail reserve discount reset */
export const detailReserveDiscountReset = () => {
  return { type: types.DETAIL_RESERVE_DISCOUNT_RESET };
};

/** === CHECK PROMO PAYMENT === */
/** => process */
export const checkPromoPaymentProcess = (
  contextDispatch: (action: any) => any,
  data: models.CheckPromoPaymentGetPayload,
): models.CheckPromoPaymentListProcessAction => {
  contextDispatch({
    type: types.CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const checkPromoPaymentSuccess = (
  data: models.ListSuccessProps<models.CheckPromoPaymentGetData[]>,
): models.ListSuccessAction<models.CheckPromoPaymentGetData[]> => {
  return { type: types.CHECK_PROMO_PAYMENT_SUCCESS, payload: data };
};
/** =>failed */
export const checkPromoPaymentFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.CHECK_PROMO_PAYMENT_FAILED, payload: data };
};
/** => reset */
export const checkPromoPaymentReset = () => {
  return { type: types.CHECK_PROMO_PAYMENT_RESET };
};

/** === CREATE CHECK ALL PROMO PAYMENT === */
/** => process */
export const createCheckAllPromoPaymentProcess = (
  contextDispatch: (action: any) => any,
  data: models.CheckAllPromoPaymentPostPayload[],
): models.CreateProcessAction<models.CheckAllPromoPaymentPostPayload[]> => {
  contextDispatch({
    type: types.CREATE_CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
  });
  return {
    type: types.CREATE_CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const createCheckAllPromoPaymentSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CREATE_CHECK_PROMO_PAYMENT_SUCCESS, payload: data };
};
/** => failed */
export const createCheckAllPromoPaymentFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CREATE_CHECK_PROMO_PAYMENT_FAILED, payload: data };
};
/** => reset */
export const createCheckAllPromoPaymentReset = () => {
  return { type: types.CREATE_CHECK_PROMO_PAYMENT_RESET };
};

/** === GET CHECK ALL PROMO PAYMENT === */
/** => process */
export const getCheckAllPromoPaymentProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.GET_CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
  });
  return {
    type: types.GET_CHECK_PROMO_PAYMENT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const getCheckAllPromoPaymentSuccess = (
  data: models.ListSuccessProps<models.CheckAllPromoPaymentGetData[]>,
): models.ListSuccessAction<models.CheckAllPromoPaymentGetData[]> => {
  return { type: types.GET_CHECK_PROMO_PAYMENT_SUCCESS, payload: data };
};
/** =>failed */
export const getCheckAllPromoPaymentFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.GET_CHECK_PROMO_PAYMENT_FAILED, payload: data };
};
/** => reset */
export const getCheckAllPromoPaymentReset = () => {
  return { type: types.GET_CHECK_PROMO_PAYMENT_RESET };
};
