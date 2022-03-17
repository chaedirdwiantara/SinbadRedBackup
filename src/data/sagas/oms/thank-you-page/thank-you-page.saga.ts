/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { ThankYouPageApi } from 'src/data/apis/oms/thank-you-page/thank-you-page.api';
import { CartApi } from 'src/data/apis/oms/cart.api';

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

function* thankYouPagePaymentGuideList(
  action: models.ListProcessAction<
  models.ListProcessProps<models.PaymentGuideProps>
  >
) {
  try {
    const response: models.ListSuccessProps<models.PaymentGuideListItem[]> =
      yield call(() => {
        return ThankYouPageApi.thankYouPagePaymentGuideList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.thankYouPagePaymentGuideListSuccess(response),
    );

    yield put(ActionCreators.thankYouPagePaymentGuideListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.thankYouPagePaymentGuideListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.thankYouPagePaymentGuideListFailed(error));
  }
}

function* thankYouPageCancelOrder(
  action: models.UpdateProcessAction<models.CancelOrderPayload>
) {
  try {
    const response: models.UpdateSuccessV3Props<models.CancelOrderResponse> =
      yield call(() => {
        return ThankYouPageApi.thankYouPageCancelOrder(action.payload)
      });
      yield action.contextDispatch(ActionCreators.thankYouPageCancelOrderSuccess(response));
      yield put(ActionCreators.thankYouPageCancelOrderSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.thankYouPageCancelOrderFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.thankYouPageCancelOrderFailed(error as models.ErrorProps));
  }
}
/** === LISTEN FUNCTION === */
function* ThankYouPageSaga() {
  yield takeLatest(
    types.THANK_YOU_PAGE_ORDER_DETAIL_PROCESS,
    thankYouPageOrderDetail,
  );
  yield takeLatest(
    types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_PROCESS,
    thankYouPagePaymentGuideList,
  );
  yield takeLatest(
    types.THANK_YOU_PAGE_CANCEL_ORDER_PROCESS,
    thankYouPageCancelOrder,
  );
}

export default ThankYouPageSaga;