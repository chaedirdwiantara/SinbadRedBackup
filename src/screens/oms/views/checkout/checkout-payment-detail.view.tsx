/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
import {
  usePaymentDetailAccorrdion,
  totalBarangPrice,
  subTotalQty,
} from '../../functions/checkout';
/** === TYPE === */
import * as models from '@models';

export interface CheckoutPaymentDetailViewProps {
  products: models.CheckoutCartProduct[];
}

/** === COMPONENT === */
export const CheckoutPaymentDetailView: FC<CheckoutPaymentDetailViewProps> = ({
  products,
}) => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const isActive = paymentAccordion.active === 1;
  const deliveryFee = 0;
  const totalProductsPrice = totalBarangPrice(products);
  const subQty = subTotalQty(products);

  return (
    <View>
      {isActive ? (
        <View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black60}>
              {`Total Barang (${subQty})`}
            </SnbText.B3>
            <SnbText.B3 color={color.black60}>{totalProductsPrice}</SnbText.B3>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText.B3 color={color.black60}>Total Pengiriman</SnbText.B3>
            <SnbText.B3 color={color.green60}>Rp. {deliveryFee}</SnbText.B3>
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
        <SnbText.H4>{totalProductsPrice}</SnbText.H4>
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
