import * as types from '@types';
import * as models from '@models';
/** === LIST ACTIONS === */
/** => Process */
export const questListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
  console.log(payload, 'PAYLOADPROCESS');
  contextDispatch({ type: types.QUEST_LIST_PROCESS, payload });
  return {
    type: types.QUEST_LIST_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const questListSuccess = (
  payload: models.ListSuccessProps<models.QuestListItem[]>,
): models.ListSuccessAction<models.QuestListItem[]> => {
  console.log(payload, 'PAYLOADSUCCESS');
  return { type: types.QUEST_LIST_SUCCESS, payload };
};
/** => Failed */
export const questListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.QUEST_LIST_FAILED, payload };
};
/** => Refresh */
export const questListRefresh = () => {
  return { type: types.QUEST_LIST_REFRESH };
};
/** => Reset */
export const questListReset = () => {
  return { type: types.QUEST_LIST_RESET };
};
/** => Load More */
export const questListLoadMore = () => {
  return { type: types.QUEST_LIST_LOADMORE };
};
