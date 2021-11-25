/** === IMPORT PACKAGES ===  */
import React, { FC, useReducer } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText,
  SnbIcon,
  SnbToolTips,
  color,
} from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENTS ===  */
import { ProductBundleMainInfoSkeleton } from './ProductBundleMainInfoSkeleton';
/** === IMPORT FUNCTION ===  */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === TYPE === */
interface ProductBundleMainInfoProps {
  imageUrl?: string;
  isExclusive: boolean;
  name: string;
  currentPrice: number;
  packagedQty: number;
  minQty: number;
  minQtyType: string;
  loading: boolean;
}
/** === COMPONENT === */
export const ProductBundleMainInfo: FC<ProductBundleMainInfoProps> = (
  props,
) => {
  /** === HOOK === */
  const [tooltipVisible, toggleTooltipVisible] = useReducer(
    (prevVisible) => !prevVisible,
    false,
  );
  /** === VIEW === */
  if (props.loading) {
    return <ProductBundleMainInfoSkeleton />;
  }

  return (
    <View style={ProductBundleStyle.mainInfoContainer}>
      <Image
        defaultSource={require('../../../../assets/images/sinbadopacity.png')}
        source={{ uri: props.imageUrl }}
        style={ProductBundleStyle.mainInfoImage}
      />
      <View>
        {props.isExclusive && (
          <View style={ProductBundleStyle.exclusiveTagContainer}>
            <SnbIcon
              name="stars"
              color={color.yellow50}
              size={18}
              style={{ marginRight: 4 }}
            />
            <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
          </View>
        )}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SnbText.B3>{props.name}</SnbText.B3>
          </View>
        </View>
        <View
          style={{
            marginVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <SnbText.B2 color={color.red50}>
            {toCurrency(props.currentPrice ?? 0, {
              withFraction: false,
            })}
          </SnbText.B2>
          <TouchableOpacity
            onPress={toggleTooltipVisible}
            style={{ marginLeft: 8 }}>
            <SnbIcon name="help" color={color.black40} size={18} />
          </TouchableOpacity>
          <View style={ProductBundleStyle.tooltipContainer}>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <SnbText.C1>{`per-Dus ${props.packagedQty} ${props.minQtyType}`}</SnbText.C1>
          <View style={ProductBundleStyle.textHorizontalDivider} />
          <SnbText.C1>{`min.pembelian ${props.minQty} ${props.minQtyType}`}</SnbText.C1>
        </View>
      </View>
    </View>
  );
};
