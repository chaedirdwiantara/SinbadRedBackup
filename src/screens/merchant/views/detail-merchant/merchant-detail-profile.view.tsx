import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbIcon,
  color,
} from 'react-native-sinbad-ui';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { NavigationAction } from '@navigation';
import Svg from '@svg';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';

const MerchantDetailProfileView: FC = () => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  /** FUNCTION */
  /** === GO TO PAGE === */
  const goTo = (data: any) => {
    const { type, title } = data;
    switch (type) {
      case 'merchantOwnerImage':
        NavigationAction.navigate('TakeProfilePictureView');
        break;
      case 'merchantOwnerName':
      case 'merchantOwnerEmail':
      case 'merchantOwnerPhoneNo':
      case 'merchantOwnerIdNo':
      case 'merchantOwnerTaxNo':
      case 'merchantOwnerImageTax':
      case 'merchantOwnerImageId':
      case 'merchantOwnerImageSelfie':
        NavigationAction.navigate('MerchantEditView', { title, type });
        break;
      case 'merchantOwnerBankAccountNo':
        NavigationAction.navigate('MerchantBankAccountView', { title, type });
        break;
      default:
        break;
    }
  };
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
    const ownerData = stateUser.detail.data?.ownerData;
    return (
      <View>
        {/* {this.props.merchant.dataMerchantVolatile.ownerImageUrl !== null ? ( */}
        {ownerData?.profile.imageUrl ? (
          <Image
            source={{
              uri: ownerData?.profile.imageUrl,
            }}
            style={MerchantStyles.imageProfile}
          />
        ) : (
          <Svg name={'avatar'} size={50} color={color.red50} />
        )}
        {/* ) : (
          <Image
            source={require('../../../assets/images/profile/avatar.png')}
            style={[GlobalStyle.image100, {borderRadius: 100}]}
          />
        )} */}
        <TouchableOpacity
          style={MerchantStyles.boxEditIcon}
          onPress={() => goTo({ type: 'merchantOwnerImage' })}>
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
          <SnbText.B3 color={data.success ? color.green50 : color.black100}>
            {data.value}
          </SnbText.B3>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <TouchableOpacity onPress={() => goTo(data)}>
              <SnbText.C1 color={color.red50}>Tambah</SnbText.C1>
            </TouchableOpacity>
          )}
          {data.action === 'ubah' && (
            <TouchableOpacity onPress={() => goTo(data)}>
              <SnbText.C1 color={color.red50}>Ubah</SnbText.C1>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  /** => content */
  const renderContent = () => {
    const ownerData = stateUser.detail.data?.ownerData;
    return (
      <View>
        {renderContentSection({
          key: 'Nama Lengkap Pemilik',
          value: ownerData?.profile.name,
          action: ownerData?.profile.name ? 'ubah' : 'tambah',
          type: 'merchantOwnerName',
          title: ownerData?.profile.name
            ? 'Ubah Nama Pemilik'
            : 'Tambah Nama Pemilik',
        })}
        {renderContentSection({
          key: 'Email',
          value: ownerData?.profile.email,
          action: ownerData?.profile.email ? 'ubah' : 'tambah',
          type: 'merchantOwnerEmail',
          title: ownerData?.profile.email ? 'Ubah E-mail' : 'Tambah E-mail',
        })}
        {renderContentSection({
          key: 'Nomor Handphone',
          value: ownerData?.profile.mobilePhone,
          action: ownerData?.profile.mobilePhone ? 'ubah' : 'tambah',
          type: 'merchantOwnerPhoneNo',
          title: ownerData?.profile.mobilePhone
            ? 'Ubah Nomor Handphone'
            : 'Tambah Nomor Handphone',
        })}
        {renderContentSection({
          key: 'Nomor Rekening Bank',
          value: ownerData?.profile.bankAccount.bankAccountNo,
          action: ownerData?.profile.bankAccount.bankAccountNo
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerBankAccountNo',
          title: ownerData?.profile.bankAccount.bankAccountNo
            ? 'Ubah Rekening Bank'
            : 'Tambah Rekening Bank',
        })}
        {renderContentSection({
          key: 'Nomor Kartu Tanda Penduduk (KTP)',
          value: ownerData?.profile.idNo,
          action: ownerData?.profile.idNo ? 'ubah' : 'tambah',
          type: 'merchantOwnerIdNo',
          title: ownerData?.profile.idNo ? 'Ubah KTP' : 'Tambah KTP',
        })}
        {renderContentSection({
          key: 'Nomor Pokok Wajib Pajak (NPWP)',
          value: ownerData?.profile.taxNo,
          action: ownerData?.profile.taxNo ? 'ubah' : 'tambah',
          type: 'merchantOwnerTaxNo',
          title: ownerData?.profile.taxNo ? 'Ubah NPWP' : 'Tambah NPWP',
        })}
        {renderContentSection({
          key: 'Foto Nomor Pokok Wajib Pajak (NPWP)',
          value: ownerData?.profile.taxImageUrl ? 'Sudah diupload' : '-',
          action: ownerData?.profile.taxImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.taxImageUrl ? true : false,
          type: 'merchantOwnerImageTax',
          title: 'Foto NPWP',
        })}
        {renderContentSection({
          key: 'Foto KTP',
          value: ownerData?.profile.idImageUrl ? 'Sudah diupload' : '-',
          action: ownerData?.profile.idImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.idImageUrl ? true : false,
          type: 'merchantOwnerImageId',
          title: 'Foto KTP',
        })}
        {renderContentSection({
          key: 'Foto Selfie + KTP',
          value: ownerData?.profile.selfieImageUrl ? 'Sudah diupload' : '-',
          action: ownerData?.profile.selfieImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.selfieImageUrl ? true : false,
          type: 'merchantOwnerImageSelfie',
          title: 'Foto Selfie + KTP',
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
