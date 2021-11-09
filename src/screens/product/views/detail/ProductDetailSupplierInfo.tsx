/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, styles, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === TYPE ===  */
interface ProductDetailSupplierInfoProps {
  logo: string;
  name: string;
  urbanCity: string;
}
/** === COMPONENT ===  */
export const ProductDetailSupplierInfo: FC<ProductDetailSupplierInfoProps> = ({
  logo,
  name,
  urbanCity,
}) => (
  <View>
    <View style={{ height: 10, backgroundColor: color.black5 }} />
    <View style={[styles.shadowForBox10, { padding: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={
            logo
              ? { uri: logo }
              : require('../../../../assets/images/store.png')
          }
          style={ProductDetailStyle.supplierLogo}
        />
        <View style={{ flex: 1 }}>
          <SnbText.B3>{name}</SnbText.B3>
          <View style={{ marginTop: 4 }}>
            <SnbText.C1 color={color.black80}>{urbanCity}</SnbText.C1>
          </View>
        </View>
        <TouchableOpacity
          style={ProductDetailStyle.supplierButton}
          onPress={() => console.log('See supplier pressed')}>
          <SnbText.C1 color={color.red70}>Lihat Supplier</SnbText.C1>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
