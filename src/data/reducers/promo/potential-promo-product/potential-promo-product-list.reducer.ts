/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PotentialPromoProductListInitialProps = models.ListItemProps<
  models.PotentialPromoProductProps[]
>;
/** === INITIAL STATE HERE === */
export const potentialPromoProductListInitialState: PotentialPromoProductListInitialProps =
  {
    data: [],
    error: null,
    loading: false,
    loadMore: false,
    refresh: false,
    total: 0,
    skip: 0,
  };
/** === FUNCTION HERE === */
export const potentialPromoProductListReducer = simplifyReducer(
  potentialPromoProductListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.POTENTIAL_PROMO_PRODUCT_PROCESS](
      state = potentialPromoProductListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.POTENTIAL_PROMO_PRODUCT_SUCCESS](
      state = potentialPromoProductListInitialState,
      action: models.ListSuccessAction<models.PotentialPromoProductProps[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
      };
    },
    /** => list failed */
    [types.POTENTIAL_PROMO_PRODUCT_FAILED](
      state = potentialPromoProductListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => list reset */
    [types.POTENTIAL_PROMO_PRODUCT_RESET]() {
      return potentialPromoProductListInitialState;
    },
  },
);
