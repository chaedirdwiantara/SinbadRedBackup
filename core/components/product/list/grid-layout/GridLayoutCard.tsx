/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT ===  */
import { ProductGridCard } from '@core/components/ProductGridCard';
/** === IMPORT FUNCTION ===  */
import { goToProductDetail } from '@core/functions/product';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === TYPE ===  */
interface GridLayoutCardProps {
  product: models.ProductList;
  index: number;
  onOrderPress: (item: models.ProductList) => void;
}
/** === COMPONENT ===  */
const GridLayoutCard: FC<GridLayoutCardProps> = ({
  product,
  index,
  onOrderPress,
}) => (
  <View
    key={index}
    style={{
      marginRight: index % 2 === 0 ? 8 : 16,
      marginLeft: index % 2 === 0 ? 16 : 0,
      marginBottom: 4,
    }}>
    <ProductGridCard
      flexOne={true}
      name={product.name}
      imageUrl={product.thumbnail ?? product.image}
      price={product.currentPrice ?? 0}
      isBundle={product.isBundle}
      isPromo={product.isPromo}
      isExclusive={product.isExclusive}
      onCardPress={() => {
        goToProductDetail(product.id);
      }}
      withOrderButton={true}
      onOrderPress={() => onOrderPress(product)}
    />
  </View>
);

export default GridLayoutCard;
