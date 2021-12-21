/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbImageCompressor, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { Images } from 'src/assets';
import { ProductCardStyle } from '../styles';
/** === TYPE === */
interface ProductCardType1Props {
  name: string;
  imageSource: string;
  price: string;
  qty: number;
  originalQty?: number;
  uom: string;
  total: string;
  originalTotal?: string;
}
/** === COMPONENT === */
const Type1: FC<ProductCardType1Props> = ({
  name,
  imageSource,
  price,
  qty,
  originalQty,
  uom,
  total,
  originalTotal,
}) => (
  <View style={ProductCardStyle.Type1.container}>
    <View style={ProductCardStyle.Type1.body}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SnbImageCompressor
          uri={imageSource}
          style={{ marginRight: 8, width: 60, height: 60 }}
          defaultSource={Images.opacityPlaceholder}
        />
        <View style={{ maxWidth: '75%' }}>
          <SnbText.B3>{name}</SnbText.B3>
          <View style={{ marginTop: 4 }}>
            <SnbText.C2>{price}</SnbText.C2>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {originalQty && (
          <View style={{ marginRight: 8 }}>
            {/* Should be styled with strikethrough */}
            <SnbText.C2
              color={color.black60}>{`${originalQty} ${uom}`}</SnbText.C2>
          </View>
        )}
        <SnbText.C2>{`${qty} ${uom}`}</SnbText.C2>
      </View>
    </View>
    <View style={ProductCardStyle.Type1.divider} />
    <View style={ProductCardStyle.Type1.footer}>
      <SnbText.C1>Total Harga</SnbText.C1>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {originalQty && (
          <View style={{ marginRight: 8 }}>
            {/* Should be styled with strikethrough */}
            <SnbText.C2 color={color.black60}>{originalTotal}</SnbText.C2>
          </View>
        )}
        <SnbText.C2>{total}</SnbText.C2>
      </View>
    </View>
  </View>
);

export const ProductCard = { Type1 };
