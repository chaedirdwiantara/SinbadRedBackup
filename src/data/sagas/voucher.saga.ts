/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { VoucherApi } from '../apis/voucher.api';
import * as ActionCreators from '../actions';
import * as types from '../types';
import * as models from '../models';
/** === FUNCTION === */
/** => list example */
function* listExample(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VoucherCartList> =
      yield call(() => {
        return VoucherApi.voucherCartList();
      });
    yield action.contextDispatch(
      ActionCreators.voucherCartListSuccess(response),
    );
    yield put(ActionCreators.voucherCartListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(ActionCreators.voucherCartListFailed(error));
    yield put(ActionCreators.voucherCartListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ExampleSaga() {
  yield takeLatest(types.VOUCHER_CART_LIST_PROCESS, listExample);
}

export default ExampleSaga;
