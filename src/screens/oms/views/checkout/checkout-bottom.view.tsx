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
/** === TYPE === */
import * as models from '@models';

interface CheckoutBottomViewProps {
  data: models.IInvoiceCheckout[];
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({ data }) => {
  /** === HOOK === */
  const termsAndConditionModal = useTermsAndConditionsModal();
  const paymentAction = usePaymentAction();
  const { dispatchPayment } = React.useContext(contexts.PaymentContext);

  /** === FUNCTION === */
  /** => function total price */
  const handleTotal = () => {
    let total = 0;

    data.forEach((invoice) => {
      let subTotal = 0;
      if (invoice.totalPriceBeforeTax) {
        subTotal += invoice.totalPriceBeforeTax;
      }

      if (invoice.totalPriceAfterTax && invoice.totalPriceBeforeTax) {
        subTotal += invoice.totalPriceAfterTax - invoice.totalPriceBeforeTax;
      }

      if (invoice.totalPaymentFee) {
        subTotal += invoice.totalPaymentFee;
      }

      if (invoice.totalPromoSellerAndVoucher) {
        subTotal -= invoice.totalPromoSellerAndVoucher;
      }

      if (invoice.totalPromoPayment) {
        subTotal -= invoice.totalPromoPayment;
      }

      total += subTotal;
    });

    return toCurrency(total);
  };

  /** => main */
  const dataPostTC = {
    data: {
      orderParcels: data.map((invoiceGroup) => {
        return {
          invoiceGroupId: invoiceGroup.invoiceGroupId,
          paymentTypeId: invoiceGroup.paymentType?.id,
          paymentChannelId: invoiceGroup.paymentChannel?.id,
        };
      }),
    },
  };

  const content = () => {
    return (
      <View style={CheckoutStyle.bottomContentContainer}>
        <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
        <SnbText.H4 color={color.red50}>{handleTotal()}</SnbText.H4>
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
