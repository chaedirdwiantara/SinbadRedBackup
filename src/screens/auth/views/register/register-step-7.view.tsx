import { useNavigation } from '@react-navigation/core';
import {
  renderIF,
  useCamera,
  useMerchant,
  useRegister,
} from '@screen/auth/functions';
import React from 'react';
import { View, Image, ToastAndroid, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
  SnbUploadPhotoRules,
  SnbButton,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';

const { height } = Dimensions.get('screen');

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
      ToastAndroid.showWithGravityAndOffset(
        'Foto Berhasil Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      saveStoreData({ imageUrl: stateGlobal.uploadImage.data.url });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Gagal Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  React.useEffect(() => {
    if (registerState.data?.data?.isCreated) {
      reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
    if (registerState.data?.data?.isCreated === false) {
      setShowModalFailed(true);
    }
  }, [registerState]);

  const renderUploadPhotoRules = () => {
    return (
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
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'store';
    let uri: string | undefined = '';
    let action = () => {
      resetRegister();
      register();
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
              title="Ulangi"
              onPress={() => openCamera('store')}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Selesai'}
              shadow
              onPress={action}
              disabled={
                stateGlobal.uploadImage.loading || registerState?.loading
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

  const isImageAvailable =
    merchantData?.imageUrl !== '' || capturedImage.data?.type === 'store';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
        <View style={{ marginTop: 16 }}>
          <SnbText.B4>7/7 Data Toko</SnbText.B4>
          <View style={{ marginVertical: 4 }} />
          <View
            style={{ height: 8, backgroundColor: color.red60, borderRadius: 8 }}
          />
        </View>
      </View>
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
      <SnbBottomSheet
        open={showModalFailed}
        actionIcon="close"
        title="Gagal Membuat Toko"
        content={
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
            <View style={{ marginVertical: 16 }}>
              <SnbText.B3 align="center">
                Toko gagal dibuat karena ada kesalahan pada server
              </SnbText.B3>
            </View>
            <SnbButton.Single
              title="Tutup"
              type="primary"
              disabled={false}
              onPress={() => setShowModalFailed(false)}
            />
          </View>
        }
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
