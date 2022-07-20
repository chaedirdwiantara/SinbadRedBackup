/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckBuyerInitialProps = models.DetailItemProps<models.CheckBuyer>;
/** === INITIAL STATE HERE === */
export const checkBuyerInitialState: CheckBuyerInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const checkBuyerReducer = simplifyReducer(checkBuyerInitialState, {
  /** => PROCESS */
  [types.CHECK_BUYER_PROCESS]() {
    return {
      ...checkBuyerInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.CHECK_BUYER_SUCCESS](
    state = checkBuyerInitialState,
    action: models.DetailSuccessAction<models.CheckBuyer>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CHECK_BUYER_FAILED](
    state = checkBuyerInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CHECK_BUYER_RESET]() {
    return checkBuyerInitialState;
  },
});
