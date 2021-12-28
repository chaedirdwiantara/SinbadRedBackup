import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { PaymentDetailSuccessProps } from '@model/history';
import SnbCardButtonType3 from '../../components/SnbCardButtonType3';
import SnbCardButtonType4 from '@screen/history/components/SnbCardButtonType4';
import {
  BillingStatus,
  PaymentType,
  ChannelType,
  OrderStatus,
} from '@screen/history/functions/data';
import { color, styles } from '@sinbad/react-native-sinbad-ui';
import { useActivateVa } from '../../functions';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import moment from 'moment';
interface PaymentVAProps {
  data: PaymentDetailSuccessProps | null;
  statusOrder: string;
  onClick: () => void;
}

/** === COMPONENT === */
const HistoryPaymentVirtualAccount: FC<PaymentVAProps> = ({
  data,
  onClick,
  statusOrder,
}) => {
  const { dispatchHistory, stateHistory } = useHistoryContext();
  const activateVa = useActivateVa();

  /** === FUNCTIONS ===*/
  const onClickButton = () => {
    activateVa.update(dispatchHistory, data?.id!);
  };
  /** === VIEW === */
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
        <SnbCardButtonType4
          title="Transfer ke no. Virtual Account :"
          titleAlign="left"
          buttonText="AKTIFKAN VIRTUAL ACCOUNT"
          onPress={() => onClickButton()}
          loading={stateHistory.activateVa.loading}
          disabled={
            stateHistory.activateVa.loading &&
            data?.paymentType.id === PaymentType.PAY_LATER &&
            statusOrder !== OrderStatus.DELIVERED
              ? true
              : false
          }
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
            subTitle1={data?.accountVaNo || ''}
            subTitle2={'a/n Sinbad Karya Perdagangan'}
            left={renderBankIcon}
            bottomText={'Salin no. Rek'}
            title="Transfer ke no. Virtual Account :"
            onPress={onClick}
          />
        </View>
      </>
    );
  };
  const renderContent = () => {
    const dataPayment = data;
    const billingStatus = dataPayment?.billingStatus;
    const paymentType = dataPayment?.paymentType;
    const paymentChannel = dataPayment?.paymentChannel;
    const isNotExpired =
      moment.utc(new Date()).local() <
      moment.utc(dataPayment?.expiredPaymentTime);
    return (
      <>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <View style={{ marginBottom: 8 }} />
          {((paymentType?.id === PaymentType.PAY_NOW &&
            paymentChannel?.id !== ChannelType.CASH &&
            dataPayment?.accountVaNo) ||
            (paymentType?.id === PaymentType.PAY_LATER &&
              paymentChannel?.id !== ChannelType.CASH &&
              dataPayment?.expiredPaymentTime)) &&
          (billingStatus === BillingStatus.PENDING ||
            billingStatus === BillingStatus.OVERDUE) &&
          isNotExpired ? (
            renderVANumber()
          ) : paymentChannel?.id !== 1 &&
            !isNotExpired &&
            (billingStatus === BillingStatus.PENDING ||
              billingStatus === BillingStatus.OVERDUE) ? (
            renderVAButton()
          ) : (
            <View />
          )}
        </View>
        <View style={{ height: 10, backgroundColor: color.black10 }} />
      </>
    );
  };
  return <View style={styles.shadowForBox10}>{renderContent()}</View>;
};

export default HistoryPaymentVirtualAccount;
