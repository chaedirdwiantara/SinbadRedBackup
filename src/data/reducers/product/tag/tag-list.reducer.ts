/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type TagListInitialProps = models.TagListItemProps;
/** === INITIAL STATE === */
export const tagListInitialState: TagListInitialProps = {
  data: [],
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const tagListReducer = simplifyReducer(tagListInitialState, {
  /** => Process */
  [types.TAG_LIST_PROCESS](
    state = tagListInitialState,
    { payload }: models.TagListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.TAG_LIST_SUCCESS](
    state = tagListInitialState,
    { payload }: models.TagListSuccessAction,
  ) {
    return {
      ...state,
      data: [...state.data, ...payload.data],
      loading: false,
      refresh: false,
    };
  },
  /** => Failed */
  [types.TAG_LIST_FAILED](
    state = tagListInitialState,
    { payload }: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      refresh: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.TAG_LIST_REFRESH]() {
    return {
      ...tagListInitialState,
      refresh: true,
    };
  },
  /** => Reset */
  [types.TAG_LIST_RESET]() {
    return tagListInitialState;
  },
});
