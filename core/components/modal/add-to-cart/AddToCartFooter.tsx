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
  orderQty: number;
  disabled: boolean;
  isFromProductDetail?: boolean;
  bulkPriceAterTax: number;
  errorStock: models.ErrorProps | null;
}
// VAR
const { spacing } = spacingV2;
/** === COMPONENT ===  */
const AddToCartFooterMemo: FC<AddToCartFooterProps> = ({
  onAddToCartPress,
  orderQty,
  disabled,
  bulkPriceAterTax,
  errorStock,
}) => {
  const totalPrice = useMemo(
    () => bulkPriceAterTax * orderQty,
    [bulkPriceAterTax, orderQty],
  );

  return (
    <SnbContainer color="white">
      <SnbDivider2 />
      <View style={[AddToCartModalStyle.footer, styles.shadowStyle]}>
        <View style={{ marginRight: spacing.lg }}>
          <View style={{ flexDirection: 'row' }}>
            <SnbText2.Body.Default>
              {toCurrency(totalPrice, {
                withFraction: false,
              })}
            </SnbText2.Body.Default>
          </View>
        </View>
        <SnbButton2.Primary
          disabled={disabled}
          size="medium"
          // testID="action-add-to-cart"
          title={errorStock ? 'Stock Habis' : 'Tambah ke Keranjang'}
          onPress={onAddToCartPress}
        />
      </View>
    </SnbContainer>
  );
};

export const AddToCartFooter = memo(AddToCartFooterMemo);
