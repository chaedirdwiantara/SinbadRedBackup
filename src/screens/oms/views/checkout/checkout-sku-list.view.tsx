/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { SnbSKUList } from 'react-native-sinbad-ui';
import * as models from '@models';
/** === TYPE === */
export interface IProductCheckout {
  urlImages: string;
}
export interface CheckoutSKUListViewProps {
  products: IProductCheckout[];
  openModalProduct: (data: models.ProductCheckout[]) => void;
}
/** === COMPONENT === */
export const CheckoutSKUListView: FC<CheckoutSKUListViewProps> = ({
  products,
  openModalProduct,
}) => {
  /** === HOOK === */
  return (
    <SnbSKUList
      data={products}
      renderItem={({ item }: any) => {
        return (
          <TouchableOpacity
            onPress={() =>
              openModalProduct(products as models.ProductCheckout[])
            }>
            <Image
              source={{ uri: item.urlImages }}
              style={CheckoutStyle.skuImage}
            />
          </TouchableOpacity>
        );
      }}
      expandable
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
