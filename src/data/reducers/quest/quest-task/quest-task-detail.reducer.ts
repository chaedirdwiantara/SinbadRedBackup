/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type QuestTaskDetailInitialProps =
  models.DetailItemProps<models.QuestTaskDetailItem>;
/** === INITIAL STATE HERE */
export const questTaskDetailInitialState: QuestTaskDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const questTaskDetailReducer = simplifyReducer(
  questTaskDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.QUEST_TASK_DETAIL_PROCESS](state = questTaskDetailInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.QUEST_TASK_DETAIL_SUCCESS](
      state = questTaskDetailInitialState,
      action: models.DetailSuccessAction<models.QuestTaskDetailItem>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.QUEST_TASK_DETAIL_FAILED](
      state = questTaskDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.QUEST_TASK_DETAIL_RESET]() {
      return questTaskDetailInitialState;
    },
  },
);
