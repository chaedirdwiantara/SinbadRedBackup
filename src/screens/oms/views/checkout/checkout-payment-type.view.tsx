/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
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
import * as models from '@models';
import LoadingPage from '@core/components/LoadingPage';
/** === TYPES === */
interface CheckoutPaymentTypeViewProps {
  data: models.IInvoiceCheckout;
  openModalPaymentType: (value: boolean) => void;
}
/** === COMPONENT === */
export const CheckoutPaymentTypeView: FC<CheckoutPaymentTypeViewProps> = ({
  data,
  openModalPaymentType,
}) => {
  /** === HOOK === */
  const paymentAction = usePaymentAction();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const lastTypeChannel = statePayment.paymentLastChannelDetail;
  const dataLastTypeChannel = lastTypeChannel?.data?.paymentTypeChannels;
  const loadingLastTypeChanel = lastTypeChannel?.loading;

  const invoiceGroupId = 'abcdef12345';
  const totalCartParcel = 100000;
  const page = 1;

  return (
    <View style={{ marginTop: 16 }}>
      <SnbText.H4>Tipe Pembayaran</SnbText.H4>
      <SnbDivider style={{ marginVertical: 8 }} />
      {data.isPotentialPaymentPromo && <CheckoutPaymentPromoBadge />}
      {!loadingLastTypeChanel ? (
        <TouchableOpacity
          onPress={() => {
            paymentAction.typeslist(
              dispatchPayment,
              invoiceGroupId,
              totalCartParcel,
              page,
            );
            openModalPaymentType(false);
          }}
          style={CheckoutStyle.selectPaymentButton}>
          {dataLastTypeChannel ? (
            <>
              <Image
                source={{
                  uri: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
                }}
                style={CheckoutStyle.smallIcon}
              />
              <View style={{ flex: 1 }}>
                <SnbText.B1 color={color.black80}>
                  Bayar Di Tempat - Tunai
                </SnbText.B1>
              </View>
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <SnbText.B1 color={color.red50}>
                Pilih Tipe & Metode Pembayaran
              </SnbText.B1>
            </View>
          )}

          <View style={{ alignItems: 'flex-end' }}>
            <SnbIcon name={'chevron_right'} color={color.black80} size={24} />
          </View>
        </TouchableOpacity>
      ) : (
        <LoadingPage />
      )}
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
