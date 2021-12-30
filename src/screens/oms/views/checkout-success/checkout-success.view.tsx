/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
import { CheckoutSuccessStyles } from '@screen/oms/styles';
import {
  goToHome,
  goToHistoryList,
  usePaymentAction,
  useCreateOrders,
  useCartTotalProductActions,
  useCartMasterActions,
} from '@screen/oms/functions';
import { contexts } from '@contexts';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
import { NavigationAction } from '@navigation';
/** === TYPES === */

/** === COMPONENT === */
const OmsCheckoutSuccessView: FC = () => {
  /** === HOOKS === */
  const { dispatchPayment } = useContext(contexts.PaymentContext);
  const { dispatchCheckout } = useContext(contexts.CheckoutContext);
  const paymentAction = usePaymentAction();
  const checkoutAction = useCreateOrders();
  const cartTotalProductActions = useCartTotalProductActions();
  const cartMasterActions = useCartMasterActions();
  useCustomBackHardware(() => NavigationAction.resetToHome());
  useEffect(() => {
    /** Reset Data to prevent automaticaly create orders on checkout */
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
    checkoutAction.reset(dispatchCheckout);
    cartTotalProductActions.fetch();
    cartMasterActions.reset();
  }, []);
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return <SnbTopNav.Type1 type="red" title={'Pesanan Diproses'} />;
  };
  /** => Success Image */
  const renderSuccessImage = () => (
    <View
      style={{
        ...CheckoutSuccessStyles.successImageContainer,
      }}>
      <Image
        source={require('../../../../assets/images/oms_checkout_success.png')}
        width={200}
        style={{ marginBottom: 24, marginTop: 8 }}
      />

      <SnbText.H4 align="center">Pesanan anda akan kami proses.</SnbText.H4>
      <SnbText.B1 align="center">Untuk melihat status pesanan anda,</SnbText.B1>
      <SnbText.B1 align="center">silahkan ke daftar pesanan.</SnbText.B1>
    </View>
  );

  /** => Footer */
  const renderFooter = () => (
    <View style={{ height: 150 }}>
      <SnbButton.Single
        type="primary"
        title="Daftar Pesanan"
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
  /** => Content */
  const renderContent = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {renderSuccessImage()}
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </SnbContainer>
  );
};

export default OmsCheckoutSuccessView;
