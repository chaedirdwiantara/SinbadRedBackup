/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, colorV2, spacingV2 } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import BulkPricingTag from '@core/components/product/BulkPricingTag';
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
// VAR
const { textColor } = colorV2;
const { spacing } = spacingV2;
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
  <View style={{ padding: spacing.lg }}>
    <View style={{ flexDirection: 'row', marginBottom: spacing.xxsm }}>
      {hasBulkPrice ? <BulkPricingTag /> : <View />}
      {isExclusive ? <ExclusiveTag style={{ marginLeft: 4 }} /> : <View />}
    </View>
    <SnbText2.Paragraph.Large color={textColor.secondary}>
      {name}
    </SnbText2.Paragraph.Large>
    <View style={{ marginVertical: spacing.xxsm }}>
      <SnbText2.Headline.Default>
        {toCurrency(priceAfterTax ?? 0, { withFraction: false })}
      </SnbText2.Headline.Default>
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
            <SnbText2.Headline.Default>
              {toCurrency(priceAfterTax ?? 0, {
                withFraction: false,
              })}
            </SnbText2.Headline.Default>
          </View>
        )}
        <SnbText2.Paragraph.Tiny color={textColor.secondary}>
          {stock === 0 ? 'Produk Habis' : `Tersisa ${stock}`}
        </SnbText2.Paragraph.Tiny>
      </View>
    )}
    {qtySoldLabel !== '0' && (
      <SnbText2.Paragraph.Tiny color={textColor.secondary}>{`Terjual ${
        qtySoldLabel ?? ''
      }`}</SnbText2.Paragraph.Tiny>
    )}
  </View>
);
