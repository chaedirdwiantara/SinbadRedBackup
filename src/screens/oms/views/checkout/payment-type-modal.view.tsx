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
/** === COMPONENT === */
export const ModalPaymentType: FC = () => {
  /** === HOOK === */
  const paymentTypesModal = usePaymentTypeModal();
  const paymentChannelsModal = usePaymentChannelModal();
  const paymentAction = usePaymentAction();
  const paymentType = useSelectedPaymentType();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );

  const invoiceGroupId = 'abcdef12345';
  const totalCartParcel = 100000;
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
                onPress={() => {
                  paymentAction.channelsList(
                    dispatchPayment,
                    invoiceGroupId,
                    totalCartParcel,
                    paymentTypeId,
                  );
                  paymentTypesModal.setOpen(false);
                  paymentChannelsModal.setOpen(true);
                  paymentType.setSelectedPaymentType(dataPaymentType);
                }}
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
      open={paymentTypesModal.isOpen}
      content={content()}
      title={'Tipe Pembayaran'}
      closeAction={() => {
        paymentTypesModal.setOpen(false);
      }}
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
