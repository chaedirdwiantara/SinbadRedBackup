/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CheckoutApi } from 'src/data/apis/oms/checkout.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
function* getOrdersDetail(action: models.CheckoutDoneProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CheckoutDoneOrders> =
      yield call(() => {
        return CheckoutApi.getOrdersDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.getOrdersDetailSuccess(response),
    );
    yield put(ActionCreators.getOrdersDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.getOrdersDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.getOrdersDetailFailed(error as models.ErrorProps));
  }
}

function* CheckoutDoneSaga() {
  yield takeLatest(types.GET_ORDER_DETAIL_PROCESS, getOrdersDetail);
}

export default CheckoutDoneSaga;
