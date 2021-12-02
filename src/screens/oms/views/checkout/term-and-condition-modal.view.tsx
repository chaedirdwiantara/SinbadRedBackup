/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import Html from '@core/components/Html';
import {
  SnbText,
  SnbDivider,
  SnbButton,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import { goToCheckoutSuccess } from '../../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { IPaymentChannel, IPaymentType } from '@model/oms';

interface ModalTermAndCondition {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalTermAndCondition: FC<ModalTermAndCondition> = ({
  isOpen,
  close,
}) => {
  /** === HOOK === */
  const { statePayment } = React.useContext(contexts.PaymentContext);

  const paymentTypesTermsConditions = () => {
    return statePayment?.paymentTCDetail?.data?.paymentTypes?.map(
      (item: IPaymentType, index: number) => {
        return (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.H4>{item.name}</SnbText.H4>
            </View>
            <Html value={item.term} fontSize={12} />
          </View>
        );
      },
    );
  };
  const paymentChannelTermsConditions = () => {
    return statePayment?.paymentTCDetail?.data?.paymentChannels?.map(
      (item: IPaymentChannel, index: number) => {
        return (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.H4>{item.name}</SnbText.H4>
            </View>
            <Html value={item.term} fontSize={12} />
          </View>
        );
      },
    );
  };
  const button = () => {
    return (
      <View>
        <SnbButton.Single
          title={'Buat Pesanan'}
          disabled={false}
          type={'primary'}
          onPress={() => {
            close();
            goToCheckoutSuccess();
          }}
        />
      </View>
    );
  };
  const content = () => {
    return (
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <SnbText.C1>
            Dengan ini saya menyetujui Syarat & Ketentuan yang berlaku:
          </SnbText.C1>
        </View>
        {paymentTypesTermsConditions()}
        <SnbDivider style={{ marginBottom: 12 }} />
        {paymentChannelTermsConditions()}
        {button()}
      </ScrollView>
    );
  };
  return (
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      title={'Syarat & Ketentuan'}
      closeAction={close}
      actionIcon={'close'}
    />
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
