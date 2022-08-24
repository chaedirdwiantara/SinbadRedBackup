/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { SnbButton2, Content, colorV2 } from 'react-native-sinbad-ui';
import { Images } from 'src/assets';
import { goToCategory } from '../../functions';

/** === COMPONENT ===  */
export const ShoppingCartEmpty: FC = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorV2.bgColor.neutral,
    }}>
    <Content.Illustration
      image={Images.cartNotFound}
      title="Keranjang Kosong"
      description="Yuk isi keranjang Anda dengan produk-produk di Sinbad"
      caption={
        <SnbButton2.Primary
          title="Tambah Produk"
          size="medium"
          onPress={goToCategory}
        />
      }
    />
  </View>
);
