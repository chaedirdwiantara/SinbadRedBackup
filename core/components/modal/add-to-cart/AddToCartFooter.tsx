/** === IMPORT PACKAGES ===  */
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, styles } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
/** === TYPE ===  */
interface AddToCartFooterProps {
  onAddToCartPress: () => void;
  orderQty: number;
  disabled: boolean;
  isFromProductDetail?: boolean;
  bulkPriceAterTax: number;
}
/** === COMPONENT ===  */
export const AddToCartFooter: FC<AddToCartFooterProps> = ({
  onAddToCartPress,
  orderQty,
  disabled,
  isFromProductDetail,
  bulkPriceAterTax,
}) => {
  /** === HOOKS ===  */
  const {
    stateStock: {
      validation: { error: errorStock },
      detail: { error: errorStockDetail },
    },
  } = useStockContext();

  const totalPrice = useMemo(
    () => bulkPriceAterTax * orderQty,
    [bulkPriceAterTax, orderQty],
  );

  return (
    <View style={[AddToCartModalStyle.footer, styles.shadowStyle]}>
      <View style={{ marginRight: 16 }}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <SnbText.B4>
            {toCurrency(totalPrice, {
              withFraction: false,
            })}
          </SnbText.B4>
        </View>
      </View>
      {isFromProductDetail ? (
        <SnbButton.Dynamic
          disabled={disabled}
          size="small"
          type="primary"
          title={errorStockDetail ? 'Stock Habis' : 'Tambah ke Keranjang'}
          radius={6}
          onPress={onAddToCartPress}
        />
      ) : (
        <SnbButton.Dynamic
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
