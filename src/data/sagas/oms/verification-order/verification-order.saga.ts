/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { VerificationOrderApi } from '../../../apis/oms/verification-order/verification-order.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => verification order create  */
function* verficationOrderCreate(
  action: models.CreateProcessAction<models.CartSelected>,
) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return VerificationOrderApi.verficationOrderCreate(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.verificationOrderCreateSuccess(response),
    );
    yield put(ActionCreators.verificationOrderCreateSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.verificationOrderCreateFailed(error),
    );
    yield put(ActionCreators.verificationOrderCreateFailed(error));
  }
}
/** => verification order detail */
function* verficationOrderDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.VerificationOrderDetailProps> =
      yield call(() => {
        return VerificationOrderApi.verficationOrderDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.verificationOrderDetailSuccess(response),
    );

    yield put(ActionCreators.verificationOrderDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.verificationOrderDetailFailed(error),
    );
    yield put(ActionCreators.verificationOrderDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* VerificationOrderSaga() {
  yield takeLatest(
    types.VERIFICATION_ORDER_CREATE_PROCESS,
    verficationOrderCreate,
  );
  yield takeLatest(
    types.VERIFICATION_ORDER_DETAIL_PROCESS,
    verficationOrderDetail,
  );
}

export default VerificationOrderSaga;
