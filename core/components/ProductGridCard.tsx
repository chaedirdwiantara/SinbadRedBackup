// #COMPONENT DEPRECATED
/** === IMPORT PACKAGES ===  */
import React, { FC, memo } from 'react';
/** === IMPORT COMPONENT === */
import { ProductCard } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT FUNCTION === */
import { toCurrency } from '@core/functions/global/currency-format';
import { useProductCardUtil } from '@core/functions/product';
/** === TYPES === */
import * as models from '@models';

const ProductGrid: FC<models.ProductCard> = (props) => {
  const { badge, buttonOutline, outOfStock } = useProductCardUtil(props);

  return (
    <ProductCard.Grid
      testID={`grid-product-${props.name}.${props.testID}`}
      name={props.name}
      imageUrl={props.imageUrl}
      currentPrice={toCurrency(props.priceAfterTax, {
        withFraction: false,
      })}
      type="normal"
      soldBy={props.qtySoldLabel}
      badgeProps={badge}
      outOfStock={outOfStock}
      buttonOutline={buttonOutline}
      buttonText={props.withOrderButton ? 'Pesan' : undefined}
      onCardPress={props.onCardPress}
      onButtonPress={props.onOrderPress}
    />
  );
};

export const ProductGridCard = memo(ProductGrid);
