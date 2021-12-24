/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { QuestApi } from '../apis/quest.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => List */
function* questList(
  action: models.ListProcessAction<
    models.ListProcessProps<models.QuestListProcessProps>
  >,
) {
  try {
    const response: models.ListSuccessProps<models.QuestListItem[]> =
      yield call(() => {
        return QuestApi.getList(action.payload);
      });
    yield action.contextDispatch(ActionCreators.questListSuccess(response));
    yield put(ActionCreators.questListSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.questListFailed(error));
  }
}
/** => Detail */
function* questDetail(action: models.QuestDetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.QuestDetailItem> =
      yield call(() => {
        return QuestApi.getDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.questDetailSuccess(response));
    yield put(ActionCreators.questDetailSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.questDetailFailed(error));
  }
}
/** => Update Task */
function* questTask(action: models.QuestTaskProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return QuestApi.updateTask(action.payload);
    });
    yield action.contextDispatch(ActionCreators.questTaskSuccess(response));
    yield put(ActionCreators.questTaskSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.questTaskFailed(error));
  }
}
/** === LISTENER === */
function* QuestSaga() {
  yield takeLatest(types.QUEST_LIST_PROCESS, questList);
  yield takeLatest(types.QUEST_DETAIL_PROCESS, questDetail);
  yield takeLatest(types.QUEST_TASK_PROCESS, questTask);
}

export default QuestSaga;
