/** === IMPORT PACKAGE HERE ===  */
import { LogBox } from 'react-native';
import React, { FC, useEffect, useState, useContext } from 'react';
import { SnbContainer } from '@sinbad/react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL COMPONENT === */
import { PaymentMethodHeader } from './payment-method-header.view';
import { PaymentMethodBottom } from './payment-method-bottom.view';
import { goToCheckout, goToThankYouPage } from '@screen/oms/functions';
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
  usePaymentMethodSubRtdb,
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
import {
  useThankYouPageAction,
  useThankYouPageCancelOrderAction,
} from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
import { goBack } from '@screen/quest/function';

interface PaymentMethodInterface {
  props: {};
  route: any;
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = (props) => {
  /** => ACTION */
  LogBox.ignoreAllLogs();
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();
  const paymentMethodCreateOrder = usePaymentMethodCreateOrder();
  const PaymentMethodSubRtdb = usePaymentMethodSubRtdb();
  const thankYouPageCancelOrderAction = useThankYouPageCancelOrderAction();
  const thankYouPageAction = useThankYouPageAction();
  const {
    stateThankYouPage: {
      detail: {
        data: thankYouPageData,
        loading: thankYouPageLoading,
        // error: thankYouPageError,
      },
      paymentGuide: {
        data: thankYouPagePaymentGuidelistData,
        loading: thankYouPagePaymentGuideListLoading,
      },
    },
    dispatchThankYouPage,
  } = useThankYouPageContext();
  /** => Hooks */
  const [selectMethod, setSelectMethod] = useState(null); //handle selected method
  const [selectedPaymentMethodData, setSelectedPaymentMethodData] =
    useState<models.PaymentMethod | null>(null);
  const [isExpiredSession, setExpiredSession] = useState(false); //handle expired time
  const [isPaymentStatusSession, setPaymentStatusSession] = useState(false); //handle payment status
  const [isErrorSession, setErrorSession] = useState(false); //handle error modal
  const [getOrderStatus, setGetOrderStatus] = useState(false); //handle order status
  const [isLoading, setLoading] = useState(false);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const checkoutContextData = stateCheckout.checkout.data;
  /** => Get payment method  */
  const { statePaymentMethod } = useContext(contexts.PaymentMethodContext); //get id to sub rtdb

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

  /** => call subscribe rtdb for order  */
  const dataOrder = statePaymentMethod.createOrder.data;
  useFocusEffect(
    React.useCallback(() => {
      if (dataOrder?.id) {
        PaymentMethodSubRtdb.fetch(dispatchPaymentMethod, dataOrder.id);
      }
    }, []),
  );

  /** try to get status payment from order detail when there's no update from rtdb*/
  const handleStatusPayment = () => {
    thankYouPageAction.thankYoupageOrderDetail(
      dispatchThankYouPage,
      dataOrder?.id,
    );
    setGetOrderStatus(true);
  };

  /** navigate to thankyou page if orderStatus == waiting_for_payment'*/
  React.useEffect(() => {
    if (getOrderStatus == true) {
      if (thankYouPageData?.orderStatus == 'waiting_for_payment') {
        clearTimeout(timer);
        goToThankYouPage('payment', Number(dataOrder?.id));
      } else {
        // thankYouPageCancelOrderAction.fetch(dispatchThankYouPage, {
        //   id: params.orderId,
        //   status: 'cancelled',
        // });
        handleErrorStatus();
      }
    }
  }, [getOrderStatus]);

  /** => call navigation to thankyou page when there's an update from rtdb*/
  useFocusEffect(
    React.useCallback(() => {
      if (statePaymentMethod.subOrderRtdb.data == true) {
        clearTimeout(timer);
        goToThankYouPage('payment', Number(dataOrder?.id));
      } else {
        handleStatusPayment();
      }
    }, []),
  );

  /** => call 5 second checkout */
  React.useEffect(() => {
    if (isLoading == true) {
      setTimeout(() => {
        handleStatusPayment();
      }, 5000);
    }
  }, [isLoading]);

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
        paymentMethodCreateOrder.fetch(dispatchPaymentMethod, params);
      }
    }
  };

  /** => back handler */
  const handleBackHardware = () => {
    clearTimeout(timer);
    goBack();
  };
  useCustomBackHardware(() => handleBackHardware());

  return (
    <SnbContainer color="grey">
      {isLoading ? (
        <>
          <PaymentMethodHeader
            backAction={() => {
              handleBackHardware();
            }}
          />
          <LoadingPage />
          {/* Modal Status Error */}
          <PaymentMethodErrorModal
            isOpen={isErrorSession}
            close={handleBackToCart}
          />
        </>
      ) : (
        <>
          {/* HEADER */}
          <PaymentMethodHeader
            backAction={() => {
              handleBackHardware();
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
        </>
      )}
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
