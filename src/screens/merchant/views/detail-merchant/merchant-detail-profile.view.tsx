import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbIcon,
} from 'react-native-sinbad-ui';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { NavigationAction } from '@navigation';
import { color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';

const MerchantDetailProfileView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Data Diri"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** === RENDER HEADER CONTENT IMAGE (Owner Image) === */
  const renderOwnerImage = () => {
    return (
      <View>
        {/* {this.props.merchant.dataMerchantVolatile.ownerImageUrl !== null ? ( */}
        <Image
          source={{
            uri: 'https://dutadamaiyogyakarta.id/wp-content/uploads/2016/06/team-1.jpg',
          }}
          style={[MerchantStyles.imageProfile, {}]}
        />
        {/* ) : (
          <Image
            source={require('../../../assets/images/profile/avatar.png')}
            style={[GlobalStyle.image100, {borderRadius: 100}]}
          />
        )} */}
        <TouchableOpacity
          style={MerchantStyles.boxEditIcon}
          onPress={() => console.log('test')}>
          <SnbIcon name={'create'} size={18} />
        </TouchableOpacity>
      </View>
    );
  };
  /** === header image === */
  const renderHeaderImage = () => {
    return (
      <View style={MerchantStyles.headerContainer}>
        <View style={MerchantStyles.backgroundHeader} />
        <View style={MerchantStyles.boxHeader}>
          {/* {this.props.merchant.loadingEditMerchant
            ? this.renderSkeletonImageUpload()
            :  */}
          {renderOwnerImage()}
          {/* } */}
        </View>
      </View>
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
  const renderContent = () => {
    return (
      <View>
        {renderContentSection({
          key: 'Nama Lengkap Pemilik',
          value: 'Tyo',
          action: 'ubah',
        })}
        {renderContentSection({
          key: 'Email',
          value: 'Tyo@sinbad.co.id',
          action: 'ubah',
        })}
        {renderContentSection({
          key: 'Nomor Handphone',
          value: '082288360129',
          action: 'ubah',
        })}
        {renderContentSection({
          key: 'Nomor Rekening Bank',
          value: '-',
          action: 'tambah',
        })}
        {renderContentSection({
          key: 'Nomor Kartu Tanda Penduduk (KTP)',
          value: '-',
          action: 'tambah',
        })}
        {renderContentSection({
          key: 'Nomor Pokok Wajib Pajak (NPWP)',
          value: '-',
          action: 'tambah',
        })}
        {renderContentSection({
          key: 'Foto Nomor Pokok Wajib Pajak (NPWP)',
          value: '-',
          action: 'tambah',
        })}
        {renderContentSection({
          key: 'Foto KTP',
          value: '-',
          action: 'tambah',
        })}
        {renderContentSection({
          key: 'Foto Selfie + KTP',
          value: '-',
          action: 'tambah',
        })}
      </View>
    );
  };
  /** => main content */
  const renderMainContent = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {renderHeaderImage()}
        {renderContent()}
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {renderMainContent()}
    </SnbContainer>
  );
};

export default MerchantDetailProfileView;
