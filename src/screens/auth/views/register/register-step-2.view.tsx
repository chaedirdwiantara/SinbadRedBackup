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
        imgSrc="https://s3-alpha-sig.figma.com/img/4e9b/f869/7b2c7d944da2051c0422f41d9b920d88?Expires=1631491200&Signature=J4sqf6bKuDT1xGesaA2s6W~h7ResGV9fSs6BnX60OWPNU5UMKhkZFnpHxcWH~RXRIVrBam5n5v6jVA8piyLprV5ab3l2-E3ar2ueK2X9K~wNQowIocdAheGhv5EanU6PiWyvQFls-LA7HkQeKOoJ17SHG~C2Xu9C~7RVT6JjlCVZg3bO8luil9pQI5BbatUEcSy8KkLLhrlpj9416wagJGFjpPhP-mrd6ssG2lFZ1dFYE2YfTY8Z35-Fjlyf7pBgWYOGFe4E2MqKpCifyFKR6qITS99qOxrDl~aDmsi0y8Bo0ycobady9GYe5D2X7J9L63uGrG9rWszKvzmozmg3rw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
