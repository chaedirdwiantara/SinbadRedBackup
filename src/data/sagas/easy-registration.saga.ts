import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import { easyRegistrationApi } from '../apis/easy-registration.api';
import * as ActionCreators from '@actions';

/** check phone no */
function* searchLocation() {
  try {
    const response: models.ListSuccessProps<models.ISearchLocationsData> =
      yield call(() => easyRegistrationApi.searchLocation());
    yield put(ActionCreators.searchLocationSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.searchLocationFailed(error));
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
  yield takeLatest(types.CREATE_BASIC_ACCOUNT_PROCESS, createBasicAccount);
  yield takeLatest(types.BUYER_CATEGORY_PROCESS, getBuyerCategory);
  yield takeLatest(types.PRODUCT_CATEGORY_PROCESS, getProductCategory);
}

export default EasyRegistrationSaga;
