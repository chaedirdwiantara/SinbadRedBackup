/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import {
  useTermsAndConditionsModal,
  usePaymentAction,
  handleTotalPrice,
  useCheckoutMaster,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === TYPE === */
import * as models from '@models';

interface CheckoutBottomViewProps {
  data: models.IInvoiceCheckout[];
  openTCModal: () => void;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  openTCModal,
}) => {
  /** === HOOK === */
  const paymentAction = usePaymentAction();
  const { dispatchPayment } = React.useContext(contexts.PaymentContext);

  /** => main */
  const dataPostTC = {
    data: {
      orderParcels: data.map((invoiceGroup) => {
        return {
          invoiceGroupId: invoiceGroup.invoiceGroupId,
          paymentTypeId: invoiceGroup.paymentType?.id ?? null,
          paymentChannelId: invoiceGroup.paymentChannel?.id ?? null,
        };
      }),
    },
  };

  const pressButton = () => {
    const checker = (x) =>
      x.filter((e) => e.paymentTypeDetail && e.paymentMethodDetail).length ===
      x.length;
    openTCModal();
    paymentAction.tCCreate(dispatchPayment, dataPostTC);
  };
  const content = () => {
    return (
      <View style={CheckoutStyle.bottomContentContainer}>
        <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
        <SnbText.H4 color={color.red50}>{handleTotalPrice(data)}</SnbText.H4>
      </View>
    );
  };
  return (
    <View style={{ height: 75 }}>
      <SnbButton.Content
        type={'primary'}
        onPress={pressButton}
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
