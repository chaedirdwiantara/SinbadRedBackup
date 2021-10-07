/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type CategoryHomeListInitialProps = models.ListItemProps<models.CategoryHome[]>;
/** === INITIAL STATE HERE === */
export const categoryHomeListInitialState: CategoryHomeListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const categoryHomeListReducer = simplifyReducer(
  categoryHomeListInitialState,
  {
    /** => process */
    [types.CATEGORY_HOME_PROCESS](
      state = categoryHomeListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => success */
    [types.CATEGORY_HOME_SUCCESS](
      state = categoryHomeListInitialState,
      action: models.ListSuccessAction<models.CategoryHome[]>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.CATEGORY_HOME_FAILED](
      state = categoryHomeListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CATEGORY_HOME_RESET]() {
      return categoryHomeListInitialState;
    },
  },
);
