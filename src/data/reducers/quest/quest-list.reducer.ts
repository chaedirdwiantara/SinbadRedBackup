/** === IMPORT INTERNAL === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE === */
export type QuestListInitialProps = models.ListItemProps<
  models.QuestListItem[]
>;
/** === INITIAL STATE === */
export const questListInitialState: QuestListInitialProps = {
  data: [],
  loading: false,
  error: null,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === REDUCER === */
export const questListReducer = simplifyReducer(questListInitialState, {
  /** => Process */
  [types.QUEST_LIST_PROCESS](
    state = questListInitialState,
    { payload }: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.QUEST_LIST_SUCCESS](
    state = questListInitialState,
    { payload }: models.ListSuccessAction<models.QuestListItem[]>,
  ) {
    return {
      ...state,
      data: [...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      total: payload.meta.total,
      skip: payload.meta.skip,
    };
  },
  /** => Reset */
  [types.BRAND_LIST_RESET]() {
    return questListInitialState;
  },
  /** => Refresh */
  [types.BRAND_LIST_REFRESH]() {
    return {
      ...questListInitialState,
      refresh: true,
    };
  },
});
