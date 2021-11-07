/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type SendDataToSupplierInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const sendDataToSupplierInitialState: SendDataToSupplierInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const sendDataToSupplierReducer = simplifyReducer(
  sendDataToSupplierInitialState,
  {
    /** => Process */
    [types.SEND_DATA_SUPPLIER_PROCESS]() {
      return {
        ...sendDataToSupplierInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.SEND_DATA_SUPPLIER_SUCCESS](
      state = sendDataToSupplierInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => Failed */
    [types.SEND_DATA_SUPPLIER_FAILED](
      state = sendDataToSupplierInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** Refresh */
    [types.SEND_DATA_SUPPLIER_REFRESH]() {
      return {
        ...sendDataToSupplierInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.SEND_DATA_SUPPLIER_RESET]() {
      return sendDataToSupplierInitialState;
    },
  },
);
