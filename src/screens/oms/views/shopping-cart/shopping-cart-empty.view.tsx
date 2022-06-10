/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText2, SnbButton2, colorV2 } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goToCategory } from '../../functions';
import { Images } from 'src/assets';

/** === COMPONENT ===  */
export const ShoppingCartEmpty: FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        padding: 16,
        alignItems: 'center',
      }}>
      <Image
        source={Images.cartNotFound}
        width={180}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <View style={{ marginBottom: 8 }}>
        <SnbText2.Headline.Default color={colorV2.textColor.default}>
          Keranjang Kosong
        </SnbText2.Headline.Default>
      </View>
      <View style={{ width: '80%' }}>
        <SnbText2.Paragraph.Default
          align={'center'}
          color={colorV2.textColor.secondary}>
          Yuk isi keranjang Anda dengan produk - produk di Sinbad
        </SnbText2.Paragraph.Default>
      </View>
    </View>
    <View style={{ alignItems: 'center', marginBottom: 40 }}>
      <SnbButton2.Primary
        size="medium"
        title="Tambah Produk"
        onPress={goToCategory}
      />
    </View>
  </View>
);
