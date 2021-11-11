/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbIcon, SnbBadge, color } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION ===  */
import { goBack, goToShoppingCart } from '@screen/product/functions';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === TYPE ===  */
interface ProductDetailHeaderProps {
  cartBadge: number;
}
/** === COMPONENT ===  */
export const ProductDetailHeader: FC<ProductDetailHeaderProps> = ({
  cartBadge,
}) => (
  <View style={ProductDetailStyle.headerNavigationContainer}>
    <TouchableOpacity
      onPress={goBack}
      style={ProductDetailStyle.navigationButton}>
      <SnbIcon name="arrow_back" size={24} color={color.white} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={goToShoppingCart}
      style={ProductDetailStyle.navigationButton}>
      <View style={ProductDetailStyle.cartBadge}>
        <SnbBadge.Hint color="red" value={cartBadge} />
      </View>
      <SnbIcon name="cart" size={24} color={color.white} />
    </TouchableOpacity>
  </View>
);
