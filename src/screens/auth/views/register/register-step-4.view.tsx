import { useNavigation } from '@react-navigation/core';
import { renderIF, useCamera, useMerchant } from '@screen/auth/functions';
import { REGISTER_STEP_5_VIEW } from '@screen/auth/functions/screens_name';
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
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import RegisterProgress from '../shared/register-progress.component';

const Content: React.FC<{
  successUpload: () => void;
  failedUpload: () => void;
}> = ({ successUpload, failedUpload }) => {
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
      capturedImage.data?.type === 'npwp'
    ) {
      successUpload();
      saveUserData({ taxImageUrl: stateGlobal.uploadImage.data.url });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      failedUpload();
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  const renderUploadPhotoRules = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
            imgSrc={require('../../../../assets/images/npwp_image.png')}
            title="Unggah Foto NPWP"
            buttonLabel="Ambil Foto NPWP"
            rules={[
              'Pastikan NPWP sesuai dengan identitas Anda',
              'NPWP Tidak silau dan tidak buram',
              'Pastikan NPWP bisa terbaca dengan jelas',
              'Hindari Tangan Menutupi NPWP',
            ]}
            action={() => openCamera('npwp')}
          />
        </View>
        <View style={{ height: 72 }}>
          <SnbButton.Single
            type="secondary"
            title="Lewati"
            onPress={() => navigate(REGISTER_STEP_5_VIEW)}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'npwp';
    let action = () => {
      navigate(REGISTER_STEP_5_VIEW);
    };

    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
      action = () => {
        upload(dispatchGlobal, capturedImage.data.url);
      };
    } else {
      uri = merchantData.user?.taxImageUrl;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 16, marginBottom: 0 }}>
          <SnbText.B3>Unggah Foto NPWP</SnbText.B3>
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
              onPress={() => openCamera('npwp')}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              disabled={true || stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
              title={isImageCaptured ? 'Upload' : 'Selanjutnya'}
              onPress={action}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    merchantData?.user?.taxImageUrl !== '' ||
    capturedImage.data?.type === 'npwp';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
      </View>
      <RegisterProgress step={4} title="Profil Pemilik" />
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
    </View>
  );
};

const RegisterStep4View: React.FC = () => {
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

export default RegisterStep4View;
