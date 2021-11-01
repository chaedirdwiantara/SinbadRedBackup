/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { TagApi } from 'src/data/apis/product/tag.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTION === */
/** => List */
function* tagList(action: models.TagListProcessAction) {
  try {
    const response: models.TagListSuccessProps = yield call(() => {
      return TagApi.getList(action.payload);
    });
    yield action.contextDispatch(ActionCreators.tagListSuccess(response));
    yield put(ActionCreators.tagListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.tagListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.tagListFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* TagSaga() {
  yield takeLatest(types.TAG_LIST_PROCESS, tagList);
}

export default TagSaga;
