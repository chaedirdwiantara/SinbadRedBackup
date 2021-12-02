/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { usePaymentAction } from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutHeader } from './checkout-header.view';
import { ModalPaymentType } from './payment-type-modal.view';
import { ModalPaymentChannels } from './payment-channels-modal.view';
import { ModalParcelDetail } from './parcel-detail-modal.view';
import { ModalTermAndCondition } from './term-and-condition-modal.view';
import { CheckoutBottomView } from './checkout-bottom.view';
import { CheckoutAddressView } from './checkout-address.view';
import { CheckoutInvoiceGroupView } from './checkout-invoice-group.view';
import * as models from '@models';
/** === IMPORT EXTERNAL FUNCTION === */
import {
  useCheckoutViewActions,
  useCheckoutMaster,
  usePaymentTypeModal,
  usePaymentChannelModal,
  usePaymentChannelsData,
  useTermsAndConditionsModal,
  useBackToCartModal,
} from '@screen/oms/functions/checkout/checkout-hook.function';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
import { BackToCartModal } from './checkout-back-to-cart-modal';
import { useReserveDiscountAction } from '@screen/promo/functions';
import { useReserveStockAction } from '@screen/product/functions';
import { backToCart } from '@screen/oms/functions';
import { useDispatch } from 'react-redux';
import * as Actions from '@actions';
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const backToCartModal = useBackToCartModal();
  /** => used for reset voucher */
  const dispatch = useDispatch();

  const checkoutViewActions = useCheckoutViewActions();
  const paymentTypeModal = usePaymentTypeModal();
  const paymentChannelsModal = usePaymentChannelModal();
  const paymentChannelData = usePaymentChannelsData();
  const paymentTCModal = useTermsAndConditionsModal();
  const {
    stateCheckout: {
      checkout: {
        data: checkoutData,
        loading: checkoutLoading,
        error: checkoutError,
      },
    },
    dispatchCheckout,
  } = useCheckoutContext();
  const {
    setInvoiceBrand,
    checkoutMaster,
    setReserveDiscount,
    setPaymentChannel,
  } = useCheckoutMaster();
  const paymentAction = usePaymentAction();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const { paymentChannelsList, paymentLastChannelDetail } = statePayment;
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const { dispatchReserveStock } = React.useContext(
    contexts.ReserveStockContext,
  );

  /** Set Loading Page */
  useEffect(() => {
    checkoutViewActions.fetch(dispatchCheckout);
  }, []);

  useEffect(() => {
    if (checkoutData) {
      setInvoiceBrand(checkoutData);
    }
  }, [checkoutData]);

  useEffect(() => {
    /** => merge data reserve */
    if (
      Array.isArray(checkoutMaster.invoices) &&
      checkoutMaster.invoices.length > 0 &&
      statePromo.reserveDiscount.detail.data !== null
    ) {
      setReserveDiscount(statePromo.reserveDiscount.detail.data.promoMatch);
    }
  }, [checkoutMaster.invoices.length]);

  useEffect(() => {
    if (!checkoutError) {
      console.log('ERROR CHECKOUT: ', checkoutError);
    }
  }, [checkoutError]);
  /** for post last payment channel */
  React.useEffect(() => {
    const invoices = checkoutMaster?.invoices;

    if (invoices.length > 0 && !paymentLastChannelDetail.data) {
      const cartParcels: models.ILastChannelCreateProps[] = invoices.map(
        (item) => {
          return {
            invoiceGroupId: item.invoiceGroupId,
            totalCartParcel:
              item.totalPriceAfterTax - (item?.totalPromoSellerAndVoucher ?? 0),
          };
        },
      );
      const dataLastChannel = {
        data: {
          cartParcels,
        },
      };

      paymentAction.lastChannelCreate(dispatchPayment, dataLastChannel);
    }
  }, [checkoutMaster.invoices]);
  /** => get payment terms and conditions detail on success post TC  */
  React.useEffect(() => {
    const dataTC = statePayment?.paymentTCCreate.data;
    if (dataTC) {
      paymentAction.tCDetail(dispatchPayment, dataTC.id);
    }
  }, [statePayment?.paymentTCCreate.data]);
  /** => get mongo data last type channels */
  React.useEffect(() => {
    const lastChannelId = statePayment?.paymentLastChannelCreate?.data?.id;
    if (lastChannelId) {
      paymentAction.lastChannelDetail(dispatchPayment, lastChannelId);
    }
  }, [statePayment.paymentLastChannelCreate]);
  /** => insert data payment channel to payment channel modal master */
  useEffect(() => {
    if (paymentChannelsList) {
      paymentChannelData.setPaymentChannels(paymentChannelsList.data);
    }
  }, [paymentChannelsList]);
  /** => insert data last payment channel to checkout master */
  useEffect(() => {
    const dataLastPaymentChannel =
      paymentLastChannelDetail?.data?.paymentTypeChannels;
    if (dataLastPaymentChannel) {
      setPaymentChannel(dataLastPaymentChannel);
    }
  }, [paymentLastChannelDetail]);
  /** => function after select payment type */
  const selectedPaymentType = (item: any) => {
    const invoiceGroupId = paymentChannelData?.invoiceGroupId;
    const totalCartParcel = paymentChannelData?.totalCartParcel;
    const paymentTypeId = item?.id;
    paymentChannelsModal.setOpen(true);
    paymentTypeModal.setOpen(false);
    if (invoiceGroupId && paymentTypeId) {
      paymentAction.channelsList(
        dispatchPayment,
        invoiceGroupId,
        totalCartParcel,
        paymentTypeId,
      );
    }
  };
  /** => for close payment channel modal */
  const closePaymentChannel = () => {
    paymentChannelsModal.setOpen(false);
  };
  /** for back from payment channel modal */
  const backModalPaymentChannel = () => {
    paymentChannelsModal.setOpen(false);
    paymentTypeModal.setOpen(true);
  };
  /** handle back to cart */
  const handleBackToCart = () => {
    /** => reset local voucher data */
    dispatch(Actions.saveSelectedVouchers(null));
    backToCartModal.setOpen(false);
    backToCart();
  };

  /** === VIEW === */
  return (
    <SnbContainer color="grey">
      <CheckoutHeader
        backAction={() => {
          backToCartModal.setOpen(true);
        }}
      />
      {checkoutLoading ? (
        <LoadingPage />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CheckoutAddressView />
            {Array.isArray(checkoutMaster.invoices) &&
              checkoutMaster.invoices.length > 0 &&
              checkoutMaster.invoices.map((invoiceGroup, index) => (
                <CheckoutInvoiceGroupView
                  key={invoiceGroup.invoiceGroupId}
                  data={invoiceGroup}
                  openModalPaymentType={() => paymentTypeModal.setOpen(true)}
                  index={index}
                />
              ))}
          </ScrollView>
          <CheckoutBottomView
            data={checkoutMaster.invoices}
            openTCModal={() => paymentTCModal.setOpen(true)}
          />
          <ModalPaymentType
            isOpen={paymentTypeModal.isOpen}
            close={paymentTypeModal.close}
            openModalPaymentChannels={selectedPaymentType}
          />
          <ModalPaymentChannels
            isOpen={paymentChannelsModal.isOpen}
            back={backModalPaymentChannel}
            close={closePaymentChannel}
          />
          <ModalParcelDetail />
          <ModalTermAndCondition
            isOpen={paymentTCModal.isOpen}
            close={() => paymentTCModal.setOpen(false)}
          />
          <BackToCartModal
            isOpen={backToCartModal.isOpen}
            handleNoAction={() => {
              backToCartModal.setOpen(false);
            }}
            handleOkAction={handleBackToCart}
          />
        </>
      )}
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
 * updatedBy: Maulana Ghozi (pyramid)
 * updatedDate: 25112021
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
