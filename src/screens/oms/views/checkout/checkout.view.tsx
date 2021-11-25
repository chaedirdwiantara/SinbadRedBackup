/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState } from 'react';
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
const dummyPaymentDetail = [
  {
    name: 'Total Barang (2)',
    value: 330596,
    type: 'normal',
  },
  {
    name: 'Total Potongan Harga',
    value: 626,
    type: 'price_cut',
  },
  {
    name: 'PPN 10%',
    value: 32997,
    type: 'normal',
  },
  {
    name: 'Layanan Pembayaran',
    value: 4400,
    type: 'normal',
  },
];
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const paymentAction = usePaymentAction();
  const [loadingPage, setLoadingPage] = useState(true);
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );

  /** Set Loading Page */
  useEffect(() => {
    setTimeout(() => setLoadingPage(false), 1000);
  }, []);

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
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CheckoutAddressView />
            <CheckoutInvoiceGroupView
              products={dummySKU}
              paymentDetails={dummyPaymentDetail}
            />
          </ScrollView>
          <CheckoutBottomView />
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
