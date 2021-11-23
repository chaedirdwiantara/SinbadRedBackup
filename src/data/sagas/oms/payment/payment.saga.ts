/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { MerchantApi } from '../apis/merchant.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { PaymentApi } from 'src/data/apis/oms/payment/payment.api';
/** === FUNCTION === */
/** => list example */
function* paymentTypesList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.IPaymentTypesList[]> = yield call(
      () => {
        return PaymentApi.paymentTypesList(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.paymentTypesListSuccess(response));
    yield put(ActionCreators.paymentTypesListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.paymentTypesListFailed(error));
    yield put(ActionCreators.paymentTypesListFailed(error));
  }
}

function* paymentChannelsList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.IPaymentChannelsList[]> = yield call(
      () => {
        return PaymentApi.paymentChannelsList(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.paymentChannelsListSuccess(response));
    yield put(ActionCreators.paymentChannelsListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.paymentChannelsListFailed(error));
    yield put(ActionCreators.paymentChannelsListFailed(error));
  }
}

/** === LISTEN FUNCTION === */
function* PaymentSaga() {
    yield takeLatest(types.PAYMENT_TYPES_LIST_PROCESS, paymentTypesList);
    yield takeLatest(types.PAYMENT_CHANNELS_LIST_PROCESS, paymentChannelsList);
  }
  
  export default PaymentSaga;