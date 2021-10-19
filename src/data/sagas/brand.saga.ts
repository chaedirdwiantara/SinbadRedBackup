/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { BrandApi } from '../apis/brand.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => brand list */
function* brandList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.BrandListSuccessProps> =
      yield call(() => {
        return BrandApi.brandList(action.payload);
      });
    yield action.contextDispatch(ActionCreators.brandListSuccess(response));
    yield put(ActionCreators.brandListSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.brandListFailed(error));
    yield put(ActionCreators.brandListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* BrandSaga() {
  yield takeLatest(types.BRAND_LIST_PROCESS, brandList);
}

export default BrandSaga;
