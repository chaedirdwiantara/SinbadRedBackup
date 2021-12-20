/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type RegisterSupplierInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const registerSupplierInitialState: RegisterSupplierInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const registerSupplierReducer = simplifyReducer(
  registerSupplierInitialState,
  {
    /** => Process */
    [types.REGISTER_SUPPLIER_PROCESS]() {
      return {
        ...registerSupplierInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.REGISTER_SUPPLIER_SUCCESS](
      state = registerSupplierInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.REGISTER_SUPPLIER_FAILED](
      state = registerSupplierInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** Refresh */
    [types.REGISTER_SUPPLIER_REFRESH]() {
      return {
        ...registerSupplierInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.REGISTER_SUPPLIER_RESET]() {
      return registerSupplierInitialState;
    },
  },
);
