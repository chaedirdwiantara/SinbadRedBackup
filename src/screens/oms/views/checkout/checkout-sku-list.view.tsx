/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { FlatList, Image, View } from 'react-native';
import * as models from '@models';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === TYPE === */
export interface IProductCheckout {
  // urlImages: string;
}
export interface CheckoutSKUListViewProps {
  products: any;
  // products: IProductCheckout[];
  // openModalProduct: (data: models.ProductCheckout[]) => void;
}
/** === COMPONENT === */
export const CheckoutSKUListView: FC<CheckoutSKUListViewProps> = ({
  products,
  // openModalProduct,
}) => {
  /** === HOOK === */

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={products}
      renderItem={({ item }) => (
        <View style={CheckoutStyle.productsContainer}>
          <Image
            source={{ uri: item.productImageUrl }}
            style={CheckoutStyle.skuImage}
          />
          <View style={CheckoutStyle.productsDescription}>
            <SnbText.B4 color={color.black60}>{item.productName}</SnbText.B4>
            <SnbText.B4 color={color.black60}>
              {item.qty} {item.uomLabel}
            </SnbText.B4>
            <SnbText.B4 color={color.black100}>Rp {item.price}</SnbText.B4>
          </View>
        </View>
      )}
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
