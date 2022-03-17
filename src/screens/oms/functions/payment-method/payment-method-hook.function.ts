import { useDispatch } from 'react-redux';
import * as models from '@models';
import * as Actions from '@actions';

const callListProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions: models.PaymentMethodProps,
) => {
  return Actions.paymentMethodListProcess(contextDispatch, {
    loading,
    skip,
    limit,
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
      contextDispatch(Actions.paymentMethodListReset());
      dispatch(
        callListProcessAction(contextDispatch, true, 0, 10, queryOptions),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.paymentMethodListReset());
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

/** => get payment method list content */
const usePaymentMethodSubRtdb = () => {
  const dispatch = useDispatch();
  // console.log('MASUK FUNCTION');

  return {
    fetch: (contextDispatch: (action: any) => any, data: string) => {
      dispatch(Actions.isOrderRTDBChangeProcess(contextDispatch, { data }));
    },
  };
};

export {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
  usePaymentMethodSubRtdb,
};
