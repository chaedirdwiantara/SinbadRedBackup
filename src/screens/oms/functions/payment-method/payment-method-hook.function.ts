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

export { usePaymentMethodListContent };
