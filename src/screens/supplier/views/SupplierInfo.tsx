/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { SupplierStyle } from '../styles';
/** === TYPE === */
interface SupplierInfoProps {
  logo?: string;
  name: string;
  urbanCity: string;
  transactionTotal: string;
  registeredMerchantTotal: string;
}
/** === COMPONENT === */
export const SupplierInfo: FC<SupplierInfoProps> = ({
  logo,
  name,
  urbanCity,
  transactionTotal,
  registeredMerchantTotal,
}) => (
  <View style={{ borderBottomWidth: 1, borderBottomColor: color.black10 }}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0,
      }}>
      <Image
        source={
          logo ? { uri: logo } : require('../../../assets/images/store.png')
        }
        style={SupplierStyle.logo}
      />
      <View>
        <SnbText.B4>{name}</SnbText.B4>
        <View style={{ marginTop: 4 }}>
          <SnbText.C1 color={color.black80}>{urbanCity}</SnbText.C1>
        </View>
      </View>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
        <SnbText.B4>{transactionTotal}</SnbText.B4>
        <View style={{ marginTop: 4 }}>
          <SnbText.C1 color={color.black80}>Transaksi</SnbText.C1>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
        <SnbText.B4>{registeredMerchantTotal}</SnbText.B4>
        <View style={{ marginTop: 4 }}>
          <SnbText.C1 color={color.black80}>Toko Terdaftar</SnbText.C1>
        </View>
      </View>
    </View>
  </View>
);
