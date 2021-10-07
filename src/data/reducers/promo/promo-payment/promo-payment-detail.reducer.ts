/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PromoPaymentDetailInitialProps =
  models.DetailItemProps<models.PromoPaymentDetailSuccessProps>;
/** === INITIAL STATE HERE === */
export const promoPaymentDetailInitialState: PromoPaymentDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const promoPaymentDetailReducer = simplifyReducer(
  promoPaymentDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.PROMO_PAYMENT_DETAIL_PROCESS]() {
      return {
        ...promoPaymentDetailInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.PROMO_PAYMENT_DETAIL_SUCCESS](
      state = promoPaymentDetailInitialState,
      action: models.DetailSuccessAction<models.PromoPaymentDetailSuccessProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.PROMO_PAYMENT_DETAIL_FAILED](
      state = promoPaymentDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.PROMO_PAYMENT_DETAIL_RESET]() {
      return promoPaymentDetailInitialState;
    },
  },
);
