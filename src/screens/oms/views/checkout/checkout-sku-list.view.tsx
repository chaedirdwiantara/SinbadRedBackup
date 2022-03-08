/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { SnbSKUList } from 'react-native-sinbad-ui';
import * as models from '@models';
/** === TYPE === */

/** === DUMMY === */
// const products = [
//   {
//     urlImages:
//       'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/15515/image_1617790108395.png',
//   },
// ];
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
  console.log(products, 'products');

  return (
    // <SnbSKUList
    //   data={products}
    //   renderItem={({ item }: any) => {
    //     return (
    //       <TouchableOpacity
    //         onPress={() =>
    //           // openModalProduct(products as models.ProductCheckout[])
    //           {}
    //         }>
    //         <Image
    //           // source={{ uri: item.urlImages }}
    //           source={item.urlImages}
    //           style={CheckoutStyle.skuImage}
    //         />
    //       </TouchableOpacity>
    //     );
    //   }}
    //   expandable
    // />
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={products}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            // openModalProduct(products as models.ProductCheckout[])
            {}
          }>
          <Image
            // source={{ uri: item.urlImages }}
            source={{ uri: item.productImageUrl }}
            style={CheckoutStyle.skuImage}
          />
        </TouchableOpacity>
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
