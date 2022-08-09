// #COMPONENT DEPRECATED

/** === IMPORT PACKAGES === */
import React, { FC, memo, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
/** === IMPORT COMPONENT === */
import { ProductCard } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE === */
interface ProductListCardProps {
  testID: string;
  name: string;
  imageUrl: string;
  qtySoldLabel: string;
  priceAfterTax: number;
  hasBulkPrice: boolean;
  isExclusive?: boolean;
  onCardPress?: () => void;
  withOrderButton?: boolean;
  onOrderPress: () => void;
}

const ProductList: FC<ProductListCardProps> = (props) => {
  const badge = useMemo(() => {
    if (props.hasBulkPrice)
      return {
        title: 'Harga Grosir',
        type: 'information',
        iconName: 'cart',
      };
    if (props.isExclusive)
      return {
        title: 'Exclusive',
        type: 'warning',
        iconName: 'stars',
      };
    return undefined;
  }, [props.isExclusive, props.hasBulkPrice]);
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
      buttonText={props.withOrderButton ? 'Pesan' : undefined}
      onCardPress={props.onCardPress}
      onButtonPress={props.onOrderPress}
    />
  );
};

export const ProductListCard = memo(ProductList);
