/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState, useContext, useRef } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutHeader } from './checkout-header.view';
import { CheckoutAddressView } from './checkout-address.view';
import { CheckoutInvoiceGroupView } from './checkout-invoice-group.view';
import ModalBottomErrorExpiredTime from './expired-time.modal.view';
import { CheckoutTNCView } from './checkout-terms-n-condition.view';
import { ModalCheckoutTNC } from './checkout-term-n-condition-modal.view';
import {
  goToPaymentMethod,
  totalPaymentWithoutCurrency,
  totalQty,
  useGetTncContent,
} from '@screen/oms/functions';
import {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
  usePaymentMethodSubRtdb,
} from '@screen/oms/functions/payment-method/payment-method-hook.function';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
import { CheckoutBottomView } from './checkout-bottom.view';
import { useUpdateCartAction, useCheckoutAction } from '../../functions';
import { goToShoppingCart } from '@core/functions/product';
import { BackToCartModal } from './checkout-back-to-cart-modal';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
import { useBackToCartModal } from '@screen/oms/functions/checkout/checkout-hook.function';
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import {
  useThankYouPageAction,
  useThankYouPageCancelOrderAction,
} from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';

/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** => ACTION */
  const { dispatchCart } = useContext(contexts.CartContext);
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();
  const paymentMethodList = usePaymentMethodListContent();
  const paymentMethodCreateOrder = usePaymentMethodCreateOrder();
  const PaymentMethodSubRtdb = usePaymentMethodSubRtdb();
  const thankYouPageCancelOrderAction = useThankYouPageCancelOrderAction();
  const thankYouPageAction = useThankYouPageAction();

  /** === HOOK === */
  const backToCartModal = useBackToCartModal();
  const [isExpiredSession, setExpiredSession] = useState(false);
  const [isModalTNCOpen, setModalTNCOpen] = useState(false);
  const { stateCheckout } = useContext(contexts.CheckoutContext);
  const data = stateCheckout.checkout.data;

  const totalPaymentNumber = totalPaymentWithoutCurrency(data?.sellers || []);
  const totalQtyCheckout = totalQty(data?.sellers || []);

  /** => Back handler */
  useCustomBackHardware(() => backToCartModal.setOpen(true));

  /** => Get TNC Contents  */
  const getTncContent = useGetTncContent();
  const {
    stateCheckout: {
      checkoutTnc: { data: TncContentData },
    },
    dispatchCheckout,
  } = useCheckoutContext();
  const { dispatchPaymentMethod } = usePaymentMethodContext();
  const { dispatchThankYouPage } = useThankYouPageContext();

  /** handle term n condition */
  const handleOpenTNCModal = () => {
    getTncContent.tncContentGet(dispatchCheckout, 'termAndConditions');
    setModalTNCOpen(true);
  };

  /** => set expired time  */
  const dateCurrent = new Date();
  const timeNow = dateCurrent.getTime() / 1000;
  const addTime = dateCurrent.getTime() / 1000 + 300000;
  const timeToExpired = addTime - timeNow;
  const timeRef = useRef<any>(null);
  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setExpiredSession(true);
    }, timeToExpired);
  }, []);

  /** => to Payment Method Page  */
  const dataToPaymentMethod = { totalPaymentNumber, addTime, totalQtyCheckout };
  const toPaymentMethod = () => {
    paymentMethodList.reset(dispatchPaymentMethod);
    paymentMethodCreateOrder.reset(dispatchPaymentMethod);
    PaymentMethodSubRtdb.reset(dispatchPaymentMethod);
    thankYouPageCancelOrderAction.reset(dispatchThankYouPage);
    thankYouPageAction.thankYouPageReset(dispatchThankYouPage);
    clearTimeout(timeRef.current);
    goToPaymentMethod(dataToPaymentMethod);
  };

  /** handle back to cart */
  const handleBackToCart = () => {
    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    setExpiredSession(false);
    backToCartModal.setOpen(false);
    clearTimeout(timeRef.current);
    goToShoppingCart();
  };

  if (data === null) {
    return null;
  }

  return (
    <SnbContainer color="grey">
      {/* header view */}
      <CheckoutHeader
        backAction={() => {
          backToCartModal.setOpen(true);
        }}
      />
      {/* {checkoutLoading ? (
        <LoadingPage />
      ) : ( */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* address view */}
        <CheckoutAddressView
          buyerAddress={data.buyerAddress}
          buyerName={data.buyerName}
        />
        {/* main body view */}
        <CheckoutInvoiceGroupView data={data} />
        {/* term and condition view */}
        <CheckoutTNCView clickAction={handleOpenTNCModal} />
      </ScrollView>

      {/* bottom view */}
      <CheckoutBottomView data={data} goToPaymentMethod={toPaymentMethod} />

      {/* modal expired time */}
      <ModalBottomErrorExpiredTime
        isOpen={isExpiredSession}
        close={handleBackToCart}
      />

      {/* modal Term and Condition */}
      <ModalCheckoutTNC
        isOpen={isModalTNCOpen}
        close={() => setModalTNCOpen(false)}
        data={TncContentData}
      />

      {/* modal back to cart */}
      <BackToCartModal
        isOpen={backToCartModal.isOpen}
        handleNoAction={() => {
          backToCartModal.setOpen(false);
        }}
        handleOkAction={handleBackToCart}
      />

      {/* )} */}
    </SnbContainer>
  );
};

export default OmsCheckoutView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 10092021
 * updatedBy: Andi Chaedir Dwiantara (valkyrie)
 * updatedDate: 08032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
