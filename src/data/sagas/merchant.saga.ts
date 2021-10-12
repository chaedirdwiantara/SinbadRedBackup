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
/** => merchant edit  */
function* editMerchant(action: models.UpdateProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return MerchantApi.editMerchant(action.payload);
    });
    yield action.contextDispatch(ActionCreators.merchantEditSuccess(response));
    yield put(ActionCreators.merchantEditSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.merchantEditFailed(error));
    yield put(ActionCreators.merchantEditFailed(error));
  }
}
/** => profile edit  */
function* editProfile(action: models.UpdateProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return MerchantApi.editProfile(action.payload);
    });
    yield action.contextDispatch(ActionCreators.profileEditSuccess(response));
    yield put(ActionCreators.profileEditSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.profileEditFailed(error));
    yield put(ActionCreators.profileEditFailed(error));
  }
}
/** => list number of employee  */
function* numberOfEmployeeList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.NumberOfEmployeeList[]> =
      yield call(() => {
        return MerchantApi.numberOfEmployeeList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.numberOfEmployeeListSuccess(response),
    );
    yield put(ActionCreators.numberOfEmployeeListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.numberOfEmployeeListFailed(error),
    );
    yield put(ActionCreators.numberOfEmployeeListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* MerchantSaga() {
  yield takeLatest(types.SUPPLIER_LIST_PROCESS, supplierList);
  yield takeLatest(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeLatest(types.PROFILE_EDIT_PROCESS, editProfile);
  yield takeLatest(types.NUMBER_OF_EMPLOYEE_LIST_PROCESS, numberOfEmployeeList);
}

export default MerchantSaga;
