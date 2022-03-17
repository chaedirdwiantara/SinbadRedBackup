/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type paymentMethodSubRtdbProps = models.DetailItemProps<any>;
/** === INITIAL STATE HERE === */
export const paymentMethodSubRtdbInitialState: paymentMethodSubRtdbProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */

export const paymentMethodSubRtdbReducer = simplifyReducer(
  paymentMethodSubRtdbInitialState,
  {
    /** => PROCESS */
    [types.PAYMENT_METHOD_SUB_RTDB_PROCESS]() {
      return {
        ...paymentMethodSubRtdbInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_METHOD_SUB_RTDB_SUCCESS](
      state = paymentMethodSubRtdbInitialState,
      action: models.CreateSuccessV3Action<any>,
    ) {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
  },
);
