/** === IMPORT PACKAGES ===  */
import React, { FC, memo } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT ===  */
import { spacingV2 } from '@sinbad/react-native-sinbad-ui';
import { ProductGridCard } from '@core/components/ProductGridCard';
/** === IMPORT FUNCTION ===  */
import { isTab } from '@core/functions/global/device-data';
import { goToProductDetail } from '@core/functions/product';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === TYPE ===  */
interface GridLayoutCardProps {
  product: models.ProductList;
  index: number;
  onOrderPress: (item: models.ProductList) => void;
}
// var
const { spacing } = spacingV2;
/** === COMPONENT ===  */
const GridLayoutCard: FC<GridLayoutCardProps> = ({
  product,
  index,
  onOrderPress,
}) => {
  const imageKitWidth = isTab ? 300 : 250;
  return (
    <View
      key={index}
      style={{
        marginRight: index % 2 === 0 ? spacing.sm : spacing.lg,
        marginLeft: index % 2 === 0 ? spacing.lg : 0,
        marginBottom: spacing.lg,
        flex: 1,
      }}>
      <ProductGridCard
        name={product.name}
        imageUrl={`${product.thumbnail}?tr=w-${imageKitWidth}`}
        qtySoldLabel={
          product.qtySoldValue ? `Terjual ${product.qtySoldLabel}` : ''
        }
        priceAfterTax={product.priceAfterTax}
        hasBulkPrice={product.hasBulkPrice}
        isBundle={product.isBundle}
        isPromo={product.isPromo}
        isExclusive={product.isExclusive}
        onCardPress={() => {
          goToProductDetail(`${product.id}_${product.warehouseOriginId}`);
        }}
        withOrderButton={true}
        onOrderPress={() => onOrderPress(product)}
      />
    </View>
  );
};

export default memo(GridLayoutCard);
