/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type QuestDetailInitialProps = models.DetailItemProps<models.QuestDetailItem>;
/** === INITIAL STATE HERE */
export const questGeneralDetailInitialState: QuestDetailInitialProps = {
  data: null,
  error: null,
  loading: true,
};
/** === FUNCTION HERE === */
export const questGeneralDetailReducer = simplifyReducer(
  questGeneralDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.QUEST_DETAIL_PROCESS](state = questGeneralDetailInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.QUEST_DETAIL_SUCCESS](
      state = questGeneralDetailInitialState,
      action: models.DetailSuccessAction<models.QuestDetailItem>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.QUEST_DETAIL_FAILED](
      state = questGeneralDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.QUEST_DETAIL_RESET]() {
      return questGeneralDetailInitialState;
    },
  },
);
