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
    const response: models.DetailSuccessProps<models.VoucherDetailProps> =
      yield call(() => {
        return VoucherApi.voucherDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.voucherDetailSuccess(response));
    yield put(ActionCreators.voucherDetailSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.voucherDetailFailed(error));
    yield put(ActionCreators.voucherDetailFailed(error));
  }
}
/** => voucher cart list */
function* voucherCartList(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherCartListProps> =
      yield call(() => {
        return VoucherApi.voucherCartList();
      });
    yield action.contextDispatch(
      ActionCreators.voucherCartListSuccess(response),
    );
    yield put(ActionCreators.voucherCartListSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.voucherCartListFailed(error));
  }
}
/** => count all voucher */
function* countAllVoucher(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CountAllVoucherProps> =
      yield call(() => {
        return VoucherApi.countAllVoucher();
      });
    yield action.contextDispatch(
      ActionCreators.countAllVoucherSuccess(response),
    );
    yield put(ActionCreators.countAllVoucherSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.countAllVoucherFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* VoucherSaga() {
  yield takeLatest(types.VOUCHER_DETAIL_PROCESS, voucherDetail);
  yield takeLatest(types.VOUCHER_CART_LIST_PROCESS, voucherCartList);
  yield takeLatest(types.COUNT_ALL_VOUCHER_PROCESS, countAllVoucher);
}

export default VoucherSaga;
