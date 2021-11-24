/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';

/** === FUNCTIONS === */
export const useOrderStatusActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.orderStatusProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderStatusRefresh);
    },
  };
};

export const usePaymentStatus = () => {
  const dispatch = useDispatch();
  const data = { loading: true, limit: 0, skip: 0 };
  return {
    list: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.paymentStatusListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
  };
};
