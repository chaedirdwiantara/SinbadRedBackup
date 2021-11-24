/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type OrderStatusInitialProps =
  models.DetailItemProps<models.OrderStatusSuccessProps>;
/** === INITIAL STATE === */
export const orderStatusInitialState: OrderStatusInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const orderStatusReducer = simplifyReducer(orderStatusInitialState, {
  /** Process */
  [types.HISTORY_ORDER_STATUS_PROCESS]() {
    return {
      ...orderStatusInitialState,
      loading: true,
    };
  },
  /** Success */
  [types.HISTORY_ORDER_STATUS_SUCCESS](
    state = orderStatusInitialState,
    action: models.DetailSuccessAction<models.OrderStatusSuccessProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** Failed */
  [types.HISTORY_ORDER_STATUS_FAILED](
    state = orderStatusInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
});
