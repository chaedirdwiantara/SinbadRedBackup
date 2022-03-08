/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
import {
  usePaymentDetailAccorrdion,
  handleSubTotalPrice,
  calculateTax,
} from '../../functions/checkout';
/** === TYPE === */
import * as models from '@models';
export interface IPaymentDetail {}

// /** === DUMMY === */
// const data = {
//   totalProduct: 5,
//   totalPriceBeforeTax: 150000,
//   totalPromoSellerAndVoucher: 90,
//   tax: 20,
//   totalPromoPayment: 120000,
//   totalFee: 120000,
// };

export interface CheckoutPaymentDetailViewProps {
  // data: models.IInvoiceCheckout;
  products: any;
}

/** === COMPONENT === */
export const CheckoutPaymentDetailView: FC<CheckoutPaymentDetailViewProps> = ({
  // data,
  products,
}) => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const isActive = paymentAccordion.active === 1;
  const deliveryFee = 0;

  const totalBarangPrice = () => {
    let sum = 0;
    for (var i = 0; i < products.length; i++) {
      sum = sum + products[i].qty * products[i].price;
    }
    return sum;
  };

  const subTotalQty = () => {
    let sum = 0;
    for (var i = 0; i < products.length; i++) {
      sum = sum + products[i].qty;
    }
    return sum;
  };

  return (
    <View>
      {isActive ? (
        <View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black60}>
              {`Total Barang (${subTotalQty()})`}
            </SnbText.B3>
            <SnbText.B3 color={color.black60}>
              {/* {toCurrency(products.totalPriceBeforeTax, { withFraction: false })} */}
              {`Rp ${totalBarangPrice()}`}
            </SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black60}>Total Pengiriman</SnbText.B3>
            <SnbText.B3 color={color.green60}>
              {/* {toCurrency(products.totalPriceBeforeTax, {
                withFraction: false,
              })} */}
              Rp. {deliveryFee}
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
        <SnbText.H4>
          {/* {handleSubTotalPrice(products, {
            withFraction: false,
          })} */}
          {totalBarangPrice() + deliveryFee}
        </SnbText.H4>
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
