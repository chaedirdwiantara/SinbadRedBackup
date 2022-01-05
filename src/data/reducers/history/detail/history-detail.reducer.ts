/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type HistoryDetailInitialProps =
  models.DetailItemProps<models.HistoryDetail>;
/** === INITIAL STATE === */
export const historyDetailInitialState: HistoryDetailInitialProps = {
  data: null,
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const historyDetailReducer = simplifyReducer(historyDetailInitialState, {
  /** => Process */
  [types.HISTORY_DETAIL_PROCESS]() {
    return {
      ...historyDetailInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.HISTORY_DETAIL_SUCCESS](
    state = historyDetailInitialState,
    { payload }: models.DetailSuccessAction<models.HistoryDetail>,
  ) {
    return {
      ...state,
      data: payload.data,
      loading: false,
      error: null,
    };
  },
  /** => Failed */
  [types.HISTORY_DETAIL_FAILED](
    state = historyDetailInitialState,
    { payload }: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.HISTORY_DETAIL_REFRESH]() {
    return {
      ...historyDetailInitialState,
      refresh: true,
    };
  },
  /** => Reset */
  [types.HISTORY_DETAIL_RESET]() {
    return historyDetailInitialState;
  },
});
