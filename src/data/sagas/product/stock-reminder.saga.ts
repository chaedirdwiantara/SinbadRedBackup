/** === IMPORT PACKAGES === */
import { StatusBar } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { SnbToast2 } from '@sinbad/react-native-sinbad-ui';
import { stockReminderApi } from 'src/data/apis/product/stock-reminder.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => get list reminder stock by product & warehouse id array */
function* stockReminderList(action: models.StockReminderListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.StockReminderItem>> =
      yield call(() => {
        return stockReminderApi.getList(
          action.payload as Array<models.StockReminderGetProps>,
        );
      });
    yield action.contextDispatch(
      ActionCreators.stockReminderListSuccess(response),
    );
    yield put(ActionCreators.stockReminderListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.stockReminderListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.stockReminderListFailed(error as models.ErrorProps),
    );
  }
}
// create stock reminder
function* createStockReminder(action: models.CreateStockReminderSuccessAction) {
  try {
    const { productId, warehouseId } = action.payload;
    const response: models.CreateSuccessProps = yield call(() =>
      stockReminderApi.createReminder({ productId, warehouseId }),
    );
    const payloadResponse = { ...response, productId, warehouseId };
    yield action.contextDispatch(
      ActionCreators.createStockReminderSuccess(
        action.contextDispatch,
        payloadResponse,
      ),
    );
    yield put(
      ActionCreators.createStockReminderSuccess(
        action.contextDispatch,
        payloadResponse,
      ),
    );
    SnbToast2.show('Pengingat berhasil ditambahkan!', 2000, {
      position: 'top',
      positionValue: StatusBar.currentHeight,
    });
  } catch (error) {
    SnbToast2.show('Pengingat gagal ditambahkan, silahkan coba lagi!', 2000, {
      position: 'top',
      positionValue: StatusBar.currentHeight,
    });
    yield action.contextDispatch(
      ActionCreators.createStockReminderFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.createStockReminderFailed(error as models.ErrorProps),
    );
  }
}
// delete stock reminder
function* deleteStockReminder(action: models.CreateStockReminderSuccessAction) {
  try {
    const { productId, warehouseId } = action.payload;
    const response: models.CreateSuccessProps = yield call(() =>
      stockReminderApi.deleteReminder({ productId, warehouseId }),
    );
    const payloadResponse = { ...response, productId, warehouseId };
    yield action.contextDispatch(
      ActionCreators.deleteStockReminderSuccess(
        action.contextDispatch,
        payloadResponse,
      ),
    );
    yield put(
      ActionCreators.deleteStockReminderSuccess(
        action.contextDispatch,
        payloadResponse,
      ),
    );
    SnbToast2.show('Pengingat dihapus!', 2000, {
      position: 'top',
      positionValue: StatusBar.currentHeight,
    });
  } catch (error) {
    SnbToast2.show('Pengingat gagal dihapus, silahkan coba lagi!', 2000, {
      position: 'top',
      positionValue: StatusBar.currentHeight,
    });
    yield action.contextDispatch(
      ActionCreators.deleteStockReminderFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.deleteStockReminderFailed(error as models.ErrorProps),
    );
  }
}

/** === LISTENER === */
function* stockReminderSaga() {
  yield takeLatest(types.STOCK_REMINDER_LIST_PROCESS, stockReminderList);
  yield takeLatest(types.CREATE_STOCK_REMINDER_PROCESS, createStockReminder);
  yield takeLatest(types.DELETE_STOCK_REMINDER_PROCESS, deleteStockReminder);
}

export default stockReminderSaga;
