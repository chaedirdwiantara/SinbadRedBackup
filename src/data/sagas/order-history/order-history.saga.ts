/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
import { SnbToast } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT INTERNAL === */
import * as OrderHistoryApi from 'src/data/apis/order-history/order-history.api';
import * as OrderHistoryConsolidateApi from 'src/data/apis/order-history/order-history-consolidate.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
import { NavigationAction } from '@core/functions/navigation';
/** === FUNCTIONS === */

/** Get History List */
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
/** Get Consolidate History List */
function* ConsolidateOrderHistoryList(action: models.ListProcessV3Action) {
  try {
    const response: models.ListSuccessV3Props<Array<models.ConsolidateOrderListHistory>> =
      yield call(() => {
        return OrderHistoryConsolidateApi.getConsolidateOrderHistoryList(
          action.payload as models.ConsolidateOrderListHistoryProcessProps,
        );
      });
    yield action.contextDispatch(
      ActionCreators.consolidateOrderHistoryListSuccess(response),
    );
    yield put(ActionCreators.consolidateOrderHistoryListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.consolidateOrderHistoryListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.consolidateOrderHistoryListFailed(error as models.ErrorProps),
    );
  }
}
/** Get Consolidate History Detail */
function* OrderConsolidateHistoryDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.orderConsolidateDetailHistory> =
      yield call(() => {
        return OrderHistoryApi.getOrderConsolidateHistoryDetail(
          action.payload as models.OrderConsolidateHistoryDetailProcessProps,
        );
      });

    yield action.contextDispatch(
      ActionCreators.orderConsolidateHistoryDetailSuccess(response),
    );

    yield put(ActionCreators.orderConsolidateHistoryDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.orderConsolidateHistoryDetailFailed(
        error as models.ErrorProps,
      ),
    );

    yield put(
      ActionCreators.orderConsolidateHistoryDetailFailed(
        error as models.ErrorProps,
      ),
    );

    SnbToast.show(error.message, 3000, { positionValue: 50 });
    NavigationAction.back();
  }
}
/** Get History Detail */
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
/** Get History Tracking Detail */
function* OrderHistoryTrackingDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.orderTrackingDetailHistory> =
      yield call(() => {
        return OrderHistoryApi.getOrderHistoryTrackingDetail(
          action.payload as models.OrderHistoryTrackingDetailProcessProps,
        );
      });

    yield action.contextDispatch(
      ActionCreators.orderHistoryTrackingDetailSuccess(response),
    );

    yield put(ActionCreators.orderHistoryTrackingDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.orderHistoryTrackingDetailFailed(
        error as models.ErrorProps,
      ),
    );

    yield put(
      ActionCreators.orderHistoryTrackingDetailFailed(
        error as models.ErrorProps,
      ),
    );

    SnbToast.show(error.message, 3000, { positionValue: 50 });
    NavigationAction.back();
  }
}
/** Post Done Order */
function* DoneOrderHistory(action: models.UpdateOrderHistoryProcessAction) {
  try {
    const { keyword, orderStatus, status, id } = action.payload;

    const response: models.UpdateSuccessV3Props<any> = yield call(() => {
      return OrderHistoryApi.postDoneOrderHistory(
        action.payload as models.UpdateOrderHistoryProcessProps,
      );
    });

    if (action.payload.type === 'list') {
      yield action.contextDispatch(ActionCreators.orderHistoryListReset());
      yield put(
        ActionCreators.orderHistoryListProcess(action.contextDispatch, {
          keyword,
          orderStatus,
          status,
          loading: true,
          page: 1,
        }),
      );
    }
    if (action.payload.type === 'detail') {
      yield action.contextDispatch(
        ActionCreators.orderHistoryDetailReset(action.contextDispatch),
      );
      yield put(
        ActionCreators.orderHistoryDetailProcess(action.contextDispatch, {
          id,
        }),
      );
    }

    yield action.contextDispatch(
      ActionCreators.doneOrderHistorySuccess(response),
    );

    yield put(ActionCreators.doneOrderHistorySuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.doneOrderHistoryFailed(error as models.ErrorProps),
    );

    yield put(
      ActionCreators.doneOrderHistoryFailed(error as models.ErrorProps),
    );

    SnbToast.show(error.message, 3000, { positionValue: 50 });
  }
}
/** Post Cancel Order */
function* CancelOrderHistory(action: models.UpdateOrderHistoryProcessAction) {
  try {
    const { keyword, orderStatus, status, id } = action.payload;

    const response: models.UpdateSuccessV3Props<any> = yield call(() => {
      return OrderHistoryApi.postCancelOrderHistory(
        action.payload as models.UpdateOrderHistoryProcessProps,
      );
    });

    if (action.payload.type === 'list') {
      yield action.contextDispatch(ActionCreators.orderHistoryListReset());
      yield put(
        ActionCreators.orderHistoryListProcess(action.contextDispatch, {
          keyword,
          orderStatus,
          status,
          loading: true,
          page: 1,
        }),
      );
    }
    if (action.payload.type === 'detail') {
      yield action.contextDispatch(
        ActionCreators.orderHistoryDetailReset(action.contextDispatch),
      );
      yield put(
        ActionCreators.orderHistoryDetailProcess(action.contextDispatch, {
          id,
        }),
      );
    }

    yield action.contextDispatch(
      ActionCreators.doneOrderHistorySuccess(response),
    );

    yield put(ActionCreators.doneOrderHistorySuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.doneOrderHistoryFailed(error as models.ErrorProps),
    );

    yield put(
      ActionCreators.doneOrderHistoryFailed(error as models.ErrorProps),
    );

    SnbToast.show(error.message, 3000, { positionValue: 50 });
  }
}
/** Get Menu Status List */
function* MenuStatusList(action: models.ListProcessV3Action){
  try {
    const response: models.ListSuccessV3Props<Array<models.MenuStatusList>> =
      yield call(() => {
        return OrderHistoryConsolidateApi.getMenuStatusList();
      });
    yield action.contextDispatch(
      ActionCreators.menuStatusListSuccess(response),
    );
    yield put(ActionCreators.menuStatusListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.menuStatusListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.menuStatusListFailed(error as models.ErrorProps),
    );
  }
}

/** === LISTENER === */
function* OrderHistorySaga() {
  yield takeLatest(types.ORDER_HISTORY_LIST_PROCESS, OrderHistoryList);
  yield takeLatest(types.CONSOLIDATE_ORDER_HISTORY_LIST_PROCESS, ConsolidateOrderHistoryList);
  yield takeLatest(
    types.ORDER_CONSOLIDATE_HISTORY_DETAIL_PROCESS,
    OrderConsolidateHistoryDetail,
  );
  yield takeLatest(types.ORDER_HISTORY_DETAIL_PROCESS, OrderHistoryDetail);
  yield takeLatest(
    types.ORDER_HISTORY_TRACKING_DETAIL_PROCESS,
    OrderHistoryTrackingDetail,
  );
  yield takeLatest(types.DONE_ORDER_HISTORY_PROCESS, DoneOrderHistory);
  yield takeLatest(types.CANCEL_ORDER_HISTORY_PROCESS, CancelOrderHistory);
  yield takeLatest(types.MENU_STATUS_LIST_PROCESS, MenuStatusList);
}

export default OrderHistorySaga;
