import React from 'react';
import { View } from 'react-native';
import { PaymentDetailSuccessProps } from '@model/history';
import { SnbText, SnbButton } from '@sinbad/react-native-sinbad-ui';

interface PaymentVAProps {
  data: PaymentDetailSuccessProps;
  dataOrder: {};
}

/** === COMPONENT === */
const HistoryPaymentVirtualAccount: FC<PaymentVAProps> = ({
  data,
  dataOrder,
}) => {
  /** Activate VA Button */
  const renderVAButton = () => {
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
        <SnbText.B4>Transfer ke no. Virtual Account : </SnbText.B4>
        <SnbButton.Single
          type="secondary"
          title="AKTIFKAN VIRTUAL ACCOUNT"
          onPress={() => console.log('Single')}
        />
      </View>
    );
  };
  const renderContent = () => {
    return <>{renderVAButton()}</>;
  };
  return (
    <View>
      <SnbText.B1>VA INFORMATION</SnbText.B1>
      {renderContent()}
    </View>
  );
};

export default HistoryPaymentVirtualAccount;
