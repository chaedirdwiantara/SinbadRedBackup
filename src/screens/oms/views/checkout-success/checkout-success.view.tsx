/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
  SnbIcon,
  color,
  SnbToast,
  SnbHtml,
} from 'react-native-sinbad-ui';
import { toCurrency } from '@core/functions/global/currency-format';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { CheckoutSuccessStyles } from '@screen/oms/styles';
import {
  copyToClipboard,
  goToHome,
  useCreateOrders,
  usePaymentAction,
  useOrdersDetail,
  useDataConstant,
} from '@screen/oms/functions';
import { contexts } from '@contexts';
import LoadingPage from '@core/components/LoadingPage';
import { useCheckFlagByTask } from '@core/functions/firebase/flag-rtdb.function';
import { useDataFlagRTDB } from '@core/redux/Data';
import * as models from '@models';
/** === TYPES === */
interface PaymentMethod {
  name: string;
  key: string;
  guide?: string;
}
interface CheckoutSuccess {
  total: number;
  paymentMethods: Array<PaymentMethod>;
  paymentUsed: PaymentMethod;
  orderedVia: string;
  orderedAt: string;
  paymentDueDate: string;
}
/** === DUMMIES === */
const paymentMethodDummies: Array<PaymentMethod> = [
  { name: 'Tunai', key: 'cash' },
  { name: 'Credit', key: 'credit' },
];
const checkoutSuccessDummy: CheckoutSuccess = {
  total: 2300000,
  paymentUsed: paymentMethodDummies[0],
  orderedVia: 'Sinbad App',
  orderedAt: new Date(2021, 8, 15, 16, 46).toISOString(),
  paymentDueDate: new Date(2021, 8, 15, 19, 46).toISOString(),
  paymentMethods: paymentMethodDummies,
};
/** === COMPONENT === */
const OmsCheckoutSuccessView: FC = () => {
  /** === HOOKS === */
  useCheckFlagByTask('confirmOrderLoading');
  const [paymentData] = useState<CheckoutSuccess>(checkoutSuccessDummy);
  const [showToast, setShowToast] = useState(false);
  const [isPageLoading, setPageLoading] = useState(true);
  const [isMultiple, setMultiple] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const ordersAction = useCreateOrders();
  const paymentAction = usePaymentAction();
  const ordersDetail = useOrdersDetail();
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const { dispatchPayment } = useContext(contexts.PaymentContext);
  const { stateCheckoutDone, dispatchCheckoutDone } = useContext(
    contexts.CheckoutDoneContext,
  );
  const flagRTDB = useDataFlagRTDB();

  /** => Reset Create Orders data after fetching Create Order Detail */
  useEffect(() => {
    console.log('Create Orders Data', stateCheckout.create.data);
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
  }, []);

  /** => Listern to RTDB change */
  useEffect(() => {
    if (!flagRTDB.confirmOrderLoading) {
      ordersDetail.get(dispatchCheckoutDone, 2);
    }
  }, [flagRTDB.confirmOrderLoading]);

  /** => Reset confirm order status & set loading page false */
  useEffect(() => {
    if (stateCheckoutDone.detail.data !== null) {
      ordersAction.reset(dispatchCheckout);
      if (stateCheckoutDone.detail.data.orderParcels.length === 1) {
        setMultiple(false);
      }
      setPageLoading(false);
    }
  }, [stateCheckoutDone.detail.data]);
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return <SnbTopNav.Type1 type="red" title={'Transaksi Selesai'} />;
  };
  /** => Success Image */
  const renderSuccessImage = () => (
    <View
      style={{
        ...CheckoutSuccessStyles.successImageContainer,
        ...CheckoutSuccessStyles.containerBottomBorder,
      }}>
      <Image
        source={require('../../../../assets/images/oms_checkout_success.png')}
        width={200}
        style={{ marginBottom: 24, marginTop: 8 }}
      />
      <SnbText.H4>Terima Kasih!</SnbText.H4>
    </View>
  );
  /** => Payment Detail */
  const renderPaymentDetail = () => {
    const data = stateCheckoutDone.detail.data;
    return (
      <View
        style={{
          ...CheckoutSuccessStyles.cardContainer,
          ...CheckoutSuccessStyles.containerBottomBorder,
        }}>
        <View style={CheckoutSuccessStyles.topCardSlot}>
          <SnbText.B4>Detail Pembayaran</SnbText.B4>
        </View>
        {isMultiple
          ? renderMultipleOrderParcels(data as models.CheckoutDoneOrders)
          : renderSingleOrderParcels(data as models.CheckoutDoneOrders)}
      </View>
    );
  };
  /** => Single Order Parcels */
  const renderSingleOrderParcels = (data: models.CheckoutDoneOrders) => (
    <View style={CheckoutSuccessStyles.paymentDetailContent}>
      <View>
        <SnbText.C2>Total:</SnbText.C2>
        <View style={{ marginVertical: 8 }}>
          <SnbText.H4 color={color.yellow50}>
            {toCurrency(data?.totalAmount as number)}
          </SnbText.H4>
        </View>
        <TouchableOpacity
          onPress={() =>
            copyToClipboard(
              data?.totalAmount as number,
              'Jumlah Tersalin',
              setShowToast,
              setToastMessage,
            )
          }>
          <SnbText.C1 color={color.red50}>Salin Jumlah</SnbText.C1>
        </TouchableOpacity>
      </View>
      {!isMultiple ? (
        <TouchableOpacity onPress={() => console.log('Detail pressed')}>
          <SnbText.B4 color={color.red50}>DETAIL</SnbText.B4>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
  /** => Multiple Order Parcels */
  const renderMultipleOrderParcels = (data: models.CheckoutDoneOrders) => {
    return data.orderParcels.map((parcel) => (
      <View style={CheckoutSuccessStyles.paymentDetailContent}>
        <View>
          <SnbText.C2>Total:</SnbText.C2>
          <View style={{ marginVertical: 8 }}>
            <SnbText.H4 color={color.yellow50}>
              {toCurrency(parcel.amount as number)}
            </SnbText.H4>
          </View>
          <TouchableOpacity
            onPress={() =>
              copyToClipboard(
                parcel.amount as number,
                'Jumlah Tersalin',
                setShowToast,
                setToastMessage,
              )
            }>
            <SnbText.C1 color={color.red50}>Salin Jumlah</SnbText.C1>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log('Detail pressed')}>
          <SnbText.B4 color={color.red50}>DETAIL</SnbText.B4>
        </TouchableOpacity>
      </View>
    ));
  };
  /** => Payment Guidance */
  const renderPaymentGuidance = () => {
    const data = stateCheckoutDone.detail.data;
    return (
      <View
        style={{
          paddingHorizontal: 16,
          ...CheckoutSuccessStyles.containerBottomBorder,
        }}>
        <View style={CheckoutSuccessStyles.topCardSlot}>
          <SnbText.B4>Panduan Pembayaran</SnbText.B4>
        </View>
        {isMultiple ? (
          <SnbHtml value={useDataConstant.paymentDescription} fontSize={12} />
        ) : (
          <SnbHtml
            value={data.orderParcels[0].paymentChannel.description as string}
            fontSize={12}
          />
        )}
      </View>
    );
  };
  /** => Order Review */
  const renderOrderReview = () => (
    <View
      style={{
        ...CheckoutSuccessStyles.cardContainer,
        ...CheckoutSuccessStyles.containerBottomBorder,
      }}>
      <View style={CheckoutSuccessStyles.topCardSlot}>
        <SnbText.B4>Ringkasan Pesanan</SnbText.B4>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SnbText.B3>Order Via</SnbText.B3>
          <SnbText.B3>{'Toko'}</SnbText.B3>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8,
          }}>
          <SnbText.B3>Tanggal Pembelian</SnbText.B3>
          <SnbText.B3>{toLocalDateTime(paymentData.orderedAt)}</SnbText.B3>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SnbText.B3>Jatuh Tempo</SnbText.B3>
          <SnbText.B3>{toLocalDateTime(paymentData.paymentDueDate)}</SnbText.B3>
        </View>
      </View>
    </View>
  );
  /** => Footer */
  const renderFooter = () => (
    <View style={{ height: 160 }}>
      <SnbButton.Single
        type="primary"
        title="Cek Status Pembayaran"
        disabled={false}
        onPress={() => console.log('Check payment status pressed')}
      />
      <SnbButton.Single
        type="secondary"
        title="Kembali ke Beranda"
        disabled={false}
        onPress={goToHome}
      />
    </View>
  );
  /** => Toast */
  const renderToast = () =>
    showToast && (
      <SnbToast
        message={toastMessage}
        buttonText="TUTUP"
        buttonAction={() => setShowToast(false)}
        open={showToast}
        close={() => setShowToast(false)}
      />
    );
  /** => Content */
  const renderContent = () => (
    <ScrollView>
      {renderSuccessImage()}
      {renderPaymentDetail()}
      {renderPaymentGuidance()}
      {renderOrderReview()}
    </ScrollView>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {isPageLoading ? (
        <LoadingPage />
      ) : (
        <>
          {renderContent()}
          {renderToast()}
          {renderFooter()}
        </>
      )}
    </SnbContainer>
  );
};

export default OmsCheckoutSuccessView;
