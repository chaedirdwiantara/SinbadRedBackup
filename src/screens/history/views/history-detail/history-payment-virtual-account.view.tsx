import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { PaymentDetailSuccessProps } from '@model/history';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import SnbCardButtonType3 from '../../components/SnbCardButtonType3';
interface PaymentVAProps {
  data: PaymentDetailSuccessProps;
  onClick: () => void;
}

/** === COMPONENT === */
const HistoryPaymentVirtualAccount: FC<PaymentVAProps> = ({
  data,
  onClick,
}) => {
  /** Bank Icon */
  const renderBankIcon = () => {
    return (
      <View
        style={{
          alignContent: 'flex-start',
          marginRight: 16,
          alignSelf: 'center',
        }}>
        <Image
          source={{ uri: data?.paymentChannel?.icon }}
          style={{ height: 20, width: 60, marginRight: 10 }}
        />
      </View>
    );
  };
  /** Activate VA Button */
  const renderVAButton = () => {
    return (
      <View>
        <SnbButton.Single
          type="secondary"
          title="AKTIFKAN VIRTUAL ACCOUNT"
          onPress={() => console.log('VA Button pressed')}
        />
      </View>
    );
  };
  /** Card VA Number */
  const renderVANumber = () => {
    return (
      <>
        <View>
          <SnbCardButtonType3
            title={'Transfer ke no. Virtual Account'}
            subTitle1={data?.accountVaNo || ''}
            subTitle2={'a/n Sinbad Karya Perdagangan'}
            left={renderBankIcon}
            bottomText={'Salin no. Rek'}
            onPress={onClick}
          />
        </View>
      </>
    );
  };
  const renderContent = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <View style={{ marginBottom: 8 }} />
          {data?.accountVaNo ? renderVANumber() : renderVAButton()}
        </View>
      </>
    );
  };
  return <View>{renderContent()}</View>;
};

export default HistoryPaymentVirtualAccount;
