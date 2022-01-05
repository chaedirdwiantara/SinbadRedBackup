/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbText,
  color,
  SnbBottomSheet,
  SnbListButtonType1,
} from 'react-native-sinbad-ui';
import {
  usePaymentChannelsData,
  useCheckoutMaster,
  usePaymentAction,
} from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';

interface PaymentChannelsModalProps {
  isOpen: boolean;
  close: () => void;
  back: () => void;
}
/** === COMPONENT === */
export const ModalPaymentChannels: FC<PaymentChannelsModalProps> = ({
  isOpen,
  close,
  back,
}) => {
  /** === HOOK === */
  const checkoutMaster = useCheckoutMaster();
  const paymentChannelData = usePaymentChannelsData();
  const { invoiceChannelList } = usePaymentAction();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const selectedPaymentChannel = (item: any) => {
    const dataUpdatePaymentChannels = [
      {
        invoiceGroupId: paymentChannelData.invoiceGroupId,
        totalFee: item.totalFee,
        totalPayment: item.totalPayment,
        totalPromoPayment: item.promoPaymentAmount,
        paymentType: paymentChannelData.paymentType,
        paymentChannel: { id: item.id, name: item.name, iconUrl: item.image },
      },
    ];
    checkoutMaster.setPaymentChannel(dataUpdatePaymentChannels);
    invoiceChannelList(dispatchPayment, paymentChannelData.invoiceGroupId);
    close();
  };
  const contentChannelTypes = (paymentTypes: any) => {
    return (
      <>
        {paymentTypes.map((item: any, index: number) => {
          const description =
            item.status === 'enabled'
              ? `Total Biaya ${toCurrency(item.totalPayment, {
                  withFraction: false,
                })}`
              : item.message;
          return (
            <SnbListButtonType1
              key={index}
              title={item.name}
              description={description}
              image={item.image}
              type={'two'}
              disabled={
                item.status === 'disabled' ||
                item.promoPaymentAvailable === null
                  ? true
                  : false
              }
              onPress={() => selectedPaymentChannel(item)}
              badge={item.promoPaymentAvailable && item.status !== 'disabled'}
              textBadge={item.promPaymentDescription}
            />
          );
        })}
      </>
    );
  };
  const contentChannelGroups = (paymentGroups: any) => {
    return (
      <View>
        {paymentGroups.map((item: any, index: number) => {
          return (
            <View key={index} style={{ marginBottom: 16 }}>
              <View style={{ marginTop: 16 }}>
                <SnbText.H4>{item.name}</SnbText.H4>
              </View>
              {contentChannelTypes(item.type)}
            </View>
          );
        })}
      </View>
    );
  };
  const content = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingHorizontal: 16,
        }}>
        <View>
          <SnbText.H4>Tipe Pembayaran</SnbText.H4>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 12,
            }}>
            <Image
              source={{
                uri: paymentChannelData?.paymentType?.iconUrl,
              }}
              style={CheckoutStyle.mediumIcon}
            />
            <SnbText.B1>{paymentChannelData?.paymentType?.name}</SnbText.B1>
          </View>
        </View>
        <View style={{ paddingTop: 16 }}>
          <SnbText.H4>Pilih Metode Pembayaran</SnbText.H4>
        </View>
        {!statePayment?.paymentChannelsList.loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {contentChannelGroups(paymentChannelData?.paymentChannels)}
          </ScrollView>
        ) : (
          <LoadingPage />
        )}
      </View>
    );
  };
  return statePayment?.paymentChannelsList ? (
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      title={'Metode Pembayaran'}
      closeAction={back}
      actionIcon={'back'}
      size={'halfscreen'}
    />
  ) : null;
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
