/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbNumberCounter } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
/** === TYPE ===  */
interface AddToCartQuantityModifierProps {
  orderQty: number;
  increaseOrderQty: () => void;
  decreaseOrderQty: () => void;
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
export const AddToCartQuantityModifier: FC<AddToCartQuantityModifierProps> = ({
  orderQty,
  increaseOrderQty,
  decreaseOrderQty,
  isFromProductDetail,
}) => {
  /** === HOOKS ===  */
  const {
    stateProduct: {
      detail: { data: dataProductDetail },
      cart: { data: dataProductDetailCart },
    },
  } = useProductContext();
  const {
    stateStock: {
      validation: { data: dataStock },
      detail: { data: dataStockDetail },
    },
  } = useStockContext();
  /** => Main */
  return (
    <View style={AddToCartModalStyle.quantityModifierContainer}>
      <SnbText.C1 color={color.black60}>Jumlah/pcs</SnbText.C1>
      {dataStock && dataProductDetailCart && (
        <SnbNumberCounter
          value={orderQty}
          onIncrease={increaseOrderQty}
          onDecrease={decreaseOrderQty}
          minusDisabled={orderQty <= dataProductDetailCart?.minQty}
          plusDisabled={orderQty >= dataStock?.stock}
        />
      )}
      {isFromProductDetail && dataStockDetail && dataProductDetail && (
        <SnbNumberCounter
          value={orderQty}
          onIncrease={increaseOrderQty}
          onDecrease={decreaseOrderQty}
          minusDisabled={orderQty <= dataProductDetail?.minQty}
          plusDisabled={orderQty >= dataStockDetail?.stock}
        />
      )}
    </View>
  );
};
