/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { ThankYouPageApi } from 'src/data/apis/oms/thank-you-page/thank-you-page.api';

function* thankYouPageOrderDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.ThankYouOrderDetailProps> =
      yield call(() => {
        return ThankYouPageApi.thankYouPageOrderDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.thankYouPageOrderDetailSuccess(response),
    );

    yield put(ActionCreators.thankYouPageOrderDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.thankYouPageOrderDetailFailed(error),
    );
    yield put(ActionCreators.thankYouPageOrderDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ThankYouPageSaga() {
  yield takeLatest(
    types.THANK_YOU_PAGE_ORDER_DETAIL_PROCESS,
    thankYouPageOrderDetail,
  );
}

export default ThankYouPageSaga;