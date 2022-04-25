import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import * as ActionCreators from '@actions';
import { coachmarkApi } from 'src/data/apis/account';

function* getCoachmark() {
  try {
    const response: models.ICoachmarkData = yield call(() =>
      coachmarkApi.getCoachmark(),
    );
    yield put(ActionCreators.getCoachmarkSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getCoachmarkFailed(error));
  }
}

function* updateCoachmark(action: models.IAction<any>) {
  try {
    const response: models.ICoachmarkData = yield call(() =>
      coachmarkApi.updateCoachmark(action.payload),
    );
    yield put(ActionCreators.updateCoachmarkSuccess(response));
  } catch (error) {
    yield put(ActionCreators.updateCoachmarkFailed(error));
  }
}

function* CoachmarkSaga() {
  yield takeLatest(types.GET_COACHMARK_PROCESS, getCoachmark);
  yield takeLatest(types.UPDATE_COACHMARK_PROCESS, updateCoachmark);
}

export default CoachmarkSaga;
