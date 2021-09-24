import { renderIF, useCamera, useRegister } from '@screen/auth/functions';
import { useUploadImage } from '@screen/auth/functions/global-hooks.functions';
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
import * as models from '@models';
import { useNavigation } from '@react-navigation/core';
import { REGISTER_STEP_4_VIEW } from '@screen/auth/screens_name';

const { height } = Dimensions.get('screen');

const Content: React.FC = () => {
  const { openCamera, state: cameraData, resetCamera } = useCamera();
  const { uploadImage, resetUploadImage, state: uploadData } = useUploadImage();
  const { state: registerData, saveRegisterUserData } = useRegister();
  const { navigate } = useNavigation();

  const registerState: models.IRegisterMerchantProcess = registerData;

  React.useEffect(() => {
    if (uploadData.data !== null) {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Berhasil Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      saveRegisterUserData({ imageUrl: uploadData.data?.url });
    }

    if (uploadData.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Gagal Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      resetCamera();
      navigate(REGISTER_STEP_4_VIEW);
    }
  }, [uploadData]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
        imgSrc="https://s3-alpha-sig.figma.com/img/a472/29ec/6a39c819ea1b71b155ef102e6fe133bb?Expires=1631491200&Signature=He7sZQIlhUQ0DT5S567y7n5RRrp~Dc6oiBzC4dt4Y6pVQ9nTeR9sE3zGwpOndPB32dHUYkkdXh4eSvUkSa5zE-wN-6nTtDza3v~9oCnKccJxq285UsTfYT4Gotg7eBG7Ln-MIVcLKDSLL6rXbs1j5PdSCzyyLKp3CRrYavT9gOY7oCOKZvS7FHztGcQD885sYjyhwYd0dZcNM1XbSQpZllj3d0oRRaJqQIMZOVO6NH9E-U81LToTapltMzPQUXuwJr1qN3wnOjHDM2C6unmWCbPL07CXJJOhtp0vExmwUfOvdLc6z3N2fNeSCVx7~UAJ-GI48i~f0B4YoeDgMsb0Dw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
    const isImageUploaded =
      registerState.user?.selfieImageUrl !== '' && cameraData.data === null;
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={{
            uri:
              registerData.user?.selfieImageUrl ||
              `data:image/jpg;base64,${cameraData.data?.croppedImage}`,
          }}
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
              onPress={() => openCamera('selfie')}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type="primary"
              shadow
              title={isImageUploaded ? 'Selanjutnya' : 'Upload'}
              onPress={() => {
                if (isImageUploaded) {
                  saveRegisterUserData({ idImageUrl: '' });
                } else {
                  resetUploadImage();
                  const payload = {
                    base64: `data:image/png;base64,${cameraData?.data.croppedImage}`,
                    currentFilePath:
                      registerState?.user?.selfieImageUrl || null,
                  };
                  uploadImage(payload);
                }
              }}
              disabled={uploadData?.loading}
              loading={uploadData?.loading}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    registerData?.user?.selfieImageUrl !== '' ||
    (cameraData.data !== null && cameraData.data?.type === 'selfie');
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
        <View style={{ marginTop: 16 }}>
          <SnbText.B4>3/7 Profil Pemilik</SnbText.B4>
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
