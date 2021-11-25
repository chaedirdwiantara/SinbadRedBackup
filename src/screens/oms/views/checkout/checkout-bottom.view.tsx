/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import {
  useTermsAndConditionsModal,
  usePaymentAction,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === COMPONENT === */
export const CheckoutBottomView: FC = () => {
  /** === HOOK === */
  const termsAndConditionModal = useTermsAndConditionsModal();
  const paymentAction = usePaymentAction();
  const { dispatchPayment } = React.useContext(contexts.PaymentContext);

  /** => main */
  const dataPostTC = {
    data: {
      buyerId: 1234,
      orderParcels: [
        {
          invoiceGroupId: '234324234',
          paymentChannelId: 2,
          paymentTypeId: 2,
        },
      ],
    },
  };

  const content = () => {
    return (
      <View style={CheckoutStyle.bottomContentContainer}>
        <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
        <SnbText.H4 color={color.red50}>{toCurrency(990000)}</SnbText.H4>
      </View>
    );
  };
  return (
    <View style={{ height: 75 }}>
      <SnbButton.Content
        type={'primary'}
        onPress={() => {
          paymentAction.tCCreate(dispatchPayment, dataPostTC);
          termsAndConditionModal.setOpen(true);
        }}
        content={content()}
        title={'Buat Pesanan'}
      />
    </View>
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
