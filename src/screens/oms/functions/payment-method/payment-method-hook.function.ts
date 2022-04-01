import { useDispatch } from 'react-redux';
import * as models from '@models';
import * as Actions from '@actions';

const callListProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  queryOptions: models.PaymentMethodProps,
) => {
  return Actions.paymentMethodListProcess(contextDispatch, {
    loading,
    ...queryOptions,
  });
};

/** => get payment method list content */
const usePaymentMethodListContent = () => {
  const dispatch = useDispatch();
  return {
    paymentMethodListContentGet: (
      contextDispatch: (action: any) => any,
      queryOptions: models.ListProcessProps<models.PaymentMethodProps>,
    ) => {
      contextDispatch(Actions.paymentMethodListReset(contextDispatch));
      dispatch(callListProcessAction(contextDispatch, true, queryOptions));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.paymentMethodListReset(contextDispatch));
    },
  };
};

/** => get payment method list content */
const usePaymentMethodCreateOrder = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.PaymentMethodCreateOrderData,
    ) => {
      dispatch(
        Actions.postPaymentMethodCreateOrderProcess(contextDispatch, { data }),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postPaymentMethodCreateOrderReset(contextDispatch));
    },
  };
};

/** => get payment method rtdb status */
const usePaymentMethodSubRtdb = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, data: string) => {
      dispatch(Actions.isOrderRTDBChangeProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.isOrderRTDBChangeReset(contextDispatch));
    },
  };
};

/** => get payment method list content */
const usePaymentMethodCommitCart = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.PaymentMethodCommitCartData,
    ) => {
      dispatch(
        Actions.paymentMethodCommitCartProcess(contextDispatch, { data }),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentMethodCommitCartReset(contextDispatch));
    },
  };
};
export {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
  usePaymentMethodSubRtdb,
  usePaymentMethodCommitCart,
};
