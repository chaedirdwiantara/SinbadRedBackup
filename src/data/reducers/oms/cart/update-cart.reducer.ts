/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type UpdateCartInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const updateCartInitialState: UpdateCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const updateCartReducer = simplifyReducer(updateCartInitialState, {
  /** => update process */
  [types.UPDATE_CART_PROCESS]() {
    return {
      ...updateCartInitialState,
      loading: true,
    };
  },
  /** => update success */
  [types.UPDATE_CART_SUCCESS](
    state = updateCartInitialState,
    action: models.UpdateSuccessV3Action<models.UpdateCartPayload>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => update failed */
  [types.UPDATE_CART_FAILED](
    state = updateCartInitialState,
    action: models.UpdateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => update reset */
  [types.UPDATE_CART_RESET]() {
    return updateCartInitialState;
  },
});
