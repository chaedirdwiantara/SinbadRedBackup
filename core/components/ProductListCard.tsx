// #COMPONENT DEPRECATED

/** === IMPORT PACKAGES === */
import React, { FC, memo } from 'react';
/** === IMPORT COMPONENT === */
import { ProductCard } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
import { useProductCardUtil } from '@core/functions/product';
/** === TYPE === */
import * as models from '@models';

const ProductList: FC<models.ProductCard> = (props) => {
  // util helper value
  const { badge, buttonOutline, outOfStock } = useProductCardUtil(props);

  return (
    <ProductCard.List
      testID={`list-product-${props.name}.${props.testID}`}
      name={props.name}
      imageUrl={props.imageUrl}
      currentPrice={toCurrency(props.priceAfterTax, {
        withFraction: false,
      })}
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

export const ProductListCard = memo(ProductList);
