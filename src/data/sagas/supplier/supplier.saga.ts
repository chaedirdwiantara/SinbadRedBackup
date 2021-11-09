/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { SupplierApi } from 'src/data/apis/supplier/supplier.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => Segmentation */
function* supplierSegmentation(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.SupplierSegmentationSuccessProps> =
      yield call(() => {
        return SupplierApi.getSegmentation(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.supplierSegmentationSuccess(response),
    );
    yield put(ActionCreators.supplierSegmentationSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.supplierSegmentationFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.supplierSegmentationFailed(error as models.ErrorProps),
    );
  }
}
/** => Send data to supplier */
function* sendDataToSupplier(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return SupplierApi.createSupplierStore(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.sendDataToSupplierSuccess(response),
    );
    yield put(ActionCreators.sendDataToSupplierSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.sendDataToSupplierFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.sendDataToSupplierFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER ===*/
function* SupplierSaga() {
  yield takeLatest(types.SUPPLIER_SEGMENTATION_PROCESS, supplierSegmentation);
  yield takeLatest(types.SEND_DATA_SUPPLIER_PROCESS, sendDataToSupplier);
}

export default SupplierSaga;
