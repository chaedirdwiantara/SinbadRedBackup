/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
import { SnbToast } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT INTERNAL === */
import * as InvoiceApi from 'src/data/apis/oms/invoice.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
import { NavigationAction } from '@core/functions/navigation';
/** === FUNCTIONS === */

/** Get Consolidate History List */
function* Invoice(action: models.DetailProcessAction) {
  try {
    const response: models.ListSuccessV3Props<models.Invoice> = yield call(
      () => {
        return InvoiceApi.getInvoice(
          action.payload as models.InvoiceProcessProps,
        );
      },
    );
    yield action.contextDispatch(ActionCreators.InvoiceSuccess(response));
    yield put(ActionCreators.InvoiceSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.InvoiceFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.InvoiceFailed(error as models.ErrorProps));
    SnbToast.show('Terjadi Kesalahan', 3000, { positionValue: 50 });
    NavigationAction.back();
  }
}

/** === LISTENER === */
function* InvoiceSaga() {
  yield takeLatest(types.INVOICE_PROCESS, Invoice);
}

export default InvoiceSaga;
