import { renderIF, useCamera, useMerchant } from '@screen/auth/functions';
import React from 'react';
import { View, Image } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { REGISTER_STEP_3_VIEW } from '@screen/auth/functions/screens_name';
import { useNavigation } from '@react-navigation/core';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import RegisterProgress from '../shared/register-progress.component';

const Content: React.FC<{
  successUpload: () => void;
  failedUpload: () => void;
}> = ({ successUpload, failedUpload }) => {
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
      successUpload();
      saveUserData({ idImageUrl: stateGlobal.uploadImage.data.url });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      failedUpload();
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
              loading={stateGlobal.uploadImage.loading}
              onPress={action}
              disabled={true || stateGlobal.uploadImage.loading}
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
      </View>
      <RegisterProgress step={2} title="Profil Pemilik" />
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
  const toast = React.useRef<any>();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content
        successUpload={() => toast.current.show('Foto Berhasil Diupload')}
        failedUpload={() => toast.current.show('Foto Gagal Diupload')}
      />
      <SnbToast
        ref={toast}
        duration={3000}
        position="bottom"
        positionValue={40}
      />
    </SnbContainer>
  );
};

export default RegisterStep2View;
