import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import * as ActionCreators from '@actions';
import { ocrImageApi } from 'src/data/apis/account';

function* ocrImageProcess(actions: models.IAction<models.IOCRImage>) {
  try {
    const response: models.IUploadSecureImage = yield call(() =>
      ocrImageApi.uploadImage(actions.payload.imageUrl),
    );
    if (response.data.id) {
      const verifyResult: models.IImageVerification = yield call(() =>
        ocrImageApi.verifyImage({
          imageId: response.data.id,
          type: actions.payload.type,
        }),
      );
      yield put(
        ActionCreators.ocrImageSuccess({
          imageVericationData: verifyResult,
          uploadImageData: response,
        }),
      );
    } else {
      yield put(ActionCreators.ocrImageFailed(response));
    }
  } catch (error) {
    yield put(ActionCreators.ocrImageFailed(error));
  }
}

function* OcrImageSaga() {
  yield takeLatest(types.OCR_IMAGE_PROCESS, ocrImageProcess);
}

export default OcrImageSaga;
