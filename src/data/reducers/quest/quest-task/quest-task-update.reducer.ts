/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type QuestTaskUpdateInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE */
export const questTaskUpdateInitialState: QuestTaskUpdateInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const questTaskUpdateReducer = simplifyReducer(
  questTaskUpdateInitialState,
  {
    /** ===> TASK */
    /** => task process */
    [types.QUEST_TASK_PROCESS](state = questTaskUpdateInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => task success */
    [types.QUEST_TASK_SUCCESS](
      state = questTaskUpdateInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => task failed */
    [types.QUEST_TASK_FAILED](
      state = questTaskUpdateInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
