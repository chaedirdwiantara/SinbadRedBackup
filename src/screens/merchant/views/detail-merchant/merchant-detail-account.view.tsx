import React, { FC } from 'react';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationAction } from '@navigation';
import { color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';

const MerchantDetailAccountView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Informasi Toko"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** === RENDER CONTENT SECTION === */
  const renderContentSection = (data: any) => {
    return (
      <View style={MerchantStyles.boxContent}>
        <View>
          <View style={{ marginBottom: 6 }}>
            <SnbText.B3 color={color.black60}>{data.key}</SnbText.B3>
          </View>
          <SnbText.B3 color={color.black100}>{data.value}</SnbText.B3>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <TouchableOpacity onPress={() => console.log('press')}>
              <SnbText.C1 color={color.red50}>Tambah</SnbText.C1>
            </TouchableOpacity>
          )}
          {data.action === 'ubah' && (
            <TouchableOpacity onPress={() => console.log('press')}>
              <SnbText.C1 color={color.red50}>Ubah</SnbText.C1>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View>
          {renderContentSection({
            key: 'Sinbad ID',
            value: 'SNB0001',
          })}
          {renderContentSection({
            key: 'Nama Toko',
            value: '-',
            action: 'tambah',
          })}
          {renderContentSection({
            key: 'Nomor Handphone',
            value: '-',
            action: 'tambah',
          })}
          {renderContentSection({
            key: 'Foto Toko',
            value: '-',
            action: 'tambah',
          })}
        </View>
      </ScrollView>
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

export default MerchantDetailAccountView;
