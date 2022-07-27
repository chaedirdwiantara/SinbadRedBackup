import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
  Text,
  SnbIcon,
  colorV2,
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
      testID: data.testID,
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
        testID={'06.1'}
      />
    );
  };
  /** === RENDER CONTENT SECTION === */
  const renderContentSection = (data: any) => {
    return (
      <View style={MerchantStyles.boxContent}>
        <Text.Output
          title={data.key}
          actionComponentAlign="center"
          testID={'06.1'}
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
            testID: '05.1',
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
