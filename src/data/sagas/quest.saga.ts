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
  console.log(action.payload, 'payloadSagas');
  try {
    const response: models.ListSuccessProps<models.QuestListItem[]> =
      yield call(() => {
        return QuestApi.getList(action.payload);
      });
    console.log(response, 'responseSagas');
    yield action.contextDispatch(ActionCreators.questListSuccess(response));
    yield put(ActionCreators.questListSuccess(response));
  } catch (error: any) {
    console.log(error, 'errorSagas');
    yield put(ActionCreators.questListFailed(error));
  }
}
/** === LISTENER === */
function* QuestSaga() {
  yield takeLatest(types.QUEST_LIST_PROCESS, questList);
}

export default QuestSaga;
