/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { PaymentApi } from 'src/data/apis/oms/payment/payment.api';
/** === FUNCTION === */
/** => list example */
function* paymentTypesList(action: models.IPaymentTypeListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.IPaymentTypesList[]> =
      yield call(() => {
        return PaymentApi.paymentTypesList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentTypesListSuccess(response),
    );
    yield put(ActionCreators.paymentTypesListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentTypesListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.paymentTypesListFailed(error as models.ErrorProps),
    );
  }
}

function* paymentChannelsList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.IPaymentChannelsList[]> =
      yield call(() => {
        return PaymentApi.paymentChannelsList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentChannelsListSuccess(response),
    );
    yield put(ActionCreators.paymentChannelsListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentChannelsListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.paymentChannelsListFailed(error as models.ErrorProps),
    );
  }
}

/** => payment terms and condition create  */
function* paymentTermsAndConditionCreate(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return PaymentApi.postTermsAndCondition(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.paymentTermsAndConditionCreateSuccess(response),
    );
    yield put(ActionCreators.paymentTermsAndConditionCreateSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentTermsAndConditionCreateFailed(
        error as models.ErrorProps,
      ),
    );
    yield put(
      ActionCreators.paymentTermsAndConditionCreateFailed(
        error as models.ErrorProps,
      ),
    );
  }
}
/** => payment terms and condition create  */
function* paymentTCCreate(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return PaymentApi.paymentTCCreate(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.paymentTCCreateSuccess(response),
    );
    yield put(ActionCreators.paymentTCCreateSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentTCCreateFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.paymentTCCreateFailed(error as models.ErrorProps));
  }
}

/** => payment terms and conditions  detail */
function* paymentTCDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.IPaymentTermsAndConditionDetailProps> =
      yield call(() => {
        return PaymentApi.paymentTCDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentTCDetailSuccess(response),
    );

    yield put(ActionCreators.paymentTCDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentTCDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.paymentTCDetailFailed(error as models.ErrorProps));
  }
}

/** => payment last payment channel create  */
function* paymentLastChannelCreate(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return PaymentApi.paymentLastChannelCreate(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.paymentLastChannelCreateSuccess(response),
    );
    yield put(ActionCreators.paymentLastChannelCreateSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentLastChannelCreateFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.paymentLastChannelCreateFailed(error as models.ErrorProps),
    );
  }
}

/** => payment terms and conditions  detail */
function* paymentLastChannelDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.IPaymentLastChannelDetailProps> =
      yield call(() => {
        return PaymentApi.paymentLastChannelDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentLastChannelDetailSuccess(response),
    );

    yield put(ActionCreators.paymentLastChannelDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.paymentLastChannelDetailFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.paymentLastChannelDetailFailed(error as models.ErrorProps),
    );
  }
}

/** === LISTEN FUNCTION === */
function* PaymentSaga() {
  yield takeLatest(types.PAYMENT_TYPES_LIST_PROCESS, paymentTypesList);
  yield takeLatest(types.PAYMENT_CHANNELS_LIST_PROCESS, paymentChannelsList);
  yield takeLatest(types.PAYMENT_TC_CREATE_PROCESS, paymentTCCreate);
  yield takeLatest(types.PAYMENT_TC_DETAIL_PROCESS, paymentTCDetail);
  yield takeLatest(
    types.PAYMENT_LAST_CHANNEL_CREATE_PROCESS,
    paymentLastChannelCreate,
  );
  yield takeLatest(
    types.PAYMENT_LAST_CHANNEL_DETAIL_PROCESS,
    paymentLastChannelDetail,
  );
  yield takeLatest(
    types.PAYMENT_TERMS_AND_CONDITION_CREATE_PROCESS,
    paymentTermsAndConditionCreate,
  );
}

export default PaymentSaga;
