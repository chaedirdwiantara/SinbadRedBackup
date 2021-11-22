/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { PromoApi } from '../apis/promo.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => promo payment list */
function* promoPaymentList(action: models.PromoPaymentListProcessAction) {
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
    yield action.contextDispatch(ActionCreators.promoPaymentListFailed(error));
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
    yield action.contextDispatch(
      ActionCreators.promoPaymentDetailFailed(error),
    );
    yield put(ActionCreators.promoPaymentDetailFailed(error));
  }
}
/** => promo general detail */
function* promoGeneralDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PromoGeneralDetailSuccessProps> =
      yield call(() => {
        return PromoApi.promoGeneralDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.promoGeneralDetailSuccess(response),
    );
    yield put(ActionCreators.promoGeneralDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.promoGeneralDetailFailed(error),
    );
    yield put(ActionCreators.promoGeneralDetailFailed(error));
  }
}
/** => potential promo product */
function* potentialPromoProduct(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PotentialPromoProductProps> =
      yield call(() => {
        return PromoApi.potentialPromoProduct(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.potentialPromoProductSuccess(response),
    );
    yield put(ActionCreators.potentialPromoProductSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.potentialPromoProductFailed(error),
    );
    yield put(ActionCreators.potentialPromoProductFailed(error));
  }
}
/** => delete reserve promo */
function* deleteReservePromo(action: models.DeleteProcessAction) {
  try {
    const response: models.DeleteSuccessProps = yield call(() => {
      return PromoApi.deleteReserveDiscount(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.deleteReserveDiscountSuccess(response),
    );
    yield put(ActionCreators.deleteReserveDiscountSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.deleteReserveDiscountFailed(error),
    );
    yield put(ActionCreators.deleteReserveDiscountFailed(error));
  }
}
/** => create reserve promo */
function* createReservePromo(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return PromoApi.createReserveDiscount(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.createReserveDiscountSuccess(response),
    );
    yield put(ActionCreators.createReserveDiscountSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.createReserveDiscountFailed(error),
    );
    yield put(ActionCreators.createReserveDiscountFailed(error));
  }
}
/** => reserve discount detail */
function* reserveDiscountDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.ReserveDiscountDetail> =
      yield call(() => {
        return PromoApi.reserveDiscountDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.detailReserveDiscountSuccess(response),
    );
    yield put(ActionCreators.detailReserveDiscountSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.detailReserveDiscountFailed(error),
    );
    yield put(ActionCreators.detailReserveDiscountFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* PromoSaga() {
  yield takeLatest(types.PROMO_PAYMENT_LIST_PROCESS, promoPaymentList);
  yield takeLatest(types.PROMO_PAYMENT_DETAIL_PROCESS, promoPaymentDetail);
  yield takeLatest(types.PROMO_GENERAL_DETAIL_PROCESS, promoGeneralDetail);
  yield takeLatest(
    types.POTENTIAL_PROMO_PRODUCT_PROCESS,
    potentialPromoProduct,
  );
  yield takeLatest(types.DELETE_RESERVE_DISCOUNT_PROCESS, deleteReservePromo);
  yield takeLatest(types.CREATE_RESERVE_DISCOUNT_PROCESS, createReservePromo);
  yield takeLatest(
    types.DETAIL_RESERVE_DISCOUNT_PROCESS,
    reserveDiscountDetail,
  );
}

export default PromoSaga;
