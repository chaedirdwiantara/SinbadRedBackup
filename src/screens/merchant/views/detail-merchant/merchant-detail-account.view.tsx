import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { ScrollView, View, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationAction } from '@navigation';
import { color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { MerchantHookFunc } from '../../function';

const MerchantDetailAccountView: FC = () => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const editProfileAction = MerchantHookFunc.useEditProfile();
  const { dispatchSupplier } = React.useContext(contexts.MerchantContext);
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      editMerchantAction.reset(dispatchSupplier);
      editProfileAction.reset(dispatchSupplier);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const goTo = (data: any) => {
    switch (data.type) {
      case 'merchantAccountName':
      case 'merchantAccountPhoneNo':
        NavigationAction.navigate('MerchantEditView', {
          title: data.title,
          type: data.type,
        });
        break;
      case 'merchantAccountImage':
        NavigationAction.navigate('MerchantEditPhotoView', {
          title: data.title,
          type: 'store',
        });
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
        title="Akun Toko"
        backAction={() => {
          NavigationAction.back();
          editMerchantAction.reset(dispatchSupplier);
          editProfileAction.reset(dispatchSupplier);
        }}
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
          <SnbText.B3 color={data.fontColor ? data.fontColor : color.black100}>
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
  const content = () => {
    const storeData = stateUser.detail.data?.storeData.storeInformation;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View>
          {renderContentSection({
            key: 'Sinbad ID',
            value: storeData?.storeAccount.code,
          })}
          {renderContentSection({
            key: 'Nama Toko',
            value: storeData?.storeAccount.name,
            action: storeData?.storeAccount.name ? 'ubah' : 'tambah',
            type: 'merchantAccountName',
            title: storeData?.storeAccount.name
              ? 'Ubah Nama Toko'
              : 'Tambah Nama Toko',
          })}
          {renderContentSection({
            key: 'Nomor Handphone',
            value: storeData?.storeAccount.phoneNo
              ? storeData?.storeAccount.phoneNo
              : '-',
            action: storeData?.storeAccount.phoneNo ? 'ubah' : 'tambah',
            type: 'merchantAccountPhoneNo',
            title: storeData?.storeAccount.phoneNo
              ? 'Ubah No. Handphone Toko'
              : 'Tambah No. Handphone Toko',
          })}
          {renderContentSection({
            key: 'Foto Toko',
            fontColor: storeData?.storeAccount.imageUrl
              ? color.green50
              : color.black100,
            value: storeData?.storeAccount.imageUrl
              ? 'Berhasil Di Upload'
              : '-',
            action: storeData?.storeAccount.imageUrl ? 'ubah' : 'tambah',
            type: 'merchantAccountImage',
            title: 'Foto Toko',
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
