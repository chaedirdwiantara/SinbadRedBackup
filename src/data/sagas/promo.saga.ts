/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { PromoApi } from '../apis/promo.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
function* promoPaymentList(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PromoPaymentListSuccessProps> =
      yield call(() => {
        return PromoApi.promoPaymentList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.promoPaymentListSuccess(response),
    );
    yield put(ActionCreators.promoPaymentListSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.promoPaymentListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* PromoSaga() {
  yield takeLatest(types.PROMO_PAYMENT_LIST_PROCESS, promoPaymentList);
}

export default PromoSaga;
