/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type Example2DetailInitialProps = models.DetailItemProps<models.Example2>;
/** === INITIAL STATE HERE === */
export const example2DetailInitialState: Example2DetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const example2DetailReducer = simplifyReducer(
  example2DetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.EXAMPLE2_DETAIL_PROCESS]() {
      return {
        ...example2DetailInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.EXAMPLE2_DETAIL_SUCCESS](
      state = example2DetailInitialState,
      action: models.DetailSuccessAction<models.Example2>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.EXAMPLE2_DETAIL_FAILED](
      state = example2DetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.EXAMPLE2_DETAIL_RESET]() {
      return example2DetailInitialState;
    },
  },
);
