/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { ReserveStockApi } from 'src/data/apis/product/reserve-stock.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => DELETE */
function* deleteReserveStock(action: models.DeleteProcessAction) {
  try {
    const response: models.DeleteSuccessProps = yield call(() => {
      return ReserveStockApi.deleteReserveStock(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.deleteReserveStockSuccess(response),
    );
    yield put(ActionCreators.deleteReserveStockSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.deleteReserveStockFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.deleteReserveStockFailed(error as models.ErrorProps),
    );
  }
}
/** => CREATE */
function* createReserveStock(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return ReserveStockApi.createReserveStock(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.createReserveStockSuccess(response),
    );
    yield put(ActionCreators.createReserveStockSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.createReserveStockFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.createReserveStockFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER === */
function* ReserveStockSaga() {
  yield takeLatest(types.DELETE_RESERVE_STOCK_PROCESS, deleteReserveStock);
  yield takeLatest(types.CREATE_RESERVE_STOCK_PROCESS, createReserveStock);
}

export default ReserveStockSaga;
