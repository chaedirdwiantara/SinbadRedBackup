/** === IMPORT INTERNAL === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE === */
export type QuestListInitialProps = models.ListItemProps<
  models.QuestListItem[]
>;
/** === INITIAL STATE === */
export const questGeneralListInitialState: QuestListInitialProps = {
  data: [],
  loading: false,
  error: null,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === REDUCER === */
export const questGeneralListReducer = simplifyReducer(
  questGeneralListInitialState,
  {
    /** => Process */
    [types.QUEST_LIST_PROCESS](
      state = questGeneralListInitialState,
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
      state = questGeneralListInitialState,
      { payload }: models.ListSuccessAction<models.QuestListItem[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: payload.meta.total,
        skip: payload.meta.skip,
      };
    },
    /** => Reset */
    [types.QUEST_LIST_RESET]() {
      return questGeneralListInitialState;
    },
    /** => Refresh */
    [types.QUEST_LIST_REFRESH]() {
      return {
        ...questGeneralListInitialState,
        refresh: true,
      };
    },
    /** => Load More */
    [types.QUEST_LIST_LOADMORE](state = questGeneralListInitialState) {
      return {
        ...state,
        loadMore: true,
      };
    },
  },
);
