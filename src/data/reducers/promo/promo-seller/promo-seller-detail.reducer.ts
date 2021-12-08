/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PromoSellerDetailInitialProps =
  models.DetailItemProps<models.PromoSellerDetailSuccessProps>;
/** === INITIAL STATE HERE === */
export const promoSellerDetailInitialState: PromoSellerDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const promoSellerDetailReducer = simplifyReducer(
  promoSellerDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.PROMO_SELLER_DETAIL_PROCESS]() {
      return {
        ...promoSellerDetailInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.PROMO_SELLER_DETAIL_SUCCESS](
      state = promoSellerDetailInitialState,
      action: models.DetailSuccessAction<models.PromoSellerDetailSuccessProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.PROMO_SELLER_DETAIL_FAILED](
      state = promoSellerDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.PROMO_SELLER_DETAIL_RESET]() {
      return promoSellerDetailInitialState;
    },
  },
);
