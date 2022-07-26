/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { VoucherApi } from '../apis/voucher.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
function* voucherDetail(action: models.VoucherDetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherCartDetailProps> =
      yield call(() => {
        return VoucherApi.voucherDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.voucherDetailSuccess(response));
    yield put(ActionCreators.voucherDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.voucherDetailFailed(error));
    yield put(ActionCreators.voucherDetailFailed(error));
  }
}
/** => voucher cart list */
function* voucherCartList(action: models.VoucherListProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherCartListProps> =
      yield call(() => {
        return VoucherApi.voucherCartList({
          totalOrder: action.payload.totalOrder,
          ...(action.payload.uniqueCode && {
            uniqueCode: action.payload.uniqueCode,
          }),
        });
      });
    yield action.contextDispatch(
      ActionCreators.voucherCartListSuccess(response),
    );
    yield put(ActionCreators.voucherCartListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.voucherCartListFailed(error));
  }
}
/** => check sinbad voucher */
function* checkSinbadVoucher(
  action: models.CreateProcessAction<models.CheckSinbadVoucherPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckSinbadVoucherResponse> =
      yield call(() => {
        return VoucherApi.checkSinbadVoucher();
      });
    yield action.contextDispatch(
      ActionCreators.checkSinbadVoucherSuccess(response),
    );
    yield put(ActionCreators.checkSinbadVoucherSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkSinbadVoucherFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.checkSinbadVoucherFailed(error as models.ErrorProps),
    );
  }
}
/** => cancel reserve voucher */
function* cancelVoucher(action: Omit<models.DeleteProcessAction, 'id'>) {
  try {
    const response: models.DeleteSuccessV3Props = yield call(() => {
      return VoucherApi.cancelVoucher();
    });
    yield action.contextDispatch(ActionCreators.cancelVoucherSuccess(response));
    yield put(ActionCreators.cancelVoucherSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cancelVoucherFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cancelVoucherFailed(error as models.ErrorProps));
  }
}
/** === LISTEN FUNCTION === */
function* VoucherSaga() {
  yield takeLatest(types.VOUCHER_DETAIL_PROCESS, voucherDetail);
  yield takeLatest(types.VOUCHER_CART_LIST_PROCESS, voucherCartList);
  yield takeLatest(types.CHECK_SINBAD_VOUCHER_PROCESS, checkSinbadVoucher);
  yield takeLatest(types.CANCEL_VOUCHER_PROCESS, cancelVoucher);
}

export default VoucherSaga;
