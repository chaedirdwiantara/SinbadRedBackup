/** === IMPORT PACKAGES ===  */
import React, { FC, useMemo } from 'react';
import { View, Text, ViewProps } from 'react-native';
import {
  SnbImageCompressor,
  SnbText2,
  SnbBadge2,
  colorV2,
  spacingV2,
  SnbSkeletonAnimator,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
import { ProductDetail } from '@model/product';
/** === TYPES === */
interface Props {
  isFromProductDetail?: boolean;
  orderQty: number;
  bulkPriceAterTax: number;
  isPriceGrosir: boolean;
  priceAfterTax: number;
  product: ProductDetail | null;
  loading: boolean;
}
interface SkeletonText extends ViewProps {
  loading: boolean;
}
// VAR
const { textColor } = colorV2;
const { spacing } = spacingV2;
/** === COMPONENT ===  */
const SkeletonText: FC<SkeletonText> = (props) =>
  props.loading ? (
    <SnbSkeletonAnimator minOpacity={0.2} maxOpacity={1}>
      <View style={props.style} />
    </SnbSkeletonAnimator>
  ) : (
    <View>{props.children}</View>
  );
export const AddToCartProductData: FC<Props> = ({
  product,
  isPriceGrosir,
  bulkPriceAterTax,
  priceAfterTax,
  loading = true,
}) => {
  const Skeleton = useMemo(
    () => (loading ? SnbSkeletonAnimator : View),
    [loading],
  );
  return (
    <React.Fragment>
      <View style={AddToCartModalStyle.mainContentContainer}>
        <Skeleton minOpacity={0.2} maxOpacity={1}>
          <SnbImageCompressor
            uri={product?.images[0].url || ''}
            style={AddToCartModalStyle.image}
            res={500}
            resizeMode="cover"
          />
        </Skeleton>
        <View
          style={{
            marginLeft: 16,
            maxWidth: '80%',
          }}>
          <SkeletonText
            loading={loading}
            style={{ height: spacing.lg, width: '100%' }}>
            <SnbText2.Paragraph.Default color={textColor.secondary}>
              {product?.name}
            </SnbText2.Paragraph.Default>
          </SkeletonText>
          <View style={{ paddingBottom: 5 }}>
            {/* harga normal */}
            <View style={AddToCartModalStyle.priceContainer}>
              <View style={{ marginRight: 8 }}>
                <SkeletonText
                  loading={loading}
                  style={{
                    height: spacing.lg,
                    width: 100,
                  }}>
                  <SnbText2.Body.Default
                    textDecorationLine={
                      isPriceGrosir ? 'line-through' : undefined
                    }
                    color={
                      isPriceGrosir ? textColor.secondary : textColor.default
                    }>
                    {toCurrency(priceAfterTax || 0, {
                      withFraction: false,
                    })}
                  </SnbText2.Body.Default>
                </SkeletonText>
              </View>
            </View>
            {/* harga coret */}
            {isPriceGrosir ? (
              <View style={AddToCartModalStyle.priceContainer}>
                <View style={{ marginRight: 8 }}>
                  <SnbText2.Body.Default color={textColor.selected}>
                    {toCurrency(bulkPriceAterTax ?? 0, {
                      withFraction: false,
                    })}
                  </SnbText2.Body.Default>
                </View>
                <View>
                  <SnbBadge2 type="error" title="Harga Grosir" />
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <SkeletonText
            loading={loading}
            style={{ height: spacing.lg, width: 200 }}>
            <View style={{ flexDirection: 'row' }}>
              <SnbText2.Paragraph.Tiny color={textColor.secondary}>
                Per Dus {`${product?.packagedQty} Pcs`}
              </SnbText2.Paragraph.Tiny>
              <View style={AddToCartModalStyle.lineSeparator} />
              <SnbText2.Paragraph.Tiny color={textColor.secondary}>
                min.pembelian {`${product?.minQty} ${product?.unit}`}
              </SnbText2.Paragraph.Tiny>
            </View>
          </SkeletonText>
        </View>
      </View>
    </React.Fragment>
  );
};
