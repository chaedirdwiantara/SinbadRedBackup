/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type OrderStatusInitialProps = models.ListItemProps<
  Array<models.OrderStatus>
>;
/** === INITIAL STATE === */
export const orderStatusInitialState: OrderStatusInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === REDUCER === */
export const orderStatusReducer = simplifyReducer(orderStatusInitialState, {
  /** Process */
  [types.HISTORY_ORDER_STATUS_PROCESS](
    state = orderStatusInitialState,
    { payload }: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** Succeeded */
  [types.HISTORY_ORDER_STATUS_SUCCESS](
    state = orderStatusInitialState,
    { payload }: models.ListSuccessAction<Array<models.OrderStatus>>,
  ) {
    return {
      ...state,
      data: payload.data,
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
