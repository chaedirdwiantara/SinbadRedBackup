/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PromoGeneralDetailInitialProps =
  models.DetailItemProps<models.PromoGeneralDetailSuccessProps>;
/** === INITIAL STATE HERE === */
export const promoGeneralDetailInitialState: PromoGeneralDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const promoGeneralDetailReducer = simplifyReducer(
  promoGeneralDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.PROMO_GENERAL_DETAIL_PROCESS]() {
      return {
        ...promoGeneralDetailInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.PROMO_GENERAL_DETAIL_SUCCESS](
      state = promoGeneralDetailInitialState,
      action: models.DetailSuccessAction<models.PromoGeneralDetailSuccessProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.PROMO_GENERAL_DETAIL_FAILED](
      state = promoGeneralDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.PROMO_GENERAL_DETAIL_RESET]() {
      return promoGeneralDetailInitialState;
    },
  },
);
