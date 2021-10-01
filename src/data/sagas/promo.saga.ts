/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { PromoApi } from '../apis/promo.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => promo payment list */
function* promoPaymentList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.PromoPaymentListSuccessProps> =
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
/** => promo payment detail */
function* promoPaymentDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PromoPaymentDetailSuccessProps> =
      yield call(() => {
        return PromoApi.promoPaymentDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.promoPaymentDetailSuccess(response),
    );
    yield put(ActionCreators.promoPaymentDetailSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.promoPaymentDetailFailed(error));
    yield put(ActionCreators.promoPaymentDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* PromoSaga() {
  yield takeLatest(types.PROMO_PAYMENT_LIST_PROCESS, promoPaymentList);
  yield takeLatest(types.PROMO_PAYMENT_DETAIL_PROCESS, promoPaymentDetail);
}

export default PromoSaga;
