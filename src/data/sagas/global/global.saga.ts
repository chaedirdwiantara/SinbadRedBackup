/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import apiUploadImage from '@core/services/apiUploadImage';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
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
/** === LISTEN FUNCTION === */
function* GlobalSaga() {
  yield takeLatest(types.UPLOAD_IMAGE_PROCESS, uploadImage);
}

export default GlobalSaga;
