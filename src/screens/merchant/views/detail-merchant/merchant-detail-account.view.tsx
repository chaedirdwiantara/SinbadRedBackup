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


  const dummy = {
    kategori: 'Grosir', 
    kategoriProduk: 'Makanan dan Perlengkapan Hewan, Mandi dan Perawatan Tubuh, Minuman, Susu, Permen, Kosmetik, Makanan', 
    name: 'Jaya Makmur Sentosa', 
    phoneNo: '081122334455', 
    ukuran: '20', 
    imageUrl: 'udah aja pokoknya', 
  }
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
            <SnbText.H4 color={color.black100} >{data.key}</SnbText.H4>
          </View>
          <SnbText.B3 color={data.fontColor ? data.fontColor : color.black60}>
            {data.value + " m\u00B2"}
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
              <SnbText.C2 color={color.blue60}>Ubah</SnbText.C2>
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
            key: 'ID Toko',
            value: storeData?.storeAccount.code,
          })}
          <View style={{borderBottomColor:'#aaa', borderTopColor:'#aaa', paddingVertical: 10, marginHorizontal: 15, borderBottomWidth: 0.2 }} />
            {renderContentSection({
              key: 'Kategori Toko',
              value: storeData?.storeAccount.code,
            })}
            {renderContentSection({
              key: 'Kategori Produk',
              value: storeData?.storeAccount.code,
            })}
          <View style={{borderBottomColor:'#aaa', borderTopColor:'#aaa', paddingVertical: 10, marginHorizontal: 15, borderBottomWidth: 0.2 }} />
          {renderContentSection({
            key: 'Nama Toko',
            value: dummy.name,
            action: 'ubah',
            type: 'merchantAccountName',
            title: dummy.name
              ? 'Ubah Nama Toko'
              : 'Tambah Nama Toko',
          })}
          {renderContentSection({
            key: 'Nomor Handphone Toko',
            value: dummy.phoneNo
              ? dummy.phoneNo
              : '-',
            action: 'ubah',
            type: 'merchantAccountPhoneNo',
            title: dummy.phoneNo
              ? 'Ubah No. Handphone Toko'
              : 'Tambah No. Handphone Toko',
          })}
         {renderContentSection({
            key: 'Ukuran Toko',
            value: dummy.ukuran,
            action: 'ubah',
            type: 'merchantAccountSize',
            title: dummy.ukuran
              ? 'Ubah Ukuran Toko'
              : 'Tambah Ukuran Toko',
          })}
          {renderContentSection({
            key: 'Foto Toko',
            fontColor: dummy.imageUrl
              ? color.green50
              : color.black100,
            value: dummy.imageUrl
              ? 'Berhasil Di Upload'
              : '-',
            action: 'ubah',
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
