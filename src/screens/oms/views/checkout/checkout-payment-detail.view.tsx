/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
import { usePaymentDetailAccorrdion } from '../../functions/checkout';
/** === TYPE === */
import * as models from '@models';
export interface IPaymentDetail {
  name: string;
  value: number;
  type: string;
}

export interface CheckoutPaymentDetailViewProps {
  data: models.IInvoiceCheckout;
}

/** === COMPONENT === */
export const CheckoutPaymentDetailView: FC<CheckoutPaymentDetailViewProps> = ({
  data,
}) => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const isActive = paymentAccordion.active === 1;

  /** === FUNCTION === */
  /** => sub total function */
  const handleSubTotal = () => {
    let total = 0;
    if (data.totalPriceBeforeTax) {
      total += data.totalPriceBeforeTax;
    }

    if (data.totalPriceAfterTax && data.totalPriceBeforeTax) {
      total += data.totalPriceAfterTax - data.totalPriceBeforeTax;
    }

    if (data.totalPaymentFee) {
      total += data.totalPaymentFee;
    }

    if (data.totalPromoSellerAndVoucher) {
      total -= data.totalPromoSellerAndVoucher;
    }

    if (data.totalPromoPayment) {
      total -= data.totalPromoPayment;
    }

    return toCurrency(total);
  };
  return (
    <View>
      {isActive ? (
        <View style={{ marginLeft: 32 }}>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black100}>
              {`Total Barang ${data.totalProduct}`}
            </SnbText.B3>
            <SnbText.B3 color={color.black100}>
              {toCurrency(data.totalPriceBeforeTax)}
            </SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.green50}>Total Potongan Harga</SnbText.B3>
            <SnbText.B3 color={color.green50}>
              {toCurrency(data.totalPromoSellerAndVoucher ?? 0)}
            </SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black100}>{`PPN ${data.tax}%`}</SnbText.B3>
            <SnbText.B3 color={color.black100}>
              {toCurrency(data.totalPriceAfterTax - data.totalPriceBeforeTax)}
            </SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.green50}>Promo Pembayaran</SnbText.B3>
            <SnbText.B3 color={color.green50}>
              {toCurrency(data.totalPromoPayment ?? 0)}
            </SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black100}>Layanan Pembayaran</SnbText.B3>
            <SnbText.B3 color={color.black100}>
              {toCurrency(data.totalPaymentFee ?? 0)}
            </SnbText.B3>
          </View>
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity
        onPress={() => paymentAccordion.changeActive(1)}
        style={CheckoutStyle.detailExpandButton}>
        <View style={{ flexDirection: 'row' }}>
          <SnbIcon
            name={isActive ? 'expand_less' : 'expand_more'}
            size={24}
            color={color.black100}
          />
          <View style={{ marginLeft: 8 }}>
            <SnbText.H4>Sub Total</SnbText.H4>
          </View>
        </View>
        <SnbText.H4>{handleSubTotal()}</SnbText.H4>
      </TouchableOpacity>
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
