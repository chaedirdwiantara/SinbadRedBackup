/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useContext, useRef } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbBottomSheet2Ref } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutHeader } from './checkout-header.view';
import { CheckoutAddressView } from './checkout-address.view';
import { CheckoutInvoiceGroupView } from './checkout-invoice-group.view';
import ModalBottomErrorExpiredTime from './expired-time.modal.view';
import { CheckoutTNCView } from './checkout-terms-n-condition.view';
import { ModalCheckoutTNC } from './checkout-term-n-condition-modal.view';
import { ModalParcelDetail } from './parcel-detail-modal.view';
import ModalValidationLimit from './validation-limit-modal';
import { CheckoutTotalOrderView } from './checkout-total-order-view';
import {
  goToPaymentMethod,
  totalPayment,
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
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import {
  useThankYouPageAction,
  useThankYouPageCancelOrderAction,
} from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';
import * as models from '@models';
/** === GLOBAL === */
const screenName = 'checkoutPage';
/** === INTERFACE === */
interface ParcelDetailData {
  data: models.CheckoutCartProduct[];
  sellerName: string;
}
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  const [parcelDetailData, setParcelDetailData] =
    React.useState<ParcelDetailData>();
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
  const { stateCheckout } = useContext(contexts.CheckoutContext);
  const data = stateCheckout.checkout.data;

  const totalPaymentFull = totalPayment(data?.sellers || []);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data?.sellers || []);
  const totalQtyCheckout = totalQty(data?.sellers || []);

  /** => MODAL REF */
  const refExpiredTimeModal = React.useRef<SnbBottomSheet2Ref>(null);
  const refTermConditionModal = React.useRef<SnbBottomSheet2Ref>(null);
  const refBackToCartModal = React.useRef<SnbBottomSheet2Ref>(null);
  const refParcelDetailModal = React.useRef<SnbBottomSheet2Ref>(null);
  const refValidationLimitModal = React.useRef<SnbBottomSheet2Ref>(null);

  /** => Back handler */
  useCustomBackHardware(() => refBackToCartModal.current?.open());

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
    refTermConditionModal.current?.open();
  };

  /** => set expired time  */
  const dateCurrent = new Date();
  const timeNow = dateCurrent.getTime() / 1000;
  const addTime = dateCurrent.getTime() / 1000 + 300000;
  const timeToExpired = addTime - timeNow;
  const timeRef = useRef<any>(null);
  useEffect(() => {
    timeRef.current = setTimeout(() => {
      refExpiredTimeModal.current?.open();
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
    refExpiredTimeModal.current?.close();
    refBackToCartModal.current?.close();
    refValidationLimitModal.current?.close();
    clearTimeout(timeRef.current);
    goToShoppingCart();
  };

  /** handle set parcel detail data */
  const handleSetParcelDetailData = (
    params: models.CheckoutCartProduct[],
    sellerName: string,
  ) => {
    setParcelDetailData({
      data: params,
      sellerName,
    });
  };

  /** handle open modal parcel detail */
  const handleOpenModalParcelDetail = () => {
    refParcelDetailModal.current?.open();
  };

  if (data === null) {
    return null;
  }

  return (
    <SnbContainer color="grey">
      {/* header view */}
      <CheckoutHeader
        testID={screenName}
        backAction={() => {
          refBackToCartModal.current?.open();
        }}
      />
      {/* {checkoutLoading ? (
        <LoadingPage />
      ) : ( */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* address view */}
        <CheckoutAddressView
          testID={screenName}
          buyerAddress={data.buyerAddress}
          buyerName={data.buyerName}
        />
        {/* main body view */}
        <CheckoutInvoiceGroupView
          testID={screenName}
          data={data}
          handleSetParcelDetailData={handleSetParcelDetailData}
          handleOpenModalParcelDetail={handleOpenModalParcelDetail}
        />
        {/* total order view */}
        <CheckoutTotalOrderView
          testID={screenName}
          totalProductsQty={2}
          totalProductsValue={totalPaymentFull}
          discountVoucher={10000}
          totalDeliveryFee={0}
          serviceFee={0}
          totalPayment={totalPaymentFull - data.sinbadVoucherDiscountOrder}
        />
        {/* term and condition view */}
        <CheckoutTNCView testID={screenName} clickAction={handleOpenTNCModal} />
      </ScrollView>

      {/* bottom view */}
      <CheckoutBottomView
        testID={screenName}
        data={data}
        goToPaymentMethod={toPaymentMethod}
        handleOpenValidationLimitModal={() => {
          refValidationLimitModal.current?.open();
        }}
      />

      {/* modal validation limit */}
      <ModalValidationLimit
        testID={screenName}
        parentRef={refValidationLimitModal}
        close={handleBackToCart}
      />

      {/* modal expired time */}
      <ModalBottomErrorExpiredTime
        testID={screenName}
        parentRef={refExpiredTimeModal}
        close={handleBackToCart}
      />

      {/* modal Term and Condition */}
      <ModalCheckoutTNC
        testID={screenName}
        parentRef={refTermConditionModal}
        close={() => refTermConditionModal.current?.close()}
        data={TncContentData}
      />

      {/* modal back to cart */}
      <BackToCartModal
        testID={screenName}
        parentRef={refBackToCartModal}
        handleNoAction={() => {
          refBackToCartModal.current?.close();
        }}
        handleOkAction={handleBackToCart}
      />

      {/* modal parcel detail */}
      <ModalParcelDetail
        testID={screenName}
        parentRef={refParcelDetailModal}
        close={() => {
          refParcelDetailModal.current?.close();
        }}
        data={parcelDetailData?.data}
        sellerName={parcelDetailData?.sellerName}
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
