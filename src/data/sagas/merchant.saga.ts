/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { MerchantApi } from '../apis/merchant.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
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
/** => change mobile phone  */
function* changeMobilePhone(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.changeMobilePhone(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.changeMobilePhoneSuccess(response),
    );
    yield put(ActionCreators.changeMobilePhoneSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.changeMobilePhoneFailed(error));
    yield put(ActionCreators.changeMobilePhoneFailed(error));
  }
}
/** => verification email  */
function* verificationMobilePhone(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.verificationMobilePhone(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.verificationMobilePhoneSuccess(response),
    );
    yield put(ActionCreators.verificationMobilePhoneSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.verificationMobilePhoneFailed(error),
    );
    yield put(ActionCreators.verificationMobilePhoneFailed(error));
  }
}
/** => change bank account  */
function* changeBankAccount(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.changeBankAccount(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.changeBankAccountSuccess(response),
    );
    yield put(ActionCreators.changeBankAccountSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.changeBankAccountFailed(error));
    yield put(ActionCreators.changeBankAccountFailed(error));
  }
}
/** => verification bank account  */
function* verificationBankAccount(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return MerchantApi.verificationBankAccount(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.verificationBankAccountSuccess(response),
    );
    yield put(ActionCreators.verificationBankAccountSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.verificationBankAccountFailed(error),
    );
    yield put(ActionCreators.verificationBankAccountFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* MerchantSaga() {
  yield takeLatest(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeLatest(types.PROFILE_EDIT_PROCESS, editProfile);
  yield takeLatest(types.CHANGE_EMAIL_PROCESS, changeEmail);
  yield takeLatest(types.VERIFICATION_EMAIL_PROCESS, verificationEmail);
  yield takeLatest(types.CHANGE_MOBILE_PHONE_PROCESS, changeMobilePhone);
  yield takeLatest(
    types.VERIFICATION_MOBILE_PHONE_PROCESS,
    verificationMobilePhone,
  );
  yield takeLatest(types.CHANGE_BANK_ACCOUNT_PROCESS, changeBankAccount);
  yield takeLatest(
    types.VERIFICATION_BANK_ACCOUNT_PROCESS,
    verificationBankAccount,
  );
}

export default MerchantSaga;
