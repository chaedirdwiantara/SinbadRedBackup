/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import {
  usePaymentAction,
  handleTotalPrice,
  useCheckoutMaster,
  useExpiredTime,
} from '@screen/oms/functions';
import { totalPayment } from '../../functions/checkout';
import { contexts } from '@contexts';
/** === TYPE === */
import * as models from '@models';

interface CheckoutBottomViewProps {
  data: models.IInvoiceCheckout[];
  // openTCModal: () => void;
  // openErrorWarning: () => void;
  // closeErrorWarning: () => void;
  // checkExpiredTime: any;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  // openErrorWarning,
  // closeErrorWarning,
  // checkExpiredTime,
}) => {
  const sellers = totalPayment(data.sellers);

  /** === HOOK === */
  // const paymentAction = usePaymentAction();
  // const { checkoutMaster } = useCheckoutMaster();
  // const expiredTime = useExpiredTime();
  // const { dispatchPayment, statePayment } = React.useContext(
  //   contexts.PaymentContext,
  // );
  // const { stateCheckout } = React.useContext(contexts.CheckoutContext);
  // const loadingTCCreate = statePayment.paymentTCCreate?.loading;
  // const loadingTCDetail = statePayment.paymentTCDetail?.loading;
  // const loadingCreateOrders = stateCheckout.create?.loading;

  // /** => main */
  // const dataPostTC = {
  //   data: {
  //     orderParcels: data.map((invoiceGroup) => {
  //       return {
  //         invoiceGroupId: invoiceGroup.invoiceGroupId,
  //         paymentTypeId: invoiceGroup.paymentType?.id ?? null,
  //         paymentChannelId: invoiceGroup.paymentChannel?.id ?? null,
  //       };
  //     }),
  //   },
  // };

  // const pressButton = () => {
  //   const selectedInvoiceChannel = statePayment.invoiceChannelList.data;
  //   const totalCartInvoices = checkoutMaster.invoices;
  //   if (selectedInvoiceChannel.length === totalCartInvoices.length) {
  //     if (!checkExpiredTime()) {
  //       paymentAction.tCCreate(dispatchPayment, dataPostTC);
  //     } else {
  //       expiredTime.setOpen(true);
  //     }
  //   } else {
  //     openErrorWarning();
  //     setTimeout(() => {
  //       closeErrorWarning();
  //     }, 2000);
  //   }
  // };

  const content = () => {
    return (
      <View style={CheckoutStyle.bottomContentContainer}>
        <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
        <SnbText.H4 color={color.red50}>{sellers}</SnbText.H4>
      </View>
    );
  };

  return (
    <View style={CheckoutStyle.bottomContainer}>
      {content()}
      <SnbButton.Dynamic
        size="small"
        type={'primary'}
        // onPress={pressButton}
        title={'Pilih Pembayaran'}
        // loading={loadingTCCreate || loadingTCDetail || loadingCreateOrders}
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
