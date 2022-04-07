/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PostCheckProductInitialProps = models.CreateItemV3Props<
  models.CheckProductResponse[]
>;
/** === INITIAL STATE HERE === */
export const postCheckProductInitialState: PostCheckProductInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const postCheckProductReducer = simplifyReducer(
  postCheckProductInitialState,
  {
    /** => PROCESS */
    [types.POST_CHECK_PRODUCT_PROCESS]() {
      return {
        ...postCheckProductInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.POST_CHECK_PRODUCT_SUCCESS](
      state = postCheckProductInitialState,
      action: models.CreateSuccessV3Action<models.CheckProductResponse[]>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.POST_CHECK_PRODUCT_FAILED](
      state = postCheckProductInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.POST_CHECK_PRODUCT_RESET]() {
      return postCheckProductInitialState;
    },
  },
);
