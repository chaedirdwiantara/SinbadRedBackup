/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CartApi } from 'src/data/apis/oms/shoping-cart.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** Cart View */
function* cartView(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CartSuccessProps> =
      yield call(() => {
        return CartApi.getCartView(action.payload);
      });
    yield action.contextDispatch(ActionCreators.cartViewSuccess(response));
    yield put(ActionCreators.cartViewSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cartViewFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cartViewFailed(error as models.ErrorProps));
  }
}

/** === LISTENER === */
function* CartSaga() {
  yield takeLatest(types.CART_VIEW_PROCESS, cartView);
}

export default CartSaga;
