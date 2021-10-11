/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type CategoryLevelListInitialProps = models.ListItemProps<
  models.CategoryLevel[]
>;
/** === INITIAL STATE HERE === */
export const categoryLevelListInitialState: CategoryLevelListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const categoryLevelListReducer = simplifyReducer(
  categoryLevelListInitialState,
  {
    /** => process */
    [types.CATEGORY_LEVEL_PROCESS](
      state = categoryLevelListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => success */
    [types.CATEGORY_LEVEL_SUCCESS](
      state = categoryLevelListInitialState,
      action: models.ListSuccessAction<models.CategoryLevel[]>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.CATEGORY_LEVEL_FAILED](
      state = categoryLevelListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CATEGORY_LEVEL_RESET]() {
      return categoryLevelListInitialState;
    },
  },
);
