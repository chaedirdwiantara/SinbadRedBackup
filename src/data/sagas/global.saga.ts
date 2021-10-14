/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { GlobalApi } from '../apis/global.api';
/** === FUNCTION === */
/** => login with username and password */
function* uploadImage(action: models.IRegisterAction<models.IUploadImage>) {
  try {
    const response: models.IUploadImageSuccess = yield call(() =>
      GlobalApi.uploadImage(action.payload),
    );
    yield put(ActionCreators.uploadImageSuccess(response));
  } catch (error) {
    yield put(ActionCreators.uploadImageFailed(error));
  }
}

function* getSelection(action: any) {
  try {
    const response: models.IGetSelectionSuccess<any> = yield call(() =>
      GlobalApi.getSelection(action.payload),
    );
    yield put(ActionCreators.getSelectionSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getSelectionFailed(error));
  }
}
function* getLocation(action: any) {
  try {
    const response: models.IGetSelectionSuccess<any> = yield call(() =>
      GlobalApi.getLocation(action.payload),
    );
    yield put(ActionCreators.getLocationSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getLocationFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* GlobalSaga() {
  yield takeLatest(types.UPLOAD_IMAGE_PROCESS, uploadImage);
  yield takeLatest(types.GET_SELECTION_PROCESS, getSelection);
  yield takeLatest(types.GET_LOCATION_PROCESS, getLocation);
}

export default GlobalSaga;
