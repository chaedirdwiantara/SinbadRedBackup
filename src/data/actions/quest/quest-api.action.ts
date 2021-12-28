import * as types from '@types';
import * as models from '@models';
/** === LIST ACTIONS === */
/** => Process */
export const questListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
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

/** === DETAIL ACTIONS === */
/** => Process */
export const questDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.QuestDetailProcessProps,
): models.QuestDetailProcessAction => {
  contextDispatch({ type: types.QUEST_DETAIL_PROCESS, payload });
  return {
    type: types.QUEST_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const questDetailSuccess = (
  payload: models.DetailSuccessProps<models.QuestDetailItem>,
): models.DetailSuccessAction<models.QuestDetailItem> => {
  return { type: types.QUEST_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const questDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.QUEST_DETAIL_FAILED, payload };
};
/** => Reset */
export const questDetailReset = () => {
  return { type: types.QUEST_DETAIL_RESET };
};

/** === TASK ACTIONS === */
/** => Process */
export const questTaskProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({ type: types.QUEST_TASK_PROCESS, payload: data });
  return {
    type: types.QUEST_TASK_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => Succeeded */
export const questTaskSuccess = (
  payload: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.QUEST_TASK_SUCCESS, payload };
};
/** => Failed */
export const questTaskFailed = (
  payload: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.QUEST_TASK_FAILED, payload };
};
/** => Reset */
export const questTaskReset = () => {
  return { type: types.QUEST_DETAIL_RESET };
};

/** === DETAIL TASK ACTIONS === */
/** => Process */
export const questTaskDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.QuestDetailProcessProps,
): models.QuestDetailProcessAction => {
  contextDispatch({ type: types.QUEST_TASK_DETAIL_PROCESS, payload });
  return {
    type: types.QUEST_TASK_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const questTaskDetailSuccess = (
  payload: models.DetailSuccessProps<models.QuestTaskDetailItem>,
): models.DetailSuccessAction<models.QuestTaskDetailItem> => {
  return { type: types.QUEST_TASK_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const questTaskDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.QUEST_TASK_DETAIL_FAILED, payload };
};
/** => Reset */
export const questTaskDetailReset = () => {
  return { type: types.QUEST_TASK_DETAIL_RESET };
};
