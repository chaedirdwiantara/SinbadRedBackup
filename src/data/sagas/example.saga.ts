/** === IMPORT PACKAGE HERE === */
import { put, call, takeEvery } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ExampleApi } from '../apis/example.api';
import * as ActionCreators from '../actions';
import * as types from '../types';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
function* listExample(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.Example[]> = yield call(
      () => {
        return ExampleApi.listExample(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.exampleListSuccess(response));
    yield put(ActionCreators.exampleListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.exampleListFailed(error));
    yield put(ActionCreators.exampleListFailed(error));
  }
}
/** => detail example */
function* detailExample(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.Example> = yield call(
      () => {
        return ExampleApi.detailExample(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.exampleDetailSuccess(response));
    yield put(ActionCreators.exampleDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.exampleDetailFailed(error));
    yield put(ActionCreators.exampleDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ExampleSaga() {
  yield takeEvery(types.EXAMPLE_LIST_PROCESS, listExample);
  yield takeEvery(types.EXAMPLE_DETAIL_PROCESS, detailExample);
}

export default ExampleSaga;
