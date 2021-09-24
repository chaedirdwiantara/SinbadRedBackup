/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { VoucherApi } from '../../../apis/voucher/voucher.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
function* voucherDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherDetailProps> =
      yield call(() => {
        return VoucherApi.voucherDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.voucherDetailSuccess(response));
    yield put(ActionCreators.voucherDetailSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.voucherDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* VoucherSaga() {
  yield takeLatest(types.VOUCHER_DETAIL_PROCESS, voucherDetail);
}

export default VoucherSaga;
