/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
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
  <View style={ProductCardStyle.container}>
    <View style={ProductCardStyle.body}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: imageSource }}
          style={{ marginRight: 8, width: 60, height: 60 }}
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
    <View style={ProductCardStyle.divider} />
    <View style={ProductCardStyle.footer}>
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
