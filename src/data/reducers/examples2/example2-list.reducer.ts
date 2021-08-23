/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type Example2ListInitialProps = models.ListItemProps<models.Example2[]>;
/** === INITIAL STATE HERE === */
export const example2ListInitialState: Example2ListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const example2ListReducer = simplifyReducer(example2ListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.EXAMPLE2_LIST_PROCESS](
    state = example2ListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.EXAMPLE2_LIST_SUCCESS](
    state = example2ListInitialState,
    action: models.ListSuccessAction<models.Example2[]>,
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
  [types.EXAMPLE2_LIST_FAILED](
    state = example2ListInitialState,
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
  [types.EXAMPLE2_LIST_RESET]() {
    return example2ListInitialState;
  },
  /** => list refresh */
  [types.EXAMPLE2_LIST_REFRESH]() {
    return {
      ...example2ListInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.EXAMPLE2_LIST_LOADMORE](state = example2ListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
