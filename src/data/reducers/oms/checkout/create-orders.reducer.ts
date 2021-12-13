/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type CreateOrderInitialProps =
  models.DetailItemProps<models.CreateOrderSuccess>;
/** === INITIAL STATE === */
export const createOrderInitialState: CreateOrderInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const createOrderReducer = simplifyReducer(createOrderInitialState, {
  /** => Process */
  [types.CREATE_ORDER_PROCESS]() {
    return {
      ...createOrderInitialState,
      loading: true,
    };
  },
  /** => Success */
  [types.CREATE_ORDER_SUCCESS](
    state = createOrderInitialState,
    action: models.CreateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => Failed */
  [types.CREATE_ORDER_FAILED](
    state = createOrderInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
  /** => Reset */
  [types.CREATE_ORDER_RESET]() {
    return createOrderInitialState;
  },
});
