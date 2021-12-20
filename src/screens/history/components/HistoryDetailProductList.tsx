/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SnbText, SnbIcon, color } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { ProductCard } from '@core/components/ProductCard';
/** === IMPORT FUNCTION === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../styles';
/** === TYPE === */
interface HistoryDetailProductListProps {
  title: string;
  products: Array<any>; // To be updated
  seeMore: boolean;
  toggleSeeMore: () => void;
}
/** === COMPONENT === */
export const HistoryDetailProductList: FC<HistoryDetailProductListProps> = ({
  title,
  products,
  seeMore,
  toggleSeeMore,
}) => {
  const displayedProducts = seeMore ? products.slice(0, 2) : products;

  return (
    <>
      <View style={HistoryDetailStyle.productListCardHeader}>
        <SnbText.B4>{title}</SnbText.B4>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {displayedProducts.map((product, productIndex) => (
          <ProductCard.Type1
            key={`${product.name}-${productIndex}`}
            name={product.name}
            imageSource={product.images}
            price={toCurrency(product.price)}
            qty={product.qty}
            originalQty={product.originalQty}
            uom={product.uom}
            total={toCurrency(product.total)}
            originalTotal={
              product.originalTotal
                ? toCurrency(product.originalTotal)
                : undefined
            }
          />
        ))}
        {products.length > 2 && (
          <TouchableWithoutFeedback onPress={toggleSeeMore}>
            <View style={HistoryDetailStyle.seeMoreButton}>
              <SnbIcon
                name={seeMore ? 'expand_more' : 'expand_less'}
                color={color.red50}
                size={20}
                style={{ marginRight: 8 }}
              />
              <SnbText.B3 color={color.red50}>
                {seeMore ? 'Lihat Lebih' : 'Lihat Ringkas'}
              </SnbText.B3>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};
