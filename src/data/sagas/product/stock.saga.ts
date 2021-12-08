/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { WarehouseApi } from 'src/data/apis/product/warehouse.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => Stock validation */
function* stockValidation(action: models.StockValidationProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.IStockValidaitonSuccess> =
      yield call(() => {
        return WarehouseApi.getStockValidation(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.stockValidationSuccess(response),
    );
    yield put(ActionCreators.stockValidationSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.stockValidationFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.stockValidationFailed(error as models.ErrorProps));
  }
}
/** => Stock validation detail */
function* stockValidationDetail(action: models.StockValidationProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.IStockValidaitonSuccess> =
      yield call(() => {
        return WarehouseApi.getStockValidation(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.stockValidationDetailSuccess(response),
    );
    yield put(ActionCreators.stockValidationDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.stockValidationDetailFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.stockValidationDetailFailed(error as models.ErrorProps),
    );
  }
}
/** => Stock information */
function* stockInformation(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.IStockInformationSuccess> =
      yield call(() => {
        return WarehouseApi.getStockInformation(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.stockInformationSuccess(response),
    );
    yield put(ActionCreators.stockInformationSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.stockInformationFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.stockInformationFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER === */
function* ProductSaga() {
  yield takeLatest(types.STOCK_VALIDATION_PROCESS, stockValidation);
  yield takeLatest(
    types.STOCK_VALIDATION_DETAIL_PROCESS,
    stockValidationDetail,
  );
  yield takeLatest(types.STOCK_INFORMATION_PROCESS, stockInformation);
}

export default ProductSaga;
