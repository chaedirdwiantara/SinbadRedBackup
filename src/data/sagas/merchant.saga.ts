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
  } catch (error: any) {
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
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.profileEditFailed(error));
    yield put(ActionCreators.profileEditFailed(error));
  }
}
/** => change email  */
function* changeEmail(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.changeEmail(action.payload);
    });
    yield action.contextDispatch(ActionCreators.changeEmailSuccess(response));
    yield put(ActionCreators.changeEmailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.changeEmailFailed(error));
    yield put(ActionCreators.changeEmailFailed(error));
  }
}
/** => verification email  */
function* verificationEmail(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.verificationEmail(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.verificationEmailSuccess(response),
    );
    yield put(ActionCreators.verificationEmailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.verificationEmailFailed(error));
    yield put(ActionCreators.verificationEmailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* MerchantSaga() {
  yield takeLatest(types.SUPPLIER_LIST_PROCESS, supplierList);
  yield takeLatest(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeLatest(types.PROFILE_EDIT_PROCESS, editProfile);
  yield takeLatest(types.CHANGE_EMAIL_PROCESS, changeEmail);
  yield takeLatest(types.VERIFICATION_EMAIL_PROCESS, verificationEmail);
}

export default MerchantSaga;
