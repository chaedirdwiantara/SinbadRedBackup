import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbIcon,
  colorV2,
  SnbToast,
  SnbButton2,
  spacingV2 as layout,
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

  useEffect(() => {
    if (stateUser.update.error !== null) {
      SnbToast.show(stateUser.update.error.message, 2500, {
        positionValue: 56,
      });
    }
  }, [stateUser.update.error]);
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
      case 'ktp': {
        NavigationAction.navigate('UpdatePhotoKTPView');
        break;
      }
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
      <SnbTopNav2.Type3
        color="white"
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
        {ownerData?.profile.imageUrl ? (
          <Image source={source} style={MerchantStyles.imageProfile} />
        ) : (
          <SnbIcon
            name={'person_circle'}
            size={100}
            color={colorV2.iconColor.dark}
          />
        )}
        <TouchableOpacity
          style={MerchantStyles.boxEditIconContainer}
          onPress={() => goTo({ type: 'merchantOwnerImage' })}>
          <View style={MerchantStyles.boxEditIcon}>
            <SnbIcon
              name={'create'}
              size={10}
              color={colorV2.iconColor.white}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  /** === header image === */
  const renderHeaderImage = () => {
    return (
      <View style={MerchantStyles.headerContainer}>
        <View style={MerchantStyles.badgeBox}>
          <View style={{ marginRight: layout.spacing.sm }}>
            <SnbIcon name={'info'} size={16} color={colorV2.iconColor.blue} />
          </View>
          <View style={{ flex: 1 }}>
            <SnbText2.Paragraph.Small color={colorV2.textColor.link}>
              Transaksi lebih mudah dan cepat dengan melengkapi data diri.
            </SnbText2.Paragraph.Small>
          </View>
        </View>
        <View style={MerchantStyles.boxHeader}>{renderOwnerImage()}</View>
      </View>
    );
  };
  /** === label === */
  const renderLabel = (data: any) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginHorizontal: layout.spacing.sm,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <SnbIcon
            name={'shield'}
            size={16}
            color={data ? colorV2.iconColor.green : colorV2.iconColor.dark}
          />
        </View>
      </View>
    );
  };
  /** === RENDER CONTENT SECTION === */
  const renderContentSection = (data: any) => {
    return (
      <View style={MerchantStyles.boxContent}>
        <View style={{ flex: 1 }}>
          <View
            style={{ marginBottom: layout.spacing.sm, flexDirection: 'row' }}>
            <SnbText2.Body.Default>{data.key}</SnbText2.Body.Default>
            {data.label !== undefined ? renderLabel(data.label) : null}
          </View>
          <SnbText2.Paragraph.Default
            color={
              data.success ? colorV2.iconColor.green : colorV2.iconColor.dark
            }>
            {data.value}
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <SnbButton2.Link
              onPress={() => goTo(data)}
              title="Tambah"
              size="small"
            />
          )}
          {data.action === 'ubah' && (
            <SnbButton2.Link
              onPress={() => goTo(data)}
              title="Ubah"
              size="small"
            />
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
          label: ownerData?.info.isImageIdOcrValidate,
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
          label: ownerData?.profile.taxImageUrl ? true : false,
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
      <ScrollView contentContainerStyle={{ paddingBottom: layout.spacing.lg }}>
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
