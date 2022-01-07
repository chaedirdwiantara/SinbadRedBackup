/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { BrandApi } from '../apis/brand.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => List */
function* brandList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.BrandListItem[]> =
      yield call(() => {
        return BrandApi.getList(action.payload);
      });
    yield action.contextDispatch(ActionCreators.brandListSuccess(response));
    yield put(ActionCreators.brandListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.brandListFailed(error));
    yield put(ActionCreators.brandListFailed(error));
  }
}
/** === LISTENER === */
function* BrandSaga() {
  yield takeLatest(types.BRAND_LIST_PROCESS, brandList);
}

export default BrandSaga;
