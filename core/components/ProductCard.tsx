/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { SnbText, SnbImageCompressor, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE & ASSET === */
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
  onPress: () => void;
  type?: 'purchased' | 'bonus';
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
  onPress,
  type = 'purchased',
}) => (
  <Pressable style={ProductCardStyle.Type1.container} onPress={onPress}>
    <View style={ProductCardStyle.Type1.body}>
      <View style={ProductCardStyle.Type1.mainInfo}>
        <SnbImageCompressor
          uri={imageSource}
          style={ProductCardStyle.Type1.image}
          defaultSource={Images.opacityPlaceholder}
        />
        <View style={{ flex: 1 }}>
          <SnbText.B3>{name}</SnbText.B3>
          <View style={{ marginTop: 4 }}>
            {type === 'purchased' && <SnbText.C2>{price}</SnbText.C2>}
          </View>
        </View>
      </View>
      <View style={ProductCardStyle.Type1.qtyInfo}>
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
      {type === 'purchased' && <SnbText.C1>Total Harga</SnbText.C1>}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        {originalQty && (
          <View style={{ marginRight: 8 }}>
            {/* Should be styled with strikethrough */}
            <SnbText.C2 color={color.black60}>{originalTotal}</SnbText.C2>
          </View>
        )}
        <SnbText.C2 color={type === 'bonus' ? color.green50 : color.black100}>
          {type === 'purchased' ? total : 'FREE'}
        </SnbText.C2>
      </View>
    </View>
  </Pressable>
);

export const ProductCard = { Type1 };
