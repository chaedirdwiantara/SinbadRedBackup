import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import * as ActionCreators from '@actions';
import { easyRegistrationApi, searchLocationApi } from 'src/data/apis/account';

function* searchLocation(action: models.IAction<models.ISearchLocation>) {
  try {
    const response: models.ListSuccessProps<models.ISearchLocationsData> =
      yield call(() => searchLocationApi.searchLocation(action.payload));
    yield put(ActionCreators.searchLocationSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.searchLocationFailed(error));
  }
}

function* loadMoreSearchLocation(
  action: models.IAction<models.ISearchLocation>,
) {
  try {
    const response: models.ListSuccessProps<models.ISearchLocationsData> =
      yield call(() => searchLocationApi.searchLocation(action.payload));
    yield put(ActionCreators.loadMoreSearchLocationSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.loadMoreSearchLocationFailed(error));
  }
}

function* createBasicAccount(
  action: models.IAction<models.ICreateBasicAccount>,
) {
  try {
    const response: models.ICreateBasicAccountData = yield call(() =>
      easyRegistrationApi.createBasicAccount(action.payload),
    );
    yield put(
      ActionCreators.createBasicAccountSuccess(response, action.params),
    );
  } catch (error) {
    yield put(ActionCreators.createBasicAccountFailed(error));
  }
}

function* getBuyerCategory() {
  try {
    const response: models.IBuyerCategoryData = yield call(() =>
      easyRegistrationApi.getBuyerCategory(),
    );
    yield put(ActionCreators.getBuyerCategorySuccess(response));
  } catch (error) {
    yield put(ActionCreators.getBuyerCategoryFailed(error));
  }
}

function* getProductCategory() {
  try {
    const response: models.IProductCategoryData = yield call(() =>
      easyRegistrationApi.getProductCategory(),
    );
    yield put(ActionCreators.getProductCategorySuccess(response));
  } catch (error) {
    yield put(ActionCreators.getProductCategoryFailed(error));
  }
}

function* getCompleteData() {
  try {
    const response: models.ICompleteData = yield call(() =>
      easyRegistrationApi.getCompleteData(),
    );
    yield put(ActionCreators.getCompleteDataSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getCompleteDataFailed(error));
  }
}

function* completeDataConfirmation() {
  try {
    const response: models.ICompleteData = yield call(() =>
      easyRegistrationApi.completeDataConfirmation(),
    );
    yield put(ActionCreators.completeDataConfirmationSuccess(response));
  } catch (error) {
    yield put(ActionCreators.completeDataConfirmationFailed(error));
  }
}

function* updateCompleteData(
  action: models.IAction<models.IUpdateCompleteData>,
) {
  try {
    const response: models.ICreateBasicAccountData = yield call(() =>
      easyRegistrationApi.updateCompleteData(action.payload),
    );
    yield put(
      ActionCreators.updateCompleteDataSuccess(response, action.payload),
    );
  } catch (error) {
    yield put(ActionCreators.updateCompleteDataFailed(error));
  }
}

function* uploadSecureImage(actions: models.IAction<models.IOCRImage>) {
  try {
    const response: models.IUploadSecureImage = yield call(() =>
      easyRegistrationApi.uploadImage(actions.payload.imageUrl),
    );
    yield put(
      ActionCreators.uploadSecureImageSuccess(response),
    );
  } catch (error) {
    yield put(ActionCreators.uploadSecureImageFailed(error));
  }
}

function* EasyRegistrationSaga() {
  yield debounce(250, types.SEARCH_LOCATION_PROCESS, searchLocation);
  yield debounce(
    100,
    types.LOAD_MORE_SEARCH_LOCATION_PROCESS,
    loadMoreSearchLocation,
  );

  yield takeLatest(types.CREATE_BASIC_ACCOUNT_PROCESS, createBasicAccount);
  yield takeLatest(types.BUYER_CATEGORY_PROCESS, getBuyerCategory);
  yield takeLatest(types.PRODUCT_CATEGORY_PROCESS, getProductCategory);
  yield takeLatest(types.GET_COMPLETE_DATA_PROCESS, getCompleteData);
  yield takeLatest(types.UPDATE_COMPLETE_DATA_PROCESS, updateCompleteData);
  yield takeLatest(types.REFETCH_COMPLETE_DATA_PROCESS, getCompleteData);
  yield takeLatest(
    types.COMPLETE_DATA_CONFIRMATION_PROCESS,
    completeDataConfirmation,
  );
  yield takeLatest(types.UPLOAD_SECURE_IMAGE_PROCESS, uploadSecureImage);
}

export default EasyRegistrationSaga;
