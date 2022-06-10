/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  SnbDivider2,
  SnbText2,
  SnbButton2,
  spacingV2,
  SnbContainer,
  styles,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
import * as models from '@models';
/** === TYPE ===  */
interface AddToCartFooterProps {
  onAddToCartPress: () => void;
  isStockEmpty: boolean;
  orderQty: number;
  disabled: boolean;
  isFromProductDetail?: boolean;
  bulkPriceAterTax: number;
  errorStock: models.ErrorProps | null;
  loading: boolean;
}
// VAR
const { spacing } = spacingV2;
/** === COMPONENT ===  */
const AddToCartFooterMemo: FC<AddToCartFooterProps> = ({
  isStockEmpty,
  onAddToCartPress,
  orderQty,
  disabled,
  bulkPriceAterTax,
  errorStock,
  loading,
}) => {
  // kalkulasi harga total
  const totalPrice = useMemo(
    () => bulkPriceAterTax * orderQty,
    [bulkPriceAterTax, orderQty],
  );
  // label button
  const titleButton = useMemo(
    () => (errorStock || isStockEmpty ? 'Stock Habis' : 'Tambah ke Keranjang'),
    [isStockEmpty, errorStock],
  );
  // render
  return (
    <SnbContainer color="white">
      <SnbDivider2 />
      <View style={[AddToCartModalStyle.footer, styles.shadowStyle]}>
        <View style={{ marginRight: spacing.lg }}>
          <View style={{ flexDirection: 'row' }}>
            {!loading ? (
              <SnbText2.Body.Default>
                {toCurrency(totalPrice, {
                  withFraction: false,
                })}
              </SnbText2.Body.Default>
            ) : (
              <View />
            )}
          </View>
        </View>
        <SnbButton2.Primary
          disabled={disabled || loading}
          size="medium"
          loading={loading}
          testID="action-add-to-cart"
          title={titleButton}
          onPress={onAddToCartPress}
        />
      </View>
    </SnbContainer>
  );
};

export const AddToCartFooter = memo(AddToCartFooterMemo);
