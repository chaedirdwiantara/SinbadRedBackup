/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import BluckPricingTag from '@core/components/product/BluckPricingTag';
import ExclusiveTag from '@core/components/product/ExclusiveTag';
/** === IMPORT FUNCTION ===  */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE ===  */
interface ProductDetailMainInfoProps {
  name: string;
  priceAfterTax: number;
  stock: number;
  unit?: string;
  qtySoldLabel: string;
  isExclusive: boolean;
  hasPromo: boolean;
  hasBulkPrice: boolean;
  loading: boolean;
  showStock?: boolean;
}
/** === COMPONENT ===  */
export const ProductDetailMainInfo: FC<ProductDetailMainInfoProps> = ({
  name,
  priceAfterTax,
  stock,
  isExclusive,
  hasPromo,
  loading,
  showStock,
  qtySoldLabel,
  hasBulkPrice,
}) => (
  <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
      {hasBulkPrice ? <BluckPricingTag /> : <View />}
      {isExclusive ? <ExclusiveTag style={{ marginLeft: 4 }} /> : <View />}
    </View>
    <SnbText.H4>{name}</SnbText.H4>
    <View style={{ marginVertical: 8 }}>
      <SnbText.B2 color={color.red50}>
        {toCurrency(priceAfterTax ?? 0, { withFraction: false })}
      </SnbText.B2>
    </View>
    {showStock && stock < 11 && !loading && (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: hasPromo ? 'space-between' : 'flex-end',
          alignItems: 'center',
        }}>
        {hasPromo && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B3 color={color.black40}>
              {toCurrency(priceAfterTax ?? 0, {
                withFraction: false,
              })}
            </SnbText.B3>
          </View>
        )}
        <SnbText.B3 color={color.red50}>
          {stock === 0 ? 'Produk Habis' : `Tersisa ${stock}`}
        </SnbText.B3>
      </View>
    )}
    {qtySoldLabel !== '0' && (
      <SnbText.B3>{`Terjual ${qtySoldLabel ?? ''}`}</SnbText.B3>
    )}
  </View>
);
