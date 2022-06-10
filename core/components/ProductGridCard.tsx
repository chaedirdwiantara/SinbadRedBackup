// #COMPONENT DEPRECATED
/** === IMPORT PACKAGES ===  */
import React, { FC, useMemo, memo } from 'react';
/** === IMPORT COMPONENT === */
import { ProductCard } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT FUNCTION === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPES === */
interface ProductGridCardProps {
  name: string;
  imageUrl: string;
  priceAfterTax: number;
  hasBulkPrice: boolean;
  qtySoldLabel: string;
  isExclusive?: boolean;
  onCardPress?: () => void;
  withOrderButton?: boolean;
  onOrderPress?: () => void;
}

const ProductGrid: FC<ProductGridCardProps> = (props) => {
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
    <ProductCard.Grid
      testID={`list-product-${props.name}`}
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

export const ProductGridCard = memo(ProductGrid);
