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
  Text,
  SnbInfoBox2,
} from 'react-native-sinbad-ui';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { NavigationAction } from '@navigation';
import { testProps } from '@core/functions/global/test-props';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { useNavigation } from '@react-navigation/core';
import { formatter } from '@screen/auth/functions';

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
      SnbToast.show('Data Berhasil Diperbaharui', 2500);
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show(stateGlobal.uploadImage.error.message, 2500);
    }
  }, [stateGlobal.uploadImage.error]);

  useEffect(() => {
    if (stateUser.update.error !== null) {
      SnbToast.show(stateUser.update.error.message, 2500);
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
        testID={'12.1'}
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
            color={colorV2.iconColor.default}
          />
        )}
        <TouchableOpacity
          style={MerchantStyles.boxEditIconContainer}
          onPress={() => goTo({ type: 'merchantOwnerImage' })}
          {...testProps('uploadProfile.12')}>
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
        <SnbInfoBox2
          title={'Transaksi lebih mudah dan cepat dengan melengkapi data diri.'}
          leftIcon={'info'}
          color={'blue'}
          testID={'12.1'}
        />
        <View style={MerchantStyles.boxHeader}>{renderOwnerImage()}</View>
      </View>
    );
  };
  /** === RENDER CONTENT SECTION === */
  const renderContentSection = (data: any) => {
    return (
      <View style={MerchantStyles.boxContent}>
        <Text.Output
          title={data.key}
          actionComponentAlign="center"
          testID={'12.1'}
          text={
            <SnbText2.Paragraph.Default
              color={
                data.success
                  ? colorV2.textColor.success
                  : colorV2.textColor.secondary
              }>
              {data.value}
            </SnbText2.Paragraph.Default>
          }
          actionComponent={
            data.action ? (
              <SnbButton2.Link
                onPress={() => goTo(data)}
                title={`${data.action[0].toUpperCase() + data.action.slice(1)}`}
                size="small"
              />
            ) : null
          }
          titleIcon={
            data.label !== undefined ? (
              <SnbIcon
                name={'shield'}
                size={16}
                color={
                  data.label ? colorV2.iconColor.green : colorV2.iconColor.dark
                }
              />
            ) : null
          }
        />
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
          value: formatter(ownerData?.profile.idNo, [6, 12], '-'),
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
          value: ownerData?.profile.taxNo ?
            formatter(ownerData?.profile.taxNo, [2, 5, 8, 9, 12, 15], '.')
            : '-',
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
