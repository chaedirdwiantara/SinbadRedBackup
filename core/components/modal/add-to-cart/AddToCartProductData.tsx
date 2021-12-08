/** === IMPORT PACKAGES ===  */
import React, { FC, useReducer } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon, SnbToolTips } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
/** === TYPES === */
interface Props {
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
export const AddToCartProductData: FC<Props> = ({ isFromProductDetail }) => {
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
          <View style={{ marginLeft: 16 }}>
            {dataProductDetail?.isExclusive && (
              <View style={AddToCartModalStyle.exclusiveTagContainer}>
                <SnbIcon
                  name="stars"
                  color={color.yellow50}
                  size={18}
                  style={{ marginRight: 4 }}
                />
                <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
              </View>
            )}
            <SnbText.C1>{dataProductDetail?.name}</SnbText.C1>
            <View style={AddToCartModalStyle.priceContainer}>
              <View style={{ marginRight: 8 }}>
                <SnbText.B3 color={color.red50}>
                  {toCurrency(dataProductDetail?.currentPrice ?? 0, {
                    withFraction: false,
                  })}
                </SnbText.B3>
              </View>
              <TouchableOpacity onPress={toggleTooltipVisible}>
                <SnbIcon name="help" color={color.black40} size={18} />
              </TouchableOpacity>
              <View style={AddToCartModalStyle.tooltipContainer}>
                <SnbToolTips
                  show={tooltipVisible}
                  tips="Bottom"
                  content={
                    <SnbText.C3 color={color.white}>
                      Harga ini mungkin berubah mempertimbangkan lokasi gudang
                    </SnbText.C3>
                  }
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <SnbText.C1>
                per-Dus{' '}
                {`${dataProductDetail?.packagedQty} ${dataProductDetail?.minQtyType}`}
              </SnbText.C1>
              <View style={AddToCartModalStyle.lineSeparator} />
              <SnbText.C1>
                min.pembelian{' '}
                {`${dataProductDetail?.minQty} ${dataProductDetail?.minQtyType}`}
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
          <View style={{ marginLeft: 16 }}>
            {dataProductDetailCart?.isExclusive && (
              <View style={AddToCartModalStyle.exclusiveTagContainer}>
                <SnbIcon
                  name="stars"
                  color={color.yellow50}
                  size={18}
                  style={{ marginRight: 4 }}
                />
                <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
              </View>
            )}
            <SnbText.C1>{dataProductDetailCart?.name}</SnbText.C1>
            <View style={AddToCartModalStyle.priceContainer}>
              <View style={{ marginRight: 8 }}>
                <SnbText.B3 color={color.red50}>
                  {toCurrency(dataProductDetailCart?.currentPrice ?? 0, {
                    withFraction: false,
                  })}
                </SnbText.B3>
              </View>
              <TouchableOpacity onPress={toggleTooltipVisible}>
                <SnbIcon name="help" color={color.black40} size={18} />
              </TouchableOpacity>
              <View style={AddToCartModalStyle.tooltipContainer}>
                <SnbToolTips
                  show={tooltipVisible}
                  tips="Bottom"
                  content={
                    <SnbText.C3 color={color.white}>
                      Harga ini mungkin berubah mempertimbangkan lokasi gudang
                    </SnbText.C3>
                  }
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <SnbText.C1>
                per-Dus{' '}
                {`${dataProductDetailCart?.packagedQty} ${dataProductDetailCart?.minQtyType}`}
              </SnbText.C1>
              <View style={AddToCartModalStyle.lineSeparator} />
              <SnbText.C1>
                min.pembelian{' '}
                {`${dataProductDetailCart?.minQty} ${dataProductDetailCart?.minQtyType}`}
              </SnbText.C1>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
