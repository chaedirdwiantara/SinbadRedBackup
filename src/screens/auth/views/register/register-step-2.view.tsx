import { renderIF, useCamera, useMerchant } from '@screen/auth/functions';
import React from 'react';
import { View, Image, ToastAndroid, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
  SnbUploadPhotoRules,
  SnbButton,
} from 'react-native-sinbad-ui';
import { REGISTER_STEP_3_VIEW } from '@screen/auth/functions/screens_name';
import { useNavigation } from '@react-navigation/core';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';

const { height } = Dimensions.get('screen');

const Content: React.FC = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { upload, save } = useUploadImageAction();
  const { merchantData, saveUserData } = useMerchant();
  const { navigate } = useNavigation();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );

  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  React.useEffect(() => {
    if (
      stateGlobal.uploadImage.data !== null &&
      capturedImage.data?.type === 'ktp'
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Berhasil Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      saveUserData({ idImageUrl: stateGlobal.uploadImage.data.url });
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

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
        imgSrc={require('../../../../assets/images/ktp_image.png')}
        title="Unggah Foto KTP"
        buttonLabel="Ambil Foto KTP"
        rules={[
          'Pastikan KTP sesuai dengan identitas Anda',
          'KTP Tidak silau dan tidak buram',
          'Pastikan KTP bisa terbaca dengan jelas',
          'Hindari Tangan Menutupi KTP',
        ]}
        action={() => openCamera('ktp')}
      />
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'ktp';
    let action = () => {
      navigate(REGISTER_STEP_3_VIEW);
    };

    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
      action = () => {
        upload(dispatchGlobal, capturedImage.data.url);
      };
    } else {
      uri = merchantData.user?.idImageUrl;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 16, marginBottom: 0 }}>
          <SnbText.B3>Unggah Foto KTP</SnbText.B3>
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
              onPress={() => openCamera('ktp')}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Selanjutnya'}
              shadow
              loading={stateGlobal.uploadImage.loading}
              onPress={action}
              disabled={stateGlobal.uploadImage.loading}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    merchantData?.user?.idImageUrl !== '' || capturedImage.data?.type === 'ktp';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
        <View style={{ marginTop: 16 }}>
          <SnbText.B4>2/7 Profil Pemilik</SnbText.B4>
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
    </View>
  );
};

const RegisterStep2View: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep2View;
