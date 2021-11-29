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
/** === IMPORT EXTERNAL FUNCTION === */
import {
  useCheckoutViewActions,
  useCheckoutMaster,
} from '@screen/oms/functions/checkout/checkout-hook.function';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
/** === DUMMIES === */
const dummySKU = [
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    urlImages:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
];

/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const checkoutViewActions = useCheckoutViewActions();
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
  const { setInvoiceBrand, getCheckoutMaster, setReserveDiscount } =
    useCheckoutMaster();
  const paymentAction = usePaymentAction();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const { statePromo } = React.useContext(contexts.PromoContext);

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
      Array.isArray(getCheckoutMaster.invoices) &&
      getCheckoutMaster.invoices.length > 0 &&
      statePromo.reserveDiscount.detail.data !== null
    ) {
      setReserveDiscount(statePromo.reserveDiscount.detail.data.promoMatch);
    }
  }, [getCheckoutMaster.invoices.length]);

  useEffect(() => {
    if (!checkoutError) {
      console.log('ERROR CHECKOUT: ', checkoutError);
    }
  }, [checkoutError]);

  React.useEffect(() => {
    const dataLastChannel = {
      data: {
        cartParcels: [
          {
            invoiceGroupId: 'abcdef12345',
            totalCartParcel: 50000.0,
          },
          {
            invoiceGroupId: 'abcdef12346',
            totalCartParcel: 60000.0,
          },
        ],
      },
    };
    paymentAction.lastChannelCreate(dispatchPayment, dataLastChannel);
  }, []);
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
  /** === VIEW === */
  return (
    <SnbContainer color="grey">
      <CheckoutHeader />
      {checkoutLoading ? (
        <LoadingPage />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CheckoutAddressView />
            {Array.isArray(getCheckoutMaster.invoices) &&
              getCheckoutMaster.invoices.length > 0 &&
              getCheckoutMaster.invoices.map((invoiceGroup) => (
                <CheckoutInvoiceGroupView
                  key={invoiceGroup.invoiceGroupId}
                  products={dummySKU}
                  data={invoiceGroup}
                />
              ))}
          </ScrollView>
          <CheckoutBottomView data={getCheckoutMaster.invoices} />
          <ModalPaymentType />
          <ModalPaymentChannels />
          <ModalParcelDetail />
          <ModalTermAndCondition />
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
