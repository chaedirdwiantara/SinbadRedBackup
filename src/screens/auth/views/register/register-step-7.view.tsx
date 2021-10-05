import { useNavigation } from '@react-navigation/core';
import {
  renderIF,
  useCamera,
  useRegister,
  useUploadImage,
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
} from 'react-native-sinbad-ui';

const { height } = Dimensions.get('screen');

const Content: React.FC = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { uploadImage, resetUploadImage, state: uploadData } = useUploadImage();
  const { registerData, saveRegisterStoreData, register } = useRegister();

  React.useEffect(() => {
    if (uploadData.data !== null && capturedImage.data?.type === 'store') {
      ToastAndroid.showWithGravityAndOffset(
        'Foto Berhasil Diupload',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        height * 0.25,
      );
      saveRegisterStoreData({ imageUrl: uploadData.data?.url });
      resetUploadImage();
      resetCamera();
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
      resetUploadImage();
    }
  }, [uploadData]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto Toko Anda Sesuai Ketentuan"
        imgSrc="https://s3-alpha-sig.figma.com/img/b7a0/6a7c/6986f21c9506bac08cb347133c502f7f?Expires=1632096000&Signature=FeF7I~iDW36Pi9e~FOQsVOyaw5HPjTcbsxpRRSwzWqrR9kxRdXvN3QZHumgZcrDSutQOB7mYshVK9PpJVT99LeiuBPA~VqTIJkTmf351R4ZUYjJ-yztjFw9fK3apM~LvkNv9kXO9oxYiYE7LhTaXJHKCVeXo3L7BmCOJGQVB96v9llfm-Qk6oMz2V3mnqlv2YcNAk8MxBOMa8SWY0m8T23C456~awPejQbzOeIOwDO7h0ZfjPsFJw8SRdxMn63Hlyz6t7HptYwG90g6VBBGw91s3Lv61nvKoZAUp-3mxvF2cWs5BX4lVmB7BKPNt~~DRiweLd3g3zpb88wzuEQ0hSA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
      resetCamera();
      resetUploadImage();
      register();
    };

    if (isImageCaptured) {
      uri = `data:image/jpg;base64,${capturedImage?.data?.croppedImage}`;
      action = () => {
        const payload = {
          base64: `data:image/png;base64,${capturedImage?.data.croppedImage}`,
          currentFilePath: registerData.imageUrl || null,
        };
        uploadImage(payload);
      };
    } else {
      uri = registerData.imageUrl;
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
              loading={uploadData?.loading}
              onPress={action}
              disabled={uploadData?.loading}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    registerData?.imageUrl !== '' || capturedImage.data?.type === 'store';

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
