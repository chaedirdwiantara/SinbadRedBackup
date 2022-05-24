import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { ScrollView, View, BackHandler } from 'react-native';
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
    const isPhoto =
      data.type === 'store' ? 'MerchantEditPhotoView' : 'MerchantEditView';

    NavigationAction.navigate(isPhoto, {
      title: data.title,
      type: data.type,
    });
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav2.Type3
        color="white"
        title="Informasi Toko"
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
          <View style={{ marginBottom: layout.spacing.xsm }}>
            <SnbText2.Body.Default color={color.black100}>
              {data.key}
            </SnbText2.Body.Default>
          </View>
          <SnbText2.Paragraph.Default
            color={data.fontColor ? data.fontColor : color.black60}>
            {data.value} {data.key === 'Ukuran Toko' && 'm\u00B2'}
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
  const content = () => {
    const buyerData = buyerDataState?.buyerInformation.buyerAccount;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: layout.spacing.lg }}>
        <View>
          {renderContentSection({
            key: 'ID Toko',
            value: buyerData?.code,
          })}
          {renderSeparator()}
          {renderContentSection({
            key: 'Kategori Toko',
            value: buyerData?.buyerCategory,
          })}
          {renderContentSection({
            key: 'Kategori Produk',
            value: buyerData?.productCategory,
          })}
          {renderSeparator()}
          {renderContentSection({
            key: 'Nama Toko',
            value: buyerData?.name,
            action:
              buyerData?.name === '' || buyerData?.name == null
                ? 'tambah'
                : 'ubah',
            type: 'merchantAccountName',
            title: buyerData?.name ? 'Ubah Nama Toko' : 'Tambah Nama Toko',
          })}
          {renderContentSection({
            key: 'Nomor Handphone Toko',
            value: buyerData?.phoneNo,
            action:
              buyerData?.phoneNo === '' || buyerData?.phoneNo == null
                ? 'tambah'
                : 'ubah',
            type: 'merchantAccountPhoneNo',
            title: buyerData?.phoneNo
              ? 'Ubah No. Handphone Toko'
              : 'Tambah No. Handphone Toko',
          })}
          {renderContentSection({
            key: 'Ukuran Toko',
            value: buyerData?.largeArea || 0,
            action:
              buyerData?.largeArea === '' || buyerData?.largeArea == null
                ? 'tambah'
                : 'ubah',
            type: 'merchantAccountSize',
            title:
              buyerData?.largeArea === '' || buyerData?.largeArea == null
                ? 'Ubah Ukuran Toko'
                : 'Tambah Ukuran Toko',
          })}
          {renderContentSection({
            key: 'Foto Toko',
            fontColor: color.green50,
            value:
              buyerData?.imageUrl === '' || buyerData?.imageUrl == null
                ? '-'
                : 'Sudah diupload',
            action:
              buyerData?.imageUrl === '' || buyerData?.imageUrl == null
                ? 'tambah'
                : 'ubah',
            type: 'store',
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
