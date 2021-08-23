/** === IMPORT PACKAGE HERE === */
import { put, call, takeEvery } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ExampleApi2 } from '../apis/example2.api';
import * as ActionCreators from '../actions';
import * as types from '../types';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
function* listExample2(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.Example2[]> = yield call(
      () => {
        return ExampleApi2.listExample2(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.example2ListSuccess(response));
    yield put(ActionCreators.example2ListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.example2ListFailed(error));
    yield put(ActionCreators.example2ListFailed(error));
  }
}
/** => detail example */
function* detailExample2(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.Example2> = yield call(
      () => {
        return ExampleApi2.detailExample2(action.payload);
      },
    );
    yield action.contextDispatch(
      ActionCreators.example2DetailSuccess(response),
    );
    yield put(ActionCreators.example2DetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.example2DetailFailed(error));
    yield put(ActionCreators.example2DetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ExampleSaga2() {
  yield takeEvery(types.EXAMPLE2_LIST_PROCESS, listExample2);
  yield takeEvery(types.EXAMPLE2_DETAIL_PROCESS, detailExample2);
}

export default ExampleSaga2;
