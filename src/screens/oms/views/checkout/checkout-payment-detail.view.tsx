/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText2, colorV2, SnbIcon } from 'react-native-sinbad-ui';
import {
  usePaymentDetailAccorrdion,
  totalBarangPrice,
} from '../../functions/checkout';
/** === TYPE === */
import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { testProps } from '@core/functions/global/test-props';

export interface CheckoutPaymentDetailViewProps {
  products: models.CheckoutCartProduct[];
  totalQty: number;
  testID: string;
}

/** === COMPONENT === */
export const CheckoutPaymentDetailView: FC<CheckoutPaymentDetailViewProps> = ({
  products,
  totalQty,
  testID,
}) => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const isActive = paymentAccordion.active === 1;
  const deliveryFee = 0;
  const totalProductsPrice = totalBarangPrice(products);

  return (
    <View>
      {isActive ? (
        <View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText2.Paragraph.Default
              testID={`totalProductsQty.detail.${testID}`}
              color={colorV2.textColor.secondary}>
              {`Total Barang (${totalQty})`}
            </SnbText2.Paragraph.Default>
            <SnbText2.Paragraph.Default
              testID={`totalProductsPrice.detail.${testID}`}
              color={colorV2.textColor.secondary}>
              {totalProductsPrice}
            </SnbText2.Paragraph.Default>
          </View>
          <View style={CheckoutStyle.detailItemContainer}>
            <SnbText2.Paragraph.Default
              testID={`deliveryLabel.detail.${testID}`}
              color={colorV2.textColor.secondary}>
              Ongkos Kirim
            </SnbText2.Paragraph.Default>
            <SnbText2.Paragraph.Default
              testID={`deliveryValue.detail.${testID}`}
              color={colorV2.textColor.secondary}>
              {toCurrency(deliveryFee, { withFraction: false })}
            </SnbText2.Paragraph.Default>
          </View>
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity
        testID={`btn-toggleAccordion.detail.${testID}`}
        onPress={() => paymentAccordion.changeActive(1)}
        style={CheckoutStyle.detailExpandButton}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SnbIcon
            {...testProps(`icon.btn-toggleAccordion.detail.${testID}`)}
            name={isActive ? 'expand_less' : 'expand_more'}
            size={24}
            color={colorV2.textColor.default}
          />
          <View style={{ marginLeft: 8 }}>
            <SnbText2.Headline.Small
              testID={`label.btn-toggleAccordion.detail.${testID}`}
              color={colorV2.textColor.default}>
              Sub Total
            </SnbText2.Headline.Small>
          </View>
        </View>
        <SnbText2.Headline.Small
          testID={`value.btn-toggleAccordion.detail.${testID}`}
          color={colorV2.textColor.default}>
          {totalProductsPrice}
        </SnbText2.Headline.Small>
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
