/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet, SnbListButtonType1 } from 'react-native-sinbad-ui';
import {
  usePaymentTypeModal,
  usePaymentChannelModal,
  usePaymentAction,
  useSelectedPaymentType,
} from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';

interface PaymentTypeModalProps {
  isOpen: boolean;
  close: () => void;
  openModalPaymentChannels: () => void;
}
/** === COMPONENT === */
export const ModalPaymentType: FC<PaymentTypeModalProps> = ({
  isOpen,
  close,
  openModalPaymentChannels,
}) => {
  /** === HOOK === */
  const paymentCHannelsModal = usePaymentChannelModal();
  const paymentAction = usePaymentAction();
  const paymentType = useSelectedPaymentType();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );

  const invoiceGroupId = '123';
  const totalCartParcel = 3456;
  const paymentTypeId = 1;

  const content = () => {
    return !statePayment?.paymentTypesList?.loading ? (
      <View>
        {statePayment?.paymentTypesList?.data.map(
          (item: any, index: number) => {
            const dataPaymentType = {
              id: item.id,
              name: item.name,
              iconUrl: item.iconUrl,
            };
            return (
              <SnbListButtonType1
                key={index}
                image={item.iconUrl}
                title={item.name}
                description={item.description}
                type={'one'}
                badge={item.promoPaymentAvailable ? true : false}
                textBadge={item.promoPaymentAvailable ? 'Promo' : undefined}
                onPress={openModalPaymentChannels}
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
