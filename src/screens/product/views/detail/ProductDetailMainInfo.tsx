/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { ExclusiveTag } from './ExclusiveTag';
/** === IMPORT FUNCTION ===  */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE ===  */
interface ProductDetailMainInfoProps {
  name: string;
  originalPrice: number;
  currentPrice: number;
  stock: number;
  minQty: number;
  unit: string;
  isExclusive: boolean;
  hasPromo: boolean;
}
/** === COMPONENT ===  */
export const ProductDetailMainInfo: FC<ProductDetailMainInfoProps> = ({
  name,
  originalPrice,
  currentPrice,
  stock,
  minQty,
  unit,
  isExclusive,
  hasPromo,
}) => (
  <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
    {isExclusive && <ExclusiveTag />}
    <SnbText.H4>{name}</SnbText.H4>
    <View style={{ marginVertical: 8 }}>
      <SnbText.B2 color={color.red50}>
        {toCurrency(currentPrice ?? 0, { withFraction: false })}
      </SnbText.B2>
    </View>
    {stock > minQty && (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: hasPromo ? 'space-between' : 'flex-end',
          alignItems: 'center',
        }}>
        {hasPromo && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B3 color={color.black40}>
              {toCurrency(originalPrice ?? 0, {
                withFraction: false,
              })}
            </SnbText.B3>
          </View>
        )}
        <SnbText.B3
          color={color.red50}>{`Tersisa ${stock} ${unit}`}</SnbText.B3>
      </View>
    )}
  </View>
);
