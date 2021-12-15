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
} from 'react-native-sinbad-ui';
import { toCurrency } from '@core/functions/global/currency-format';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { CheckoutSuccessStyles } from '@screen/oms/styles';
import {
  goBack,
  copyToClipboard,
  goToHome,
  useCreateOrders,
  usePaymentAction,
} from '@screen/oms/functions';
import { contexts } from '@contexts';
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
  const [paymentData] = useState<CheckoutSuccess>(checkoutSuccessDummy);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const ordersAction = useCreateOrders();
  const paymentAction = usePaymentAction();
  const { dispatchCheckout } = useContext(contexts.CheckoutContext);
  const { dispatchPayment } = useContext(contexts.PaymentContext);

  /** => Reset Create Orders data after fetching Create Order Detail */
  useEffect(() => {
    ordersAction.reset(dispatchCheckout);
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
  }, []);
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Transaksi Selesai'}
        backAction={() => goBack()}
      />
    );
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
  const renderPaymentDetail = () => (
    <View
      style={{
        ...CheckoutSuccessStyles.cardContainer,
        ...CheckoutSuccessStyles.containerBottomBorder,
      }}>
      <View style={CheckoutSuccessStyles.topCardSlot}>
        <SnbText.B4>Detail Pembayaran</SnbText.B4>
      </View>
      <View style={CheckoutSuccessStyles.paymentDetailContent}>
        <View>
          <SnbText.C2>Total:</SnbText.C2>
          <View style={{ marginVertical: 8 }}>
            <SnbText.H4 color={color.yellow50}>
              {toCurrency(paymentData.total)}
            </SnbText.H4>
          </View>
          <TouchableOpacity
            onPress={() =>
              copyToClipboard(
                paymentData.total,
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
    </View>
  );
  /** => Payment Guidance */
  const renderPaymentGuidance = () => (
    <View
      style={{
        paddingHorizontal: 16,
        ...CheckoutSuccessStyles.containerBottomBorder,
      }}>
      <View style={CheckoutSuccessStyles.topCardSlot}>
        <SnbText.B4>Panduan Pembayaran</SnbText.B4>
      </View>
      <TouchableOpacity
        onPress={() => console.log('Payment guidance pressed')}
        style={CheckoutSuccessStyles.paymentGuidanceSelect}>
        <SnbText.B3>{paymentData.paymentUsed.name}</SnbText.B3>
        <SnbIcon name="expand_more" color={color.black40} size={24} />
      </TouchableOpacity>
    </View>
  );
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
          <SnbText.B3>{paymentData.orderedVia}</SnbText.B3>
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
      {renderContent()}
      {renderToast()}
      {renderFooter()}
    </SnbContainer>
  );
};

export default OmsCheckoutSuccessView;
