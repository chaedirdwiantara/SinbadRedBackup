import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { PaymentDetailSuccessProps } from '@model/history';
import SnbCardButtonType3 from '../../components/SnbCardButtonType3';
import SnbCardButtonType4 from '@screen/history/components/SnbCardButtonType4';
import {
  CASH,
  OVERDUE,
  PAY_LATER,
  PAY_NOW,
  PENDING,
} from '@screen/history/constant/history.constant';
import { useActivateVa } from '../../functions';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import moment from 'moment';
interface PaymentVAProps {
  data: PaymentDetailSuccessProps | null;
  onClick: () => void;
}

/** === COMPONENT === */
const HistoryPaymentVirtualAccount: FC<PaymentVAProps> = ({
  data,
  onClick,
}) => {
  const { dispatchHistory, stateHistory } = useHistoryContext();
  const activateVa = useActivateVa();

  /** === FUNCTIONS ===*/
  const onClickButton = () => {
    activateVa.update(dispatchHistory, '1427331');
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
          disabled={stateHistory.activateVa.loading}
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
    console.log(isNotExpired, 'is not expired');
    console.log(moment.utc(new Date()).local().format('DDMMYY hh:mm:ss'));
    console.log(
      moment.utc(dataPayment?.expiredPaymentTime).format('DDMMYY hh:mm:ss'),
    );

    return (
      <>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <View style={{ marginBottom: 8 }} />
          {((paymentType?.id === PAY_NOW &&
            paymentChannel?.id !== CASH &&
            dataPayment?.accountVaNo) ||
            (paymentType?.id === PAY_LATER &&
              paymentChannel?.id !== CASH &&
              dataPayment?.expiredPaymentTime)) &&
          (billingStatus === PENDING || billingStatus === OVERDUE) &&
          isNotExpired ? (
            renderVANumber()
          ) : paymentChannel?.id !== 1 &&
            !isNotExpired &&
            (billingStatus === PENDING || billingStatus === OVERDUE) ? (
            renderVAButton()
          ) : (
            <View />
          )}
        </View>
      </>
    );
  };
  return <View>{renderContent()}</View>;
};

export default HistoryPaymentVirtualAccount;
