/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton, styles } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { toCurrency } from '@core/functions/global/currency-format';
// import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
/** === TYPE ===  */
interface AddToCartFooterProps {
  onAddToCartPress: () => void;
  orderQty: number;
  disabled: boolean;
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
export const AddToCartFooter: FC<AddToCartFooterProps> = ({
  onAddToCartPress,
  orderQty,
  disabled,
  isFromProductDetail,
}) => {
  /** === HOOKS ===  */
  const {
    stateProduct: {
      detail: { data: dataProductDetail },
      cart: { data: dataProductDetailCart },
    },
  } = useProductContext();
  // const {
  //   stateShopingCart: {
  //     create: { loading: addToCartLoading },
  //   },
  // } = useShopingCartContext();
  const {
    stateStock: {
      validation: { error: errorStock },
      detail: { error: errorStockDetail },
    },
  } = useStockContext();

  return (
    <View style={[AddToCartModalStyle.footer, styles.shadowStyle]}>
      <View style={{ marginRight: 16 }}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <SnbText.B3>Total: </SnbText.B3>
          {isFromProductDetail ? (
            <SnbText.B4 color={color.red50}>
              {toCurrency((dataProductDetail?.currentPrice ?? 0) * orderQty, {
                withFraction: false,
              })}
            </SnbText.B4>
          ) : (
            <SnbText.B4 color={color.red50}>
              {toCurrency(
                (dataProductDetailCart?.currentPrice ?? 0) * orderQty,
                {
                  withFraction: false,
                },
              )}
            </SnbText.B4>
          )}
        </View>
        <SnbText.C1 color={color.yellow40}>Belum termasuk PPN 10%</SnbText.C1>
      </View>
      {isFromProductDetail ? (
        <SnbButton.Dynamic
          // loading={addToCartLoading}
          disabled={disabled}
          size="small"
          type="primary"
          title={errorStockDetail ? 'Stock Habis' : 'Tambah ke Keranjang'}
          radius={6}
          onPress={onAddToCartPress}
        />
      ) : (
        <SnbButton.Dynamic
          // loading={addToCartLoading}
          disabled={disabled}
          size="small"
          type="primary"
          title={errorStock ? 'Stock Habis' : 'Tambah ke Keranjang'}
          radius={6}
          onPress={onAddToCartPress}
        />
      )}
    </View>
  );
};
