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
  testID: string;
  product: models.ProductList;
  index: number;
  onOrderPress: (item: models.ProductList) => void;
  onCardPress: () => void;
}
// var
const { spacing } = spacingV2;
/** === COMPONENT ===  */
const GridLayoutCard: FC<GridLayoutCardProps> = ({
  testID,
  product,
  index,
  onOrderPress,
  onCardPress,
}) => {
  const imageKitWidth = isTab ? 300 : 250;
  return (
    <View
      key={index}
      style={{
        marginRight: index % 2 === 0 ? spacing.sm : spacing.lg,
        marginLeft: index % 2 === 0 ? spacing.lg : 0,
        marginBottom: spacing.lg,
      }}>
      <ProductGridCard
        {...product}
        testID={testID}
        name={product.name}
        imageUrl={`${product.thumbnail}?tr=w-${imageKitWidth}`}
        qtySoldLabel={
          product.qtySoldValue ? `Terjual ${product.qtySoldLabel}` : ''
        }
        priceAfterTax={product.priceAfterTax}
        hasBulkPrice={product.hasBulkPrice}
        isStockAvailable={product.isStockAvailable}
        isExclusive={product.isExclusive}
        onCardPress={() => {
          goToProductDetail({
            id: product.id,
            warehouseId: product.warehouseOriginId,
          });
          onCardPress();
        }}
        withOrderButton={true}
        onOrderPress={() => onOrderPress(product)}
      />
    </View>
  );
};

export default memo(GridLayoutCard);
