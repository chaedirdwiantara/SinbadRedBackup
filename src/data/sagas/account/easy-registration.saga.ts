import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import * as ActionCreators from '@actions';
import { easyRegistrationApi, searchLocationApi } from 'src/data/apis/account';

function* searchLocation(
  action: models.IRegisterAction<models.ISearchLocation>,
) {
  try {
    const response: models.ListSuccessProps<models.ISearchLocationsData> =
      yield call(() => searchLocationApi.searchLocation(action.payload));
    yield put(ActionCreators.searchLocationSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.searchLocationFailed(error));
  }
}

function* loadMoreSearchLocation(
  action: models.IRegisterAction<models.ISearchLocation>,
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
  action: models.IRegisterAction<models.ICreateBasicAccount>,
) {
  try {
    const response: models.ICreateBasicAccountData = yield call(() =>
      easyRegistrationApi.createBasicAccount(action.payload),
    );
    yield put(ActionCreators.createBasicAccountSuccess(response));
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
}

export default EasyRegistrationSaga;
