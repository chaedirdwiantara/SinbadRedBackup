/** === IMPORT PACKAGE HERE ===  */
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SnbText, SnbDivider, color, SnbIcon } from 'react-native-sinbad-ui';
import {
  usePaymentTypeModal,
  usePaymentAction,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutPaymentPromoBadge } from './checkout-payment-promo-badge.view';
/** === COMPONENT === */
export const CheckoutPaymentTypeView: FC = () => {
  /** === HOOK === */
  const paymentTypesModal = usePaymentTypeModal();
  const paymentAction = usePaymentAction();
  const { dispatchPayment } = React.useContext(contexts.PaymentContext);

  const invoiceGroupId = 'abcdef12345';
  const totalCartParcel = 100000;
  const page = 1;
  return (
    <View style={{ marginTop: 16 }}>
      <SnbText.H4>Tipe Pembayaran</SnbText.H4>
      <SnbDivider style={{ marginVertical: 8 }} />
      <CheckoutPaymentPromoBadge />
      <TouchableOpacity
        onPress={() => {
          paymentAction.typeslist(
            dispatchPayment,
            invoiceGroupId,
            totalCartParcel,
            page,
          );
          paymentTypesModal.setOpen(true);
        }}
        style={CheckoutStyle.selectPaymentButton}>
        <Image
          source={{
            uri: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
          }}
          style={CheckoutStyle.smallIcon}
        />
        <View style={{ flex: 1 }}>
          <SnbText.B1 color={color.black80}>Bayar Di Tempat - Tunai</SnbText.B1>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <SnbIcon name={'chevron_right'} color={color.black80} size={24} />
        </View>
      </TouchableOpacity>
      <SnbDivider />
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
