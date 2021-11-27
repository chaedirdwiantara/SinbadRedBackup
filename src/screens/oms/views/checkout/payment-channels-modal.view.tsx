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
  usePaymentTypeModal,
  usePaymentChannelModal,
  useSelectedPaymentType,
} from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';

interface PaymentChannelsModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalPaymentChannels: FC<PaymentChannelsModalProps> = ({
  isOpen,
  close,
}) => {
  /** === HOOK === */
  const paymentTypesModal = usePaymentTypeModal();
  const paymentChannelsModal = usePaymentChannelModal();
  const paymentType = useSelectedPaymentType();
  const { statePayment } = React.useContext(contexts.PaymentContext);
  const contentChannelTypes = (paymentTypes: any) => {
    return (
      <>
        {paymentTypes.map((item: any, index: number) => {
          const description =
            item.status === 'enabled'
              ? `Total Biaya ${toCurrency(item.totalPayment)}`
              : item.message;
          return (
            <SnbListButtonType1
              key={index}
              title={item.name}
              description={description}
              image={item.image}
              type={'two'}
              disabled={item.status !== 'disabled' ? true : false}
              onPress={() => {
                paymentChannelsModal.setOpen(false);
                // setSelectedPaymentChannels(selectedPaymentChannels);
              }}
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
    const selectedPaymentType = paymentType.selectedPaymentType;
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
                uri: selectedPaymentType?.iconUrl,
              }}
              style={CheckoutStyle.mediumIcon}
            />
            <SnbText.B1>{selectedPaymentType?.name}</SnbText.B1>
          </View>
        </View>
        <View style={{ paddingTop: 16 }}>
          <SnbText.H4>Pilih Metode Pembayaran</SnbText.H4>
        </View>
        {!statePayment?.paymentChannelsList.loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {contentChannelGroups(statePayment.paymentChannelsList.data)}
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
      closeAction={close}
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
