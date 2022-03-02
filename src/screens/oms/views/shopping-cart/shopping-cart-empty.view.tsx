/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SnbText, SnbButton } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE ===  */
import { RecommendationHomeView } from '@screen/recommendation/views';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goToCategory } from '../../functions';
interface ShoppingCartEmptyProps {
  navigationParent: any;
}
/** === COMPONENT ===  */
export const ShoppingCartEmpty: FC<ShoppingCartEmptyProps> = ({
  navigationParent,
}) => (
  <ScrollView>
    <View
      style={{
        padding: 16,
        alignItems: 'center',
        marginBottom: 24,
      }}>
      <Image
        source={require('../../../../assets/images/oms_empty_cart.png')}
        width={180}
        style={{ marginTop: 24, marginBottom: 16 }}
      />
      <View style={{ marginBottom: 4 }}>
        <SnbText.H4>Keranjang Kosong</SnbText.H4>
      </View>
      <SnbText.B3 align={'center'}>
        Yuk, Isi keranjang kamu dengan produk - produk di Sinbad
      </SnbText.B3>
    </View>
    <View style={{ height: 80, borderStyle: 'dashed' }}>
      <SnbButton.Single
        type="primary"
        title="Tambah Produk"
        disabled={false}
        onPress={goToCategory}
      />
    </View>
    <View>
      <RecommendationHomeView navigationParent={navigationParent} />
    </View>
  </ScrollView>
);
