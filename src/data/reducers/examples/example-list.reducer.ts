/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type ExampleListInitialProps = models.ListItemProps<models.Example[]>;
/** === INITIAL STATE HERE === */
export const exampleListInitialState: ExampleListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const exampleListReducer = simplifyReducer(exampleListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.EXAMPLE_LIST_PROCESS](
    state = exampleListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.EXAMPLE_LIST_SUCCESS](
    state = exampleListInitialState,
    action: models.ListSuccessAction<models.Example[]>,
  ) {
    return {
      ...state,
      data: [...state.data, ...action.payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      total: action.payload.meta.total,
      skip: action.payload.meta.skip,
    };
  },
  /** => list failed */
  [types.EXAMPLE_LIST_FAILED](
    state = exampleListInitialState,
    action: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      loadMore: false,
      refresh: false,
      error: action.payload,
    };
  },
  /** => list reset */
  [types.EXAMPLE_LIST_RESET]() {
    return exampleListInitialState;
  },
  /** => list refresh */
  [types.EXAMPLE_LIST_REFRESH]() {
    return {
      ...exampleListInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.EXAMPLE_LIST_LOADMORE](state = exampleListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
