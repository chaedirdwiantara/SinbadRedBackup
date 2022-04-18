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
        type="white"
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
        <View style={MerchantStyles.badgeBox}>
          <View style={{ marginRight: 8 }}>
            <SnbIcon name={'info'} size={15} color={color.blue50} />
          </View>
          <View style={{ width: '95%' }}>
            <SnbText.B3 color={color.blue50}>
              Transaksi lebih mudah dan cepat dengan melengkapi data diri.
            </SnbText.B3>
          </View>
        </View>
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
  const renderLabel = (data: any) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginHorizontal: 8,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <SnbIcon
            name={'shield'}
            size={16}
            color={data ? color.green50 : color.black60}
          />
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
            <SnbText.H4>{data.key}</SnbText.H4>
            {data.label !== undefined ? renderLabel(data.label) : null}
          </View>
          <SnbText.B1 color={data.success ? color.green50 : color.black60}>
            {data.value}
          </SnbText.B1>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <TouchableOpacity
              onPress={() => goTo(data)}
              style={{ paddingVertical: 10 }}>
              <SnbText.C1 color={color.blue50}>Tambah</SnbText.C1>
            </TouchableOpacity>
          )}
          {data.action === 'ubah' && (
            <TouchableOpacity
              onPress={() => goTo(data)}
              style={{ paddingVertical: 10 }}>
              <SnbText.C1 color={color.blue50}>Ubah</SnbText.C1>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const renderSeparator = () => {
    return <View style={MerchantStyles.separator} />;
  };
  /** => content */
  const renderContent = () => {
    const ownerData = stateUser.detail.data?.ownerData;
    return (
      <View>
        {renderContentSection({
          key: 'No Handphone',
          value: ownerData?.profile.mobilePhone,
          action: ownerData?.profile.mobilePhone ? 'ubah' : 'tambah',
          type: 'merchantOwnerPhoneNo',
          title: ownerData?.profile.mobilePhone
            ? 'Ubah No Handphone'
            : 'Tambah No Handphone',
          label: ownerData?.info.isMobilePhoneVerified,
        })}
        {renderSeparator()}
        {renderContentSection({
          key: 'Foto KTP',
          value: ownerData?.profile.imageId ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.imageId ? 'ubah' : 'tambah',
          success: ownerData?.profile.imageId ? true : false,
          type: 'ktp',
          title: 'Foto KTP',
          label: true,
        })}
        {renderContentSection({
          key: 'Nama Lengkap',
          value: ownerData?.profile.name,
          type: 'merchantOwnerName',
          title: ownerData?.profile.name
            ? 'Ubah Nama Lengkap'
            : 'Tambah Nama Lengkap',
        })}
        {renderContentSection({
          key: 'Nomor Induk Kependudukan (NIK)',
          value: ownerData?.profile.idNo,
          type: 'merchantOwnerIdNo',
          title: ownerData?.profile.idNo ? 'Ubah KTP' : 'Tambah KTP',
        })}
        {renderContentSection({
          key: 'Foto Selfie + KTP',
          value: ownerData?.profile.selfieImageUrl ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.selfieImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.selfieImageUrl ? true : false,
          type: 'selfie',
          title: 'Foto Selfie + KTP',
        })}
        {renderSeparator()}
        {renderContentSection({
          key: 'Foto NPWP',
          value: ownerData?.profile.taxImageUrl ? 'Berhasil Di Upload' : '-',
          action: ownerData?.profile.taxImageUrl ? 'ubah' : 'tambah',
          success: ownerData?.profile.taxImageUrl ? true : false,
          type: 'npwp',
          title: 'Foto NPWP',
          label: false,
        })}
        {renderContentSection({
          key: 'Nomor Pokok Wajib Pajak (NPWP)',
          value: ownerData?.profile.taxNo ? ownerData?.profile.taxNo : '-',
          action: ownerData?.profile.taxNo ? 'ubah' : 'tambah',
          type: 'merchantOwnerTaxNo',
          title: ownerData?.profile.taxNo ? 'Ubah NPWP' : 'Tambah NPWP',
        })}
        {renderSeparator()}
        {renderContentSection({
          key: 'No Rekening Bank',
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
        })}
        {renderSeparator()}
        {renderContentSection({
          key: 'Email',
          value: ownerData?.profile.email ? ownerData?.profile.email : '-',
          action: ownerData?.profile.email ? 'ubah' : 'tambah',
          type: 'merchantOwnerEmail',
          title: ownerData?.profile.email ? 'Ubah E-mail' : 'Tambah E-mail',
          label: ownerData?.info.isEmailVerified,
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
