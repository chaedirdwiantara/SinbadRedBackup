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
/** === LISTENER === */
function* ProductSaga() {
  yield takeLatest(types.STOCK_VALIDATION_PROCESS, stockValidation);
}

export default ProductSaga;
