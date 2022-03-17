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
    /** => success */
    [types.PAYMENT_METHOD_SUB_RTDB_SUCCESS](
      state = paymentMethodSubRtdbInitialState,
      action: models.DetailSuccessAction<any>,
    ) {
      // console.log('REDUCER');

      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
  },
);
