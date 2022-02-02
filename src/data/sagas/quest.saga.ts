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
    yield action.contextDispatch(
      ActionCreators.questListFailed(error as models.ErrorProps),
    );
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
    yield action.contextDispatch(
      ActionCreators.questDetailFailed(error as models.ErrorProps),
    );
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
    yield action.contextDispatch(
      ActionCreators.questTaskFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.questTaskFailed(error));
  }
}
/** => Detail Task */
function* questTaskDetail(action: models.QuestDetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.QuestTaskDetailItem> =
      yield call(() => {
        return QuestApi.getDetailTask(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.questTaskDetailSuccess(response),
    );
    yield put(ActionCreators.questTaskDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.questTaskDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.questTaskDetailFailed(error));
  }
}
/** => Validate Voucher */
function* questTaskValidateVoucher(
  action: models.QuestValidateVoucherProcessAction,
) {
  try {
    const response: models.DetailSuccessProps<models.QuestValidateVoucherItem> =
      yield call(() => {
        return QuestApi.getValidateVoucherCode(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.questTaskValidateVoucherSuccess(response),
    );
    yield put(ActionCreators.questTaskValidateVoucherSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.questTaskValidateVoucherFailed(error),
    );
    yield put(ActionCreators.questTaskValidateVoucherFailed(error));
  }
}
/** => Submit Voucher */
function* questTaskSubmitVoucher(action: models.QuestTaskProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return QuestApi.submitVoucher(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.questTaskSubmitVoucherSuccess(response),
    );
    yield put(ActionCreators.questTaskSubmitVoucherSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.questTaskSubmitVoucherFailed(error),
    );
    yield put(ActionCreators.questTaskSubmitVoucherFailed(error));
  }
}
/** === LISTENER === */
function* QuestSaga() {
  yield takeLatest(types.QUEST_LIST_PROCESS, questList);
  yield takeLatest(types.QUEST_DETAIL_PROCESS, questDetail);
  yield takeLatest(types.QUEST_TASK_PROCESS, questTask);
  yield takeLatest(types.QUEST_TASK_DETAIL_PROCESS, questTaskDetail);
  yield takeLatest(
    types.QUEST_VALIDATE_VOUCHER_PROCESS,
    questTaskValidateVoucher,
  );
  yield takeLatest(types.QUEST_SUBMIT_VOUCHER_PROCESS, questTaskSubmitVoucher);
}

export default QuestSaga;
