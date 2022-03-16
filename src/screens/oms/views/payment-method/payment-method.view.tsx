/** === IMPORT PACKAGE HERE ===  */
import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState, useContext } from 'react';
import { SnbContainer } from '@sinbad/react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL COMPONENT === */
import { PaymentMethodHeader } from './payment-method-header.view';
import { PaymentMethodBottom } from './payment-method-bottom.view';
import { goToCheckout } from '@screen/oms/functions';
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
} from '@screen/oms/functions/payment-method/payment-method-hook.function';
import PaymentMethodBody from './payment-method-body.view';
import PaymentMethodExpiredTimeModal from './payment-method-expired-time.modal.view';
import { goToShoppingCart } from '@core/functions/product';
import { useUpdateCartAction, useCheckoutAction } from '../../functions';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
import { PaymentStatusModal } from './payment-method-payment-status.modal.view';
import PaymentMethodErrorModal from './payment-method-error-modal.view';
import * as models from '@models';
import { LoadingPage } from '@core/components/Loading';

interface PaymentMethodInterface {
  props: {};
  route: any;
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = (props) => {
  /** => ACTION */
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();
  const paymentMethodCreateOrder = usePaymentMethodCreateOrder();
  /** => Hooks */
  const [selectMethod, setSelectMethod] = useState(''); //handle selected method
  const [selectedPaymentMethodData, setSelectedPaymentMethodData] =
    useState<models.PaymentMethod | null>(null);
  const [isExpiredSession, setExpiredSession] = useState(false); //handle expired time
  const [isPaymentStatusSession, setPaymentStatusSession] = useState(false); //handle payment status
  const [isErrorSession, setErrorSession] = useState(false); //handle error modal
  const [isLoading, setLoading] = useState(false);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const checkoutContextData = stateCheckout.checkout.data;
  console.log('irpan2', checkoutContextData);
  /** => Get payment method  */
  // const { statePaymentMethod } = useContext(contexts.PaymentMethodContext);
  const {
    statePaymentMethod: {
      paymentMethod: { data: paymentMethodData, loading: paymentMethodLoading },
    },
    dispatchPaymentMethod,
  } = usePaymentMethodContext();
  const data = paymentMethodData;
  /** => data from checkout */
  const dataCheckout = props.route.params.data;

  /** => handle payment method */
  const payloadPaymentMethod = {
    amount: 900,
    keyword: '',
    sort: 'desc',
    sortBy: '',
  };
  const getPaymentMethodListContent = usePaymentMethodListContent();
  const handlePaymentMethodList = () => {
    getPaymentMethodListContent.paymentMethodListContentGet(
      dispatchPaymentMethod,
      payloadPaymentMethod,
    );
  };

  /** => call payment method list */
  useFocusEffect(
    React.useCallback(() => {
      handlePaymentMethodList();
    }, []),
  );

  /** => set expired time  */
  const dateCurrent = new Date();
  const timeNow = dateCurrent.getTime() / 1000;
  const addTime = props.route.params.data.addTime;
  const timeToExpired = addTime - timeNow;
  const timer = setTimeout(() => {
    setPaymentStatusSession(false);
    setErrorSession(false);
    setExpiredSession(true);
  }, timeToExpired);

  /** handle back to cart */
  const handleBackToCart = () => {
    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    setExpiredSession(false);
    clearTimeout(timer);
    goToShoppingCart();
  };

  /** => handle selected method */
  const handleSelect = (selected: string) => {
    setSelectMethod(selected);
  };

  /** => handle error status */
  const handleErrorStatus = () => {
    setErrorSession(true);
  };

  const handleOnDataChoosen = (selectedData: models.PaymentMethod) => {
    setSelectedPaymentMethodData(selectedData);
  };
  //==> handle create order
  const handleCreateOrder = () => {
    if (selectedPaymentMethodData != null && checkoutContextData != null) {
      if (selectedPaymentMethodData.isSelected) {
        setPaymentStatusSession(true);
      } else {
        setLoading(true);
        const params: models.PaymentMethodCreateOrderData = {
          ...checkoutContextData,
          paymentMethod: {
            id: 1,
            code: selectedPaymentMethodData.code,
            serviceFeeDeduct: Number(
              selectedPaymentMethodData.serviceFeeDeduct,
            ),
            serviceFeeNonDeduct: Number(
              selectedPaymentMethodData.serviceFeeNonDeduct,
            ),
            isServiceFeeFree: Boolean(
              selectedPaymentMethodData.isServiceFeeFree,
            ),
            displayLabel: selectedPaymentMethodData.displayLabel,
            iconURL: selectedPaymentMethodData.iconURL,
          },
        };
        // paymentMethodCreateOrder.fetch(dispatchPaymentMethod, params);
      }
    }
  };

  return (
    <SnbContainer color="grey">
      {isLoading ? (
        <>
          <PaymentMethodHeader
            backAction={() => {
              goToCheckout();
            }}
          />
          <LoadingPage />
        </>
      ) : (
        <>
          {/* HEADER */}
          <PaymentMethodHeader
            backAction={() => {
              goToCheckout();
            }}
          />
          {/* BODY */}
          <PaymentMethodBody
            data={data}
            onSelectedType={handleSelect}
            dataFromCheckout={dataCheckout}
            onDataChoosen={handleOnDataChoosen}
          />

          {/* FOOTER */}
          <PaymentMethodBottom
            data={data}
            choice={selectMethod}
            onCreateOrder={handleCreateOrder}
          />

          {/* Modal Expired Time */}
          <PaymentMethodExpiredTimeModal
            isOpen={isExpiredSession}
            close={handleBackToCart}
          />
          {/* Modal Status Pending */}
          <PaymentStatusModal
            isOpen={isPaymentStatusSession}
            handleNoAction={() => {
              setPaymentStatusSession(false);
            }}
            handleOkAction={handleCreateOrder}
          />
          {/* Modal Status Error */}
          <PaymentMethodErrorModal
            isOpen={isErrorSession}
            close={handleBackToCart}
          />
        </>
      )}
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
