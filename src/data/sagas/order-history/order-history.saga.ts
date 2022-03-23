/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
import { SnbToast } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT INTERNAL === */
import * as OrderHistoryApi from 'src/data/apis/order-history/order-history.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
import { NavigationAction } from '@core/functions/navigation';
/** === FUNCTIONS === */

/** History List */
function* OrderHistoryList(action: models.ListProcessV3Action) {
  try {
    const response: models.ListSuccessV3Props<Array<models.OrderListHistory>> =
      yield call(() => {
        return OrderHistoryApi.getOrderHistoryList(
          action.payload as models.OrderListHistoryProcessProps,
        );
      });
    yield action.contextDispatch(
      ActionCreators.orderHistoryListSuccess(response),
    );
    yield put(ActionCreators.orderHistoryListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.orderHistoryListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.orderHistoryListFailed(error as models.ErrorProps),
    );
  }
}
/** History List */
function* OrderHistoryDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.orderDetailHistory> =
      yield call(() => {
        return OrderHistoryApi.getOrderHistoryDetail(
          action.payload as models.OrderHistoryDetailProcessProps,
        );
      });

    yield action.contextDispatch(
      ActionCreators.orderHistoryDetailSuccess(response),
    );

    yield put(ActionCreators.orderHistoryDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.orderHistoryDetailFailed(error as models.ErrorProps),
    );

    yield put(
      ActionCreators.orderHistoryDetailFailed(error as models.ErrorProps),
    );

    SnbToast.show(error.message, 3000, { positionValue: 50 });
    NavigationAction.back();
  }
}

/** === LISTENER === */
function* OrderHistorySaga() {
  yield takeLatest(types.ORDER_HISTORY_LIST_PROCESS, OrderHistoryList);
  yield takeLatest(types.ORDER_HISTORY_DETAIL_PROCESS, OrderHistoryDetail);
}

export default OrderHistorySaga;
