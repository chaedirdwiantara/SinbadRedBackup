/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
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
  goToHistoryList,
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
import { CountDownTimer } from '@screen/history/components';
import moment from 'moment';
import { AccordioCustom } from './AccordionCustom';
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
  // const [showToast, setShowToast] = useState(false);
  const [isPageLoading, setPageLoading] = useState(true);
  const [isMultiple, setMultiple] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  /** === REF === */
  const showToast = useRef<any>();

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

  const setShowToast = () => {
    showToast.current.show();
  };

  /** => Reset Create Orders data after fetching Create Order Detail */
  useEffect(() => {
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
  }, []);

  /** => Listern to RTDB change */
  useEffect(() => {
    console.log('Status COnfirm Loading', flagRTDB.confirmOrderLoading);
    if (flagRTDB.confirmOrderLoading === 'false') {
      ordersDetail.get(
        dispatchCheckoutDone,
        stateCheckout.create.data?.orderId as number,
      );
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

      {!isMultiple ? (
        stateCheckoutDone.detail.data?.orderParcels[0].paymentType.id === 1 &&
        stateCheckoutDone.detail.data.orderParcels[0].billing.expiredTime !==
          null ? (
          <>
            <SnbText.H4>SEGERA LAKUKAN PEMBAYARAN DALAM WAKTU</SnbText.H4>
            <CountDownTimer
              expiredTime={
                stateCheckoutDone.detail.data?.orderParcels[0].billing
                  .expiredTime
              }
              type="checkoutDone"
            />
            <SnbText.C2>
              (Sebelum{' '}
              {moment(
                stateCheckoutDone.detail.data?.orderParcels[0].billing
                  .expiredTime,
              ).format('LLLL')}
              )
            </SnbText.C2>
          </>
        ) : (
          <SnbText.H4>Terima Kasih!</SnbText.H4>
        )
      ) : (
        <SnbText.H4>Terima Kasih!</SnbText.H4>
      )}
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
          <SnbText.C2>{parcel.orderCode}</SnbText.C2>
          <View style={{ marginVertical: 8, flexDirection: 'row' }}>
            <SnbText.H4 color={color.black80}>Sub Total : </SnbText.H4>
            <SnbText.H4 color={color.yellow50}>
              {toCurrency(parcel.amount as number)}
            </SnbText.H4>
          </View>
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
          <AccordioCustom
            data={
              data?.orderParcels[0].paymentChannel
                .description as Array<models.CheckoutDonePaymentChannelDescription>
            }
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
          <SnbText.B3>
            {toLocalDateTime(
              stateCheckoutDone.detail.data?.orderDate as string,
            )}
          </SnbText.B3>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SnbText.B3>Estimasi Tanggal Pengiriman</SnbText.B3>
          <SnbText.B3>
            {toLocalDateTime(
              stateCheckoutDone.detail.data?.estDeliveredDate as string,
            )}
          </SnbText.B3>
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
        onPress={goToHistoryList}
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
        ref={showToast}
        message={toastMessage}
        position={'top'}
        duration={3000}
        positionValue={StatusBar.currentHeight || 0}
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
