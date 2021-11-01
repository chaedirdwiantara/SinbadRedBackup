/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type UserDetailInitialProps = models.DetailItemProps<models.StoreDetail>;
/** === INITIAL STATE HERE === */
export const userDetailInitialState: UserDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const userDetailReducer = simplifyReducer(userDetailInitialState, {
  /** ===> DETAIL */
  /** => detail process */
  [types.STORE_DETAIL_PROCESS]() {
    return {
      ...userDetailInitialState,
      loading: true,
    };
  },
  /** => detail success */
  [types.STORE_DETAIL_SUCCESS](
    state = userDetailInitialState,
    action: models.DetailSuccessAction<models.StoreDetail>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => detail failed */
  [types.STORE_DETAIL_FAILED](
    state = userDetailInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
