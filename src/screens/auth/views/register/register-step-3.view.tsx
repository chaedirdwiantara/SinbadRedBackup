import { renderIF, useCamera, useMerchant } from '@screen/auth/functions';
import React from 'react';
import { View, Image, ToastAndroid, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { REGISTER_STEP_4_VIEW } from '@screen/auth/functions/screens_name';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import RegisterProgress from '../shared/register-progress.component';

const { height } = Dimensions.get('screen');

const Content: React.FC = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { merchantData, saveUserData } = useMerchant();
  const { navigate } = useNavigation();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { upload, save } = useUploadImageAction();

  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  React.useEffect(() => {
    if (
      stateGlobal.uploadImage.data !== null &&
      capturedImage.data?.type === 'selfie'
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Berhasil Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      saveUserData({
        selfieImageUrl: stateGlobal.uploadImage.data.url,
      });
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
        rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
        imgSrc={require('../../../../assets/images/selfie_image.png')}
        title="Unggah Foto Selfie KTP"
        buttonLabel="Ambil Foto Selfie & KTP"
        rules={[
          'Posisikan KTP di bawah dagu Anda',
          'KTP Tidak silau dan tidak buram',
          'Pastikan KTP bisa terbaca dengan jelas',
          'Hindari Tangan Menutupi KTP',
        ]}
        action={() => openCamera('selfie')}
      />
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'selfie';
    let uri: string | undefined = '';
    let action = () => {
      resetCamera();
      navigate(REGISTER_STEP_4_VIEW);
    };

    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
      action = () => {
        upload(dispatchGlobal, capturedImage.data.url);
      };
    } else {
      uri = merchantData.user?.selfieImageUrl;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 16, marginBottom: 0 }}>
          <SnbText.B3>Unggah Foto Selfie & KTP</SnbText.B3>
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
              onPress={() => {
                openCamera('selfie');
              }}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Selanjutnya'}
              shadow
              onPress={action}
              disabled={stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    merchantData?.user?.selfieImageUrl !== '' ||
    capturedImage.data?.type === 'selfie';
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
      </View>
      <RegisterProgress step={3} title="Profil Pemilik" />
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
    </View>
  );
};

const RegisterStep3View: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep3View;
