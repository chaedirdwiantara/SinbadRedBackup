/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { MerchantApi } from '../apis/merchant.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => list example */
function* supplierList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.SupplierList[]> = yield call(
      () => {
        return MerchantApi.supplierList(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.supplierListSuccess(response));
    yield put(ActionCreators.supplierListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.supplierListFailed(error));
    yield put(ActionCreators.supplierListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* MerchantSaga() {
  yield takeLatest(types.SUPPLIER_LIST_PROCESS, supplierList);
}

export default MerchantSaga;
