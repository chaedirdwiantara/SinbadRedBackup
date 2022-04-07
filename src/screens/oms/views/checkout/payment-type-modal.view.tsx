/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet, SnbListButtonType1 } from 'react-native-sinbad-ui';
import {
  usePaymentChannelsData,
  usePaymentAction,
} from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';
import * as models from '@models';

interface PaymentTypeModalProps {
  isOpen: boolean;
  close: () => void;
  openModalPaymentChannels: (item: any) => void;
}
/** === COMPONENT === */
export const ModalPaymentType: FC<PaymentTypeModalProps> = ({
  isOpen,
  close,
  openModalPaymentChannels,
}) => {
  /** === HOOK === */
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const paymentChannels = usePaymentChannelsData();
  const paymentAction = usePaymentAction();
  /** handle on select payment type */
  const selectPaymentType = (data: models.IPaymentTypesList) => {
    const dataUpdatePaymentType = {
      id: data.id,
      name: data.name,
      iconUrl: data.iconUrl,
    };
    paymentChannels.setSelectedPaymentType(dataUpdatePaymentType);
    openModalPaymentChannels(data);
  };
  /** handle close payment type modal */
  const closePaymentType = () => {
    close();
    paymentAction.resetTypesList(dispatchPayment);
  };
  const content = () => {
    return !statePayment?.paymentTypesList?.loading ? (
      <View>
        {statePayment?.paymentTypesList?.data.map(
          (item: any, index: number) => {
            return (
              <SnbListButtonType1
                key={index}
                image={item.iconUrl}
                title={item.name}
                description={item.description}
                type={'one'}
                badge={item.promoPaymentAvailable ? true : false}
                textBadge={item.promoPaymentAvailable ? 'Promo' : undefined}
                onPress={() => selectPaymentType(item)}
                disabled={!item.availableStatus}
              />
            );
          },
        )}
      </View>
    ) : (
      <View style={{ height: '30%', marginTop: 100 }}>
        <LoadingPage />
      </View>
    );
  };

  return (
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      title={'Tipe Pembayaran'}
      closeAction={() => closePaymentType()}
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
