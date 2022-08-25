/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type UpdateBadgeProfileInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const updateBadgeProfileInitialState: UpdateBadgeProfileInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const updateBadgeProfileReducer = simplifyReducer(
  updateBadgeProfileInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.UPDATE_BADGE_PROFILE_PROCESS]() {
      return {
        ...updateBadgeProfileInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.UPDATE_BADGE_PROFILE_SUCCESS](
      state = updateBadgeProfileInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.UPDATE_BADGE_PROFILE_FAILED](
      state = updateBadgeProfileInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.UPDATE_BADGE_PROFILE_RESET]() {
      return updateBadgeProfileInitialState;
    },
  },
);
