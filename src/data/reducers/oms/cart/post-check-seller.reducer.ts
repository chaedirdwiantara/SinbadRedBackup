/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PostCheckSellerInitialProps = models.CreateItemV3Props<
  models.CheckSellerResponse[]
>;
/** === INITIAL STATE HERE === */
export const postCheckSellerInitialState: PostCheckSellerInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const postCheckSellerReducer = simplifyReducer(
  postCheckSellerInitialState,
  {
    /** => PROCESS */
    [types.POST_CHECK_SELLER_PROCESS]() {
      return {
        ...postCheckSellerInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.POST_CHECK_SELLER_SUCCESS](
      state = postCheckSellerInitialState,
      action: models.CreateSuccessV3Action<models.CheckSellerResponse[]>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.POST_CHECK_SELLER_FAILED](
      state = postCheckSellerInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.POST_CHECK_SELLER_RESET]() {
      return postCheckSellerInitialState;
    },
  },
);
