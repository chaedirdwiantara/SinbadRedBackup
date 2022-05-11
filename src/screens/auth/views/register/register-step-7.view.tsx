import { useNavigation } from '@react-navigation/core';
import {
  renderIF,
  useCamera,
  useMerchant,
  useRegister,
  useTextFieldSelect,
} from '@screen/auth/functions';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
  SnbUploadPhotoRules,
  SnbButton,
  SnbBottomSheet,
  SnbCheckbox,
  SnbToast,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import RegisterProgress from '../shared/register-progress.component';

const Content: React.FC = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { upload, save } = useUploadImageAction();
  const { merchantData, saveStoreData } = useMerchant();
  const { register, registerState, resetRegister } = useRegister();
  const { reset } = useNavigation();
  const [showModalFailed, setShowModalFailed] = React.useState(false);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);
  const [showModalPrivacyPolicy, setShowModalPrivacyPolicy] =
    React.useState(false);
  const [checked, setChecked] = React.useState<'unselect' | 'selected'>(
    'unselect',
  );
  const [messageError, setMessageError] = React.useState('');
  const { resetGetSelection, resetSelectedItem } = useTextFieldSelect();

  React.useEffect(() => {
    resetRegister();
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      resetRegister();
    };
  }, []);

  React.useEffect(() => {
    if (
      stateGlobal.uploadImage.data !== null &&
      capturedImage.data?.type === 'store'
    ) {
      SnbToast.show('Foto Berhasil Diupload', 2500, { positionValue: 40 });
      saveStoreData({ imageUrl: stateGlobal.uploadImage.data.url });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  React.useEffect(() => {
    if (registerState.data?.data?.isCreated === true) {
      setShowModalSuccess(true);
    }
    if (registerState.data?.data?.isCreated === false) {
      setShowModalFailed(true);
      setMessageError('Toko gagal dibuat karena ada kesalahan pada server');
    }
    if (registerState.error !== null) {
      setShowModalFailed(true);
      setMessageError('Toko gagal dibuat karena ada kesalahan pada server');
    }
  }, [registerState]);

  const renderUploadPhotoRules = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto Toko Anda Sesuai Ketentuan"
            imgSrc={require('../../../../assets/images/store_image.png')}
            title="Unggah Foto Toko"
            buttonLabel="Ambil Foto Toko"
            rules={[
              'Pastikan foto toko terlihat dengan jelas',
              'Foto Tidak silau dan tidak buram',
              'Pastikan foto fokus keseluruhan toko',
            ]}
            action={() => openCamera('store')}
          />
        </View>
        <View style={{ height: 72 }}>
          <SnbButton.Single
            type="secondary"
            title="Selesai"
            onPress={() => {
              setChecked('unselect');
              setShowModalPrivacyPolicy(true);
            }}
            disabled={true || registerState?.loading}
            loading={registerState?.loading}
          />
        </View>
      </View>
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'store';
    let uri: string | undefined = '';
    let action = () => {
      setChecked('unselect');
      setShowModalPrivacyPolicy(true);
    };

    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
      action = () => {
        upload(dispatchGlobal, capturedImage.data.url);
      };
    } else {
      uri = merchantData.imageUrl;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 16, marginBottom: 0 }}>
          <SnbText.B3>Unggah Foto Toko</SnbText.B3>
        </View>
        <Image
          resizeMode="contain"
          source={{ uri }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 1,
            margin: 16,
          }}
        />
        <View style={{ flex: 0.75, justifyContent: 'space-between' }}>
          <View style={{ height: 72 }}>
            <SnbButton.Dynamic
              size="small"
              type="tertiary"
              title="Ubah Foto"
              onPress={() => openCamera('store')}
              disabled={true || false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Selesai'}
              onPress={action}
              disabled={
                true ||
                stateGlobal.uploadImage.loading ||
                registerState?.loading
              }
              loading={
                stateGlobal.uploadImage.loading || registerState?.loading
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const renderSheetContent = () => {
    if (showModalSuccess) {
      return (
        <View>
          <Image
            source={require('../../../../assets/images/sinbad_image/smile_sinbad.png')}
            style={{
              height: 160,
              width: 160,
              alignSelf: 'center',
              marginVertical: 16,
            }}
          />
          <View style={{ margin: 16 }}>
            <SnbText.B2 align="center">
              Selamat, Akun Anda sudah Terdaftar
            </SnbText.B2>
            <View style={{ marginVertical: 8 }} />
            <SnbText.B3 align="center">
              Akun Anda berhasil terdaftar. Nikmati kemudahan berbelanja dengan
              menggunakan aplikasi Sinbad.
            </SnbText.B3>
          </View>
          <View style={{ height: 75 }}>
            <SnbButton.Single
              title="Selesai"
              type="primary"
              disabled={false}
              onPress={() => {
                setShowModalSuccess(false);
                setShowModalPrivacyPolicy(false);
                setShowModalFailed(false);
                resetGetSelection();
                resetSelectedItem();
                reset({
                  index: 0,
                  routes: [{ name: 'LoginPhoneView' }],
                });
              }}
            />
          </View>
        </View>
      );
    }

    if (showModalFailed) {
      return (
        <View>
          <Image
            source={require('../../../../assets/images/sinbad_cry.png')}
            style={{
              height: 160,
              width: 160,
              alignSelf: 'center',
              marginVertical: 16,
            }}
          />
          <View style={{ margin: 16 }}>
            <SnbText.B2 align="center">Toko Anda Gagal Dibuat</SnbText.B2>
            <View style={{ marginVertical: 8 }} />
            <SnbText.B3 align="center">{messageError}</SnbText.B3>
          </View>
          <View style={{ height: 75 }}>
            <SnbButton.Single
              title="Kembali Ke Beranda"
              type="primary"
              disabled={false}
              onPress={() => {
                setShowModalPrivacyPolicy(false);
                setShowModalFailed(false);
                reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              }}
            />
          </View>
        </View>
      );
    }

    if (showModalPrivacyPolicy) {
      return (
        <View style={{ height: '100%' }}>
          <View style={{ padding: 16, height: '80%' }}>
            <ScrollView>
              <SnbText.B3 align="justify">
                Kebijakan Privasi ini adalah bentuk komitmen dari Sinbad untuk
                menghargai dan melindungi setiap data atau informasi pribadi
                Pengguna aplikasi Sinbad (selanjutnya disebut sebagai
                "aplikasi").
                {'\n'}
                {'\n'}
                Kebijakan Privasi ini menetapkan dasar atas perolehan,
                pengumpulan, pengolahan, penganalisisan, penampilan, pembukaan,
                dan/atau segala bentuk pengelolaan yang terkait dengan data atau
                informasi yang Pengguna berikan kepada Sinbad atau yang Sinbad
                kumpulkan dari Pengguna, termasuk data pribadi Pengguna, baik
                pada saat pengguna mengakses aplikasi dan mempergunakan
                layanan-layanan pada aplikasi (selanjutnya disebut sebagai
                "data").
                {'\n'}
                {'\n'}
                Dengan mengakses dan/atau mempergunakan layanan Sinbad, Pengguna
                menyatakan bahwa setiap data Pengguna merupakan data yang benar
                dan sah, serta Pengguna memberikan persetujuan kepada Sinbad
                untuk memperoleh, mengumpulkan, menyimpan, mengelola dan
                mempergunakan data tersebut sebagaimana tercantum dalam
                Kebijakan Privasi Sinbad.
              </SnbText.B3>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <SnbCheckbox
                status={checked}
                onPress={() =>
                  setChecked(checked === 'selected' ? 'unselect' : 'selected')
                }
              />
              <View style={{ marginHorizontal: 8 }} />
              <SnbText.B3 color={color.black60}>
                Saya menyetujui{' '}
                <SnbText.B3 color={color.red50}> Kebijakan Privasi </SnbText.B3>{' '}
                yang berlaku
              </SnbText.B3>
            </View>
          </View>
          <View style={{ height: 75 }}>
            <SnbButton.Single
              title="Setuju"
              type="primary"
              disabled={checked === 'unselect'}
              onPress={() => {
                setShowModalPrivacyPolicy(false);
                setShowModalFailed(false);
                resetRegister();
                register();
              }}
            />
          </View>
        </View>
      );
    }

    return null;
  };

  const isImageAvailable =
    merchantData?.imageUrl !== '' || capturedImage.data?.type === 'store';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
      </View>
      <RegisterProgress step={7} title="Data Toko" />
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
      <SnbBottomSheet
        open={showModalSuccess}
        title={''}
        content={renderSheetContent()}
        size={'normal'}
      />
      <SnbBottomSheet
        closeAction={() => {
          setShowModalPrivacyPolicy(false);
          setShowModalFailed(false);
        }}
        actionIcon="close"
        open={showModalPrivacyPolicy || showModalFailed}
        title={showModalPrivacyPolicy ? 'Kebijakan Privasi' : ''}
        content={renderSheetContent()}
        size={showModalPrivacyPolicy ? 'halfscreen' : 'normal'}
      />
    </View>
  );
};

const RegisterStep7View: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep7View;
