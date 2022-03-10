/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { CheckoutTncApi } from 'src/data/apis/oms/checkout-tnc.api';

function* checkoutTNC(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CheckoutTnc> =
      yield call(() => {
        return CheckoutTncApi.checkoutTncApi(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.checkoutTNCSuccess(response),
    );

    yield put(ActionCreators.checkoutTNCSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.checkoutTNCFailed(error),
    );
    yield put(ActionCreators.checkoutTNCFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* CheckoutTncSaga() {
  yield takeLatest(
    types.CHECKOUT_TNC_PROCESS,
    checkoutTNC,
  );
}

export default CheckoutTncSaga;