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
  const { buyerDataState } = MerchantHookFunc.useUsersStates();
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
    const isPhoto = data.type == 'merchantAccountImage' ?  'MerchantEditPhotoView' : 'MerchantEditView'

    NavigationAction.navigate(isPhoto, {
      title: data.title,
      type:  data.type == 'merchantAccountImage' ? 'store' : data.type,
    });
   
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
            <SnbText.H4 color={color.black100}>{data.key}</SnbText.H4>
          </View>
          <SnbText.B3 color={data.fontColor ? data.fontColor : color.black60}>
            {data.value} {data.key == 'Ukuran Toko' && 'm\u00B2'}
          </SnbText.B3>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' && (
            <TouchableOpacity
              onPress={() => goTo(data)}
              style={{ paddingVertical: 10 }}>
              <SnbText.C1 color={color.blue60}>Tambah</SnbText.C1>
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
    // const storeData = stateUser.detail.data?.buyerData.buyerInformation;
    const buyerData = buyerDataState?.buyerInformation.buyerAccount;
    
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View>
          {renderContentSection({
            key: 'ID Toko',
            value: buyerData?.code,
          })}
          <View
            style={{
              borderBottomColor: '#aaa',
              borderTopColor: '#aaa',
              paddingVertical: 10,
              marginHorizontal: 15,
              borderBottomWidth: 0.2,
            }}
          />
          {renderContentSection({
            key: 'Kategori Toko',
            value: buyerData?.buyerCategory,
          })}
          {renderContentSection({
            key: 'Kategori Produk',
            value: buyerData?.productCategory,
          })}
          <View
            style={{
              borderBottomColor: '#aaa',
              borderTopColor: '#aaa',
              paddingVertical: 10,
              marginHorizontal: 15,
              borderBottomWidth: 0.2,
            }}
          />
          {renderContentSection({
            key: 'Nama Toko',
            value: buyerData?.name,
            action: buyerData?.name == '' || buyerData?.name == null ? 'tambah' : 'ubah',
            type: 'merchantAccountName',
            title: buyerData?.name ? 'Ubah Nama Toko' : 'Tambah Nama Toko',
          })}
          {renderContentSection({
            key: 'Nomor Handphone Toko',
            value: buyerData?.phoneNo,
            action: buyerData?.phoneNo == '' || buyerData?.phoneNo == null ? 'tambah' : 'ubah',
            type: 'merchantAccountPhoneNo',
            title: buyerData?.phoneNo
              ? 'Ubah No. Handphone Toko'
              : 'Tambah No. Handphone Toko',
          })}
          {renderContentSection({
            key: 'Ukuran Toko',
            value: buyerData?.largeArea || 0,
            action: buyerData?.largeArea == '' || buyerData?.largeArea == null ? 'tambah' : 'ubah',
            type: 'merchantAccountSize',
            title: buyerData?.largeArea == '' || buyerData?.largeArea == null ? 'Ubah Ukuran Toko' : 'Tambah Ukuran Toko',
          })}
          {renderContentSection({
            key: 'Foto Toko',
            fontColor: color.green50,
            value: buyerData?.imageUrl == '' || buyerData?.imageUrl == null ? '-' : 'Sudah diupload',
            action:  buyerData?.imageUrl == '' || buyerData?.imageUrl == null ? 'tambah' : 'ubah',
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
