/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import apiUploadImage from '@core/services/apiUploadImage';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { GlobalApi } from '../../apis/global.api';
/** === FUNCTION === */
/** => upload image */
function* uploadImage(action: models.uploadImageAction) {
  try {
    const response: models.DetailSuccessProps<models.UploadImageDataProps> =
      yield call(() => {
        return apiUploadImage<models.UploadImageDataProps>(
          action.payload.imageUri,
        );
      });
    yield action.contextDispatch(ActionCreators.uploadImageSuccess(response));
    yield put(ActionCreators.uploadImageSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.uploadImageFailed(error));
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
