import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbIcon,
  color,
  SnbToast,
} from 'react-native-sinbad-ui';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { useNavigation } from '@react-navigation/core';

const MerchantDetailProfileView: FC = () => {
  /** === HOOK === */
  const { stateGlobal } = React.useContext(contexts.GlobalContext);
  const { stateUser } = React.useContext(contexts.UserContext);
  const { navigate } = useNavigation();
  const { stateMerchant } = React.useContext(contexts.MerchantContext);
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (
      stateMerchant.profileEdit.data !== null ||
      stateMerchant.merchantEdit.data !== null
    ) {
      SnbToast.show('Data Berhasil Diperbaharui', 2500, { positionValue: 56 });
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show(stateGlobal.uploadImage.error.message, 2500, {
        positionValue: 56,
      });
    }
  }, [stateGlobal.uploadImage.error]);
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
        NavigationAction.navigate('MerchantEditView', { title, type });
        break;
      case 'merchantOwnerBankAccountNo':
        NavigationAction.navigate('MerchantBankAccountView', { title, type });
        break;
      case 'ktp':
      case 'npwp':
      case 'selfie': {
        navigate('MerchantEditPhotoView', { title, type });
        break;
      }
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
    const source = ownerData?.profile.imageUrl
      ? { uri: ownerData?.profile.imageUrl }
      : require('../../../../assets/images/sinbad_image/avatar.png');
    return (
      <View>
        <Image source={source} style={MerchantStyles.imageProfile} />
        <TouchableOpacity
          style={MerchantStyles.boxEditIcon}
          onPress={() => goTo({ type: 'merchantOwnerImage' })}
        >
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
  /** === label === */
  const renderLabel = () => {
    return (
      <View
        style={{
          backgroundColor: color.green50,
          alignSelf: 'center',
          marginHorizontal: 8,
          flexDirection: 'row',
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRadius: 10,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <SnbIcon name={'check'} size={10} color={color.white} />
        </View>
        <View style={{ marginLeft: 5 }}>
          <SnbText.C1 color={color.white}>Terverifikasi</SnbText.C1>
        </View>
      </View>
    );
  };
  /** === RENDER CONTENT SECTION === */
  const renderContentSection = (data: any) => {
    return (
      <View style={MerchantStyles.boxContent}>
        <View style={{ width: '85%' }}>
          <View style={{ marginBottom: 6, flexDirection: 'row' }}>
            <SnbText.B3 color={color.black60}>{data.key}</SnbText.B3>
            {data.label ? renderLabel() : null}
          </View>
          <SnbText.B3 color={data.success ? color.green50 : color.black100}>
            {data.value}
          </SnbText.B3>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <TouchableOpacity
              onPress={() => goTo(data)}
              style={{ paddingVertical: 10 }}>
              <SnbText.C1 color={color.red50}>Tambah</SnbText.C1>
            </TouchableOpacity>
          )}
          {data.action === 'ubah' && (
            <TouchableOpacity
              onPress={() => goTo(data)}
              style={{ paddingVertical: 10 }}>
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
          value: ownerData?.profile.email ? ownerData?.profile.email : '-',
          action: ownerData?.profile.email ? 'ubah' : 'tambah',
          type: 'merchantOwnerEmail',
          title: ownerData?.profile.email ? 'Ubah E-mail' : 'Tambah E-mail',
          label: ownerData?.info.isEmailVerified,
        })}
        {renderContentSection({
          key: 'Nomor Handphone',
          value: ownerData?.profile.mobilePhone,
          action: ownerData?.profile.mobilePhone ? 'ubah' : 'tambah',
          type: 'merchantOwnerPhoneNo',
          title: ownerData?.profile.mobilePhone
            ? 'Ubah Nomor Handphone'
            : 'Tambah Nomor Handphone',
          label: ownerData?.info.isMobilePhoneVerified,
        })}
        {renderContentSection({
          key: 'Nomor Rekening Bank',
          value: ownerData?.profile.bankAccount?.bankAccountNo
            ? ownerData?.profile.bankAccount.bankAccountNo
            : '-',
          action: ownerData?.profile.bankAccount?.bankAccountNo
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerBankAccountNo',
          title: ownerData?.profile.bankAccount?.bankAccountNo
            ? 'Ubah Rekening Bank'
            : 'Tambah Rekening Bank',
          label: ownerData?.info.isBankAccountVerified,
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
          value: ownerData?.profile.taxNo ? ownerData?.profile.taxNo : '-',
          action: ownerData?.profile.taxNo ? 'ubah' : 'tambah',
          type: 'merchantOwnerTaxNo',
          title: ownerData?.profile.taxNo ? 'Ubah NPWP' : 'Tambah NPWP',
        })}
        {renderContentSection({
          key: 'Foto Nomor Pokok Wajib Pajak (NPWP)',
          value: ownerData?.profile.taxImageUrl ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.taxImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.taxImageUrl ? true : false,
          type: 'npwp',
          title: 'Foto NPWP',
        })}
        {renderContentSection({
          key: 'Foto KTP',
          value: ownerData?.profile.idImageUrl ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.idImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.idImageUrl ? true : false,
          type: 'ktp',
          title: 'Foto KTP',
        })}
        {renderContentSection({
          key: 'Foto Selfie + KTP',
          value: ownerData?.profile.selfieImageUrl ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.selfieImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.selfieImageUrl ? true : false,
          type: 'selfie',
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
