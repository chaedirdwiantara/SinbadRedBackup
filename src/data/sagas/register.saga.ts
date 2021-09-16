import { takeLatest, put, call } from 'redux-saga/effects';
import { registerApi } from '../apis/register.api';
import * as types from '@types';
import * as ActionCreators from '@actions';
import * as models from '@models';

/** check phone no */
function* checkPhoneNoAvailability(
  action: models.IRegisterAction<models.ICheckPhoneNoAvailabilityProcess>,
) {
  try {
    const response: models.ICheckPhoneNoAvailabilitySuccess = yield call(() =>
      registerApi.checkPhoneNoAvailability(action.payload),
    );
    yield put(ActionCreators.checkPhoneNoAvailabilitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.checkPhoneNoAvailabilityFailed(error));
  }
}

/** register merchant */
function* registerMerchant(
  action: models.IRegisterAction<models.IRegisterMerchantProcess>,
) {
  try {
    const response: models.IRegisterMerchantSuccess = yield call(() => {
      registerApi.registerMerchant(action.payload);
    });
    yield put(ActionCreators.merchantRegisterSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantRegisterFailed(error));
  }
}

function* RegisterSaga() {
  yield takeLatest(types.REGISTER_MERCHANT_PROCESS, registerMerchant);
  yield takeLatest(
    types.CHECK_PHONE_AVAILABILITY_PROCESS,
    checkPhoneNoAvailability,
  );
}

export default RegisterSaga;
