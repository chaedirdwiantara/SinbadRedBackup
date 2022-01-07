/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type InitialCartUpdateInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const initialCartUpdateInitialState: InitialCartUpdateInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const initialCartUpdateReducer = simplifyReducer(
  initialCartUpdateInitialState,
  {
    /** => Process */
    [types.INITIAL_CART_UPDATE_PROCESS]() {
      return {
        ...initialCartUpdateInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.INITIAL_CART_UPDATE_SUCCESS](
      state = initialCartUpdateInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.INITIAL_CART_UPDATE_FAILED](
      state = initialCartUpdateInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** Refresh */
    [types.INITIAL_CART_UPDATE_REFRESH]() {
      return {
        ...initialCartUpdateInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.INITIAL_CART_UPDATE_RESET]() {
      return initialCartUpdateInitialState;
    },
  },
);
