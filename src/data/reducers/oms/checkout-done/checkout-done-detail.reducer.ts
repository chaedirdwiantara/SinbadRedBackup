/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type GetOrdersDetailInitialProps =
  models.DetailItemProps<models.CheckoutDoneOrders>;
/** === INITIAL STATE === */
export const getOrdersDetailInitialState: GetOrdersDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const getOrdersDetailReducer = simplifyReducer(
  getOrdersDetailInitialState,
  {
    /** => Process */
    [types.GET_ORDER_DETAIL_PROCESS]() {
      return {
        ...getOrdersDetailInitialState,
        loading: true,
      };
    },
    /** => Success */
    [types.GET_ORDER_DETAIL_SUCCESS](
      state = getOrdersDetailInitialState,
      action: models.DetailSuccessAction<models.CheckoutDoneOrders>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => Failed */
    [types.GET_ORDER_DETAIL_FAILED](
      state = getOrdersDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    /** => Reset */
    [types.GET_ORDER_DETAIL_RESET]() {
      return getOrdersDetailInitialState;
    },
  },
);
