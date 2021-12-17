/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductNotAvailableView } from './product-not-available.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '../../styles';
import {
  IProductItemUpdateCart,
  ICartMasterProductNotAvailable,
} from '@models';
/** === TYPE ===  */
interface ProductEmptyStockProps {
  data: ICartMasterProductNotAvailable[];
  onRemoveProduct: (any: IProductItemUpdateCart) => void;
  sectionName: string;
}
/** == COMPONENT === */
export const ProductEmptyStockView: FC<ProductEmptyStockProps> = ({
  data,
  onRemoveProduct,
  sectionName,
}) => (
  <View style={ShoppingCartStyles.cardContainer} key={sectionName}>
    <View style={ShoppingCartStyles.topCardSlot}>
      <SnbText.B4>{sectionName}</SnbText.B4>
    </View>
    {data.map((product, productIndex) => (
      <ProductNotAvailableView
        key={productIndex.toString()}
        product={product}
        productLength={data.length}
        productIndex={productIndex}
        onRemoveProduct={onRemoveProduct}
      />
    ))}
  </View>
);
