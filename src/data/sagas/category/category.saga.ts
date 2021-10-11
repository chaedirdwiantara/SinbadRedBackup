/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { CategoryApi } from '../../apis/category.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => category home */
function* categoryHome(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.CategoryHome[]> = yield call(
      () => {
        return CategoryApi.categoryHome();
      },
    );
    yield action.contextDispatch(ActionCreators.categoryHomeSuccess(response));
    yield put(ActionCreators.categoryHomeSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.categoryHomeFailed(error));
    yield put(ActionCreators.categoryHomeFailed(error));
  }
}
/** => category level */
function* categoryLevel(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.CategoryLevel[]> =
      yield call(() => {
        return CategoryApi.categoryLevel();
      });
    yield action.contextDispatch(ActionCreators.categoryLevelSuccess(response));
    yield put(ActionCreators.categoryLevelSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.categoryLevelFailed(error));
    yield put(ActionCreators.categoryLevelFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* CategorySaga() {
  yield takeLatest(types.CATEGORY_HOME_PROCESS, categoryHome);
  yield takeLatest(types.CATEGORY_LEVEL_PROCESS, categoryLevel);
}

export default CategorySaga;
