import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbBadge,
} from 'react-native-sinbad-ui';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationAction } from '@navigation';
import { color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';

const MerchantSupplierInformationView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Informasi Supplier"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <SnbText.H4>PT. Cahaya Bumi Makmur Indonesia</SnbText.H4>
          <View style={{ marginVertical: 8 }}>
            <SnbText.B3>07 Des 2020 09.58</SnbText.B3>
          </View>
          {renderBadge('verified', 'test')}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: color.black10,
              marginTop: 16,
            }}
          />
        </View>
        <View style={{ padding: 16 }}>
          <SnbText.H4>PT. Cahaya Bumi Makmur Indonesia</SnbText.H4>
          <View style={{ marginVertical: 8 }}>
            <SnbText.B3>07 Des 2020 09.58</SnbText.B3>
          </View>
          {renderBadge('verified', 'test')}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: color.black10,
              marginTop: 16,
            }}
          />
        </View>
      </ScrollView>
    );
  };
  // RENDER BADGE
  const renderBadge = (status: string, message: string) => {
    let title = '';
    let type = color.black10;
    switch (status) {
      case 'verified':
        title = 'Terverifikasi';
        type = 'success';
        break;
      case 'rejected':
        title = 'Ditolak';
        type = 'success';
        break;
      case 'pending':
      case 'updating':
      case 'guest':
        title = 'Menunggu Verifikasi';
        type = 'success';
    }
    return (
      <View>
        <SnbBadge.Label type="error" value="Example" />
      </View>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default MerchantSupplierInformationView;
