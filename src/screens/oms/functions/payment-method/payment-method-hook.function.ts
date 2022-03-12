import { useDispatch } from 'react-redux';
import * as models from '@models';
import * as Actions from '@actions';

/** => get payment method list content */
const usePaymentMethodListContent = () => {
  const dispatch = useDispatch();
  return {
    paymentMethodListContentGet: (
      contextDispatch: (action: any) => any,
      payload: models.PaymentMethodList,
    ) => {
      dispatch(Actions.paymentMethodListProcess(contextDispatch, { payload }));
    },
    tncContentReset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.checkoutTNCReset());
    },
  };
};

export { usePaymentMethodListContent };
