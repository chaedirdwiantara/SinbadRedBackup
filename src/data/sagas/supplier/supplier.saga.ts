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
    const response: models.DetailSuccessProps<models.SupplierSegmentation> =
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
/** => Segmentation detail*/
function* supplierSegmentationDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.SupplierSegmentation> =
      yield call(() => {
        return SupplierApi.getSegmentation(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.supplierSegmentationDetailSuccess(response),
    );
    yield put(ActionCreators.supplierSegmentationDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.supplierSegmentationDetailFailed(
        error as models.ErrorProps,
      ),
    );
    yield put(
      ActionCreators.supplierSegmentationDetailFailed(
        error as models.ErrorProps,
      ),
    );
  }
}
/** => Send data to supplier */
function* sendDataToSupplier(
  action: models.CreateProcessAction<models.SendDataSupplierPayload>,
) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return SupplierApi.createSupplierStore(action.payload.data);
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
/** => register supplier */
function* registerSupplier(
  action: models.CreateProcessAction<models.SendDataSupplierPayload>,
) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return SupplierApi.createSupplierStore(action.payload.data);
    });
    yield action.contextDispatch(
      ActionCreators.registerSupplierSuccess(response),
    );
    yield put(ActionCreators.registerSupplierSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.registerSupplierFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.registerSupplierFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER ===*/
function* SupplierSaga() {
  yield takeLatest(types.SUPPLIER_SEGMENTATION_PROCESS, supplierSegmentation);
  yield takeLatest(types.SEND_DATA_SUPPLIER_PROCESS, sendDataToSupplier);
  yield takeLatest(
    types.SUPPLIER_SEGMENTATION2_PROCESS,
    supplierSegmentationDetail,
  );
  yield takeLatest(types.REGISTER_SUPPLIER_PROCESS, registerSupplier);
}

export default SupplierSaga;
