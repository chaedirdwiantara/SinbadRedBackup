import { CHANGE_RTDB_PAYMENT_ORDER } from '../../../actions/oms/payment-method';

const initialState = {
  getListJerseyLoading: false,
  getListJerseyResult: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_RTDB_PAYMENT_ORDER:
      return {
        ...state,
        getListJerseyLoading: action.payload.loading,
        getListJerseyResult: action.payload.data,
      };

    default:
      return state;
  }
}
