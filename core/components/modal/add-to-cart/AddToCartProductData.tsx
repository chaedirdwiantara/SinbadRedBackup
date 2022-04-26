/** === IMPORT PACKAGES ===  */
import React, { FC, useMemo, useReducer } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import {
  SnbText,
  color,
  SnbIcon,
  SnbToolTips,
  SnbBadge,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import BluckPricingTag from '@core/components/product/BluckPricingTag';
/** === IMPORT FUNCTIONS ===  */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
import ExclusiveTag from '@core/components/product/ExclusiveTag';
/** === TYPES === */
interface Props {
  isFromProductDetail?: boolean;
  orderQty: number;
  bulkPriceAterTax: number;
  isPriceGrosir: boolean;
  priceAfterTax: number;
}

/** === COMPONENT ===  */
export const AddToCartProductData: FC<Props> = ({
  isFromProductDetail,
  orderQty,
  isPriceGrosir,
  bulkPriceAterTax,
  priceAfterTax,
}) => {
  /** === HOOKS ===  */
  const {
    stateProduct: {
      detail: { data: dataProductDetail },
      cart: { data: dataProductDetailCart },
    },
  } = useProductContext();
  const [tooltipVisible, toggleTooltipVisible] = useReducer(
    (prevVisible) => !prevVisible,
    false,
  );
  return (
    <React.Fragment>
      {isFromProductDetail ? (
        <View style={AddToCartModalStyle.mainContentContainer}>
          <Image
            source={{ uri: dataProductDetail?.images[0].url }}
            style={AddToCartModalStyle.image}
          />
          <View
            style={{
              marginLeft: 16,
              maxWidth: '80%',
            }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dataProductDetail?.isExclusive ? <ExclusiveTag /> : <View />}
              {dataProductDetail?.hasBulkPrice ? (
                <BluckPricingTag style={{ marginLeft: 4 }} />
              ) : (
                <View />
              )}
            </View>
            <SnbText.B4>{dataProductDetail?.name}</SnbText.B4>
            {/* harga normal */}
            <View style={AddToCartModalStyle.priceContainer}>
              <View style={{ marginRight: 8 }}>
                <Text
                  style={{
                    textDecorationLine: isPriceGrosir ? 'line-through' : 'none',
                  }}>
                  <SnbText.B3
                    color={isPriceGrosir ? color.black60 : color.black}>
                    {toCurrency(priceAfterTax || 0, {
                      withFraction: false,
                    })}
                  </SnbText.B3>
                </Text>
              </View>
              {isPriceGrosir ? (
                <View />
              ) : (
                <>
                  <TouchableOpacity onPress={toggleTooltipVisible}>
                    <SnbIcon name="help" color={color.blue50} size={18} />
                  </TouchableOpacity>
                  <View style={AddToCartModalStyle.tooltipContainer}>
                    <SnbToolTips
                      show={tooltipVisible}
                      tips="Bottom"
                      content={
                        <SnbText.C3 color={color.white}>
                          Harga ini mungkin berubah mempertimbangkan lokasi
                          gudang
                        </SnbText.C3>
                      }
                    />
                  </View>
                </>
              )}
            </View>
            {/* harga coret */}
            {isPriceGrosir ? (
              <View style={AddToCartModalStyle.priceContainer}>
                <View style={{ marginRight: 8 }}>
                  <SnbText.B3 color={color.red50}>
                    {toCurrency(bulkPriceAterTax ?? 0, {
                      withFraction: false,
                    })}
                  </SnbText.B3>
                </View>
                <View>
                  <SnbBadge.Label type="error" value="Harga Grosir" />
                </View>
              </View>
            ) : (
              <View />
            )}

            <View style={{ flexDirection: 'row' }}>
              <SnbText.C1>
                per-Dus {`${dataProductDetail?.packagedQty} Pcs`}
              </SnbText.C1>
              <View style={AddToCartModalStyle.lineSeparator} />
              <SnbText.C1>
                min.pembelian{' '}
                {`${dataProductDetail?.minQty} ${dataProductDetail?.unit}`}
              </SnbText.C1>
            </View>
          </View>
        </View>
      ) : (
        <View style={AddToCartModalStyle.mainContentContainer}>
          <Image
            source={{ uri: dataProductDetailCart?.images[0].url }}
            style={AddToCartModalStyle.image}
          />
          <View
            style={{
              marginLeft: 16,
              maxWidth: '80%',
            }}>
            {dataProductDetailCart?.hasBulkPrice ? (
              <BluckPricingTag />
            ) : (
              <View />
            )}
            {dataProductDetailCart?.isExclusive ? (
              <ExclusiveTag style={{ marginLeft: 4 }} />
            ) : (
              <View />
            )}
            <SnbText.B4>{dataProductDetailCart?.name}</SnbText.B4>
            {/* harga normal */}
            <View style={AddToCartModalStyle.priceContainer}>
              <View style={{ marginRight: 8 }}>
                <Text
                  style={{
                    textDecorationLine: isPriceGrosir ? 'line-through' : 'none',
                  }}>
                  <SnbText.B3
                    color={isPriceGrosir ? color.black60 : color.black}>
                    {toCurrency(priceAfterTax || 0, {
                      withFraction: false,
                    })}
                  </SnbText.B3>
                </Text>
              </View>
              {isPriceGrosir ? (
                <View />
              ) : (
                <>
                  <TouchableOpacity onPress={toggleTooltipVisible}>
                    <SnbIcon name="help" color={color.blue50} size={18} />
                  </TouchableOpacity>
                  <View style={AddToCartModalStyle.tooltipContainer}>
                    <SnbToolTips
                      show={tooltipVisible}
                      tips="Bottom"
                      content={
                        <SnbText.C3 color={color.white}>
                          Harga ini mungkin berubah mempertimbangkan lokasi
                          gudang
                        </SnbText.C3>
                      }
                    />
                  </View>
                </>
              )}
            </View>
            {/* harga coret */}
            {isPriceGrosir ? (
              <View style={AddToCartModalStyle.priceContainer}>
                <View style={{ marginRight: 8 }}>
                  <SnbText.B3 color={color.red50}>
                    {toCurrency(bulkPriceAterTax ?? 0, {
                      withFraction: false,
                    })}
                  </SnbText.B3>
                </View>
                <View>
                  <SnbBadge.Label type="error" value="Harga Grosir" />
                </View>
              </View>
            ) : (
              <View />
            )}
            <View style={{ flexDirection: 'row' }}>
              <SnbText.C1>
                per-Dus {`${dataProductDetailCart?.packagedQty} Pcs`}
              </SnbText.C1>
              <View style={AddToCartModalStyle.lineSeparator} />
              <SnbText.C1>
                min.pembelian{' '}
                {`${dataProductDetailCart?.minQty} ${dataProductDetailCart?.unit}`}
              </SnbText.C1>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
