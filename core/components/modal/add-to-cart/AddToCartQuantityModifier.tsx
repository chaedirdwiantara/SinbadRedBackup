/** === IMPORT PACKAGES ===  */
import React, { FC, Dispatch, SetStateAction } from 'react';
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
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  isFocus: boolean;
}
/** === COMPONENT ===  */
export const AddToCartQuantityModifier: FC<AddToCartQuantityModifierProps> = ({
  orderQty,
  onChangeQty,
  isFromProductDetail,
  setIsFocus,
  isFocus,
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

  const handleBlur = (minQty: number, stock: number) => {
    console.log('[lblur]: ', minQty, stock, isFocus);
    if (orderQty < minQty) {
      onChangeQty(minQty);
    } else if (orderQty > stock) {
      onChangeQty(stock);
    }
    setIsFocus(false);
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
            onBlur={() =>
              handleBlur(dataProductDetailCart.minQty, dataStock.stock)
            }
            onFocus={() => setIsFocus(true)}
            onIncrease={() => onPlusPres(dataProductDetailCart.multipleQty)}
            onDecrease={() => onMinusPres(dataProductDetailCart.multipleQty)}
            minusDisabled={
              isFocus ||
              orderQty <= dataProductDetailCart.minQty ||
              orderQty - dataProductDetailCart.multipleQty <
                dataProductDetailCart.minQty
            }
            plusDisabled={
              isFocus ||
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
            onBlur={() =>
              handleBlur(dataProductDetail.minQty, dataStockDetail.stock)
            }
            onFocus={() => setIsFocus(true)}
            onIncrease={() => onPlusPres(dataProductDetail.multipleQty)}
            onDecrease={() => onMinusPres(dataProductDetail.multipleQty)}
            minusDisabled={
              orderQty <= dataProductDetail.minQty ||
              orderQty - dataProductDetail.multipleQty <
                dataProductDetail.minQty ||
              isFocus
            }
            plusDisabled={
              orderQty >= dataStockDetail?.stock ||
              orderQty + dataProductDetail.multipleQty >
                dataStockDetail.stock ||
              isFocus
            }
          />
        </React.Fragment>
      )}
    </View>
  );
};
