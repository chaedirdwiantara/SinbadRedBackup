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
  onChangeQty: (val: number) => void;
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
export const AddToCartQuantityModifier: FC<AddToCartQuantityModifierProps> = ({
  orderQty,
  onChangeQty,
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

  const onPlusPres = (multipleQty: number) => {
    onChangeQty(orderQty + multipleQty);
  };

  const onMinusPres = (multipleQty: number) => {
    onChangeQty(orderQty - multipleQty);
  };

  /** => Main */
  return (
    <View style={AddToCartModalStyle.quantityModifierContainer}>
      <SnbText.C1 color={color.black60}>Jumlah/pcs</SnbText.C1>
      {dataStock && dataProductDetailCart && (
        <React.Fragment>
          {(dataStock.stock < 1000 || orderQty > dataStock.stock) && (
            <SnbText.B3 color={color.red50}>
              {`Tersisa ${dataStock.stock} ${dataProductDetailCart.unit}`}
            </SnbText.B3>
          )}

          <SnbNumberCounter
            value={orderQty}
            onChange={onChangeQty}
            onIncrease={() => onPlusPres(dataProductDetailCart.multipleQty)}
            onDecrease={() => onMinusPres(dataProductDetailCart.multipleQty)}
            minusDisabled={
              orderQty <= dataProductDetailCart.minQty ||
              orderQty - dataProductDetailCart.multipleQty <
                dataProductDetailCart.minQty
            }
            plusDisabled={
              orderQty >= dataStock.stock ||
              orderQty + dataProductDetailCart.multipleQty > dataStock.stock
            }
          />
        </React.Fragment>
      )}
      {isFromProductDetail && dataStockDetail && dataProductDetail && (
        <React.Fragment>
          {(dataStockDetail.stock <= 1000 ||
            orderQty > dataStockDetail.stock) && (
            <SnbText.B3 color={color.red50}>
              {`Tersisa ${dataStockDetail.stock} ${dataProductDetail.unit}`}
            </SnbText.B3>
          )}

          <SnbNumberCounter
            value={orderQty}
            onChange={onChangeQty}
            onIncrease={() => onPlusPres(dataProductDetail.multipleQty)}
            onDecrease={() => onMinusPres(dataProductDetail.multipleQty)}
            minusDisabled={
              orderQty <= dataProductDetail.minQty ||
              orderQty - dataProductDetail.multipleQty <
                dataProductDetail.minQty
            }
            plusDisabled={
              orderQty >= dataStockDetail?.stock ||
              orderQty + dataProductDetail.multipleQty > dataStockDetail.stock
            }
          />
        </React.Fragment>
      )}
    </View>
  );
};
