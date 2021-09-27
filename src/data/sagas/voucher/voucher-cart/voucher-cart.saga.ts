/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { VoucherCartApi } from '../../../apis/voucher/voucher-cart.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher cart list */
function* voucherCartList(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherCartListProps> =
      yield call(() => {
        return VoucherCartApi.voucherCartList();
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
/** === LISTEN FUNCTION === */
function* VoucherSaga() {
  yield takeLatest(types.VOUCHER_CART_LIST_PROCESS, voucherCartList);
}

export default VoucherSaga;
