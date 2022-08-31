/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
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

/** === LISTENER === */
function* stockReminderSaga() {
  yield takeLatest(types.STOCK_REMINDER_LIST_PROCESS, stockReminderList);
}

export default stockReminderSaga;
