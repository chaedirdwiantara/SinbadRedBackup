import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbUploadPhotoRules,
  SnbToast,
} from 'react-native-sinbad-ui';
import { View, Image } from 'react-native';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { useNavigation } from '@react-navigation/core';
import {
  DATA_COMPLETENESS_VIEW,
  DATA_DIRI_STEP_5_VIEW,
} from '@screen/account/functions/screens_name';
import { useCamera } from '@screen/account/functions';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';

const DataDiriStep4View: React.FC = () => {
  const { navigate } = useNavigation();
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOPenModalBack] = useState(false);
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { upload, save } = useUploadImageAction();
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
      capturedImage.data?.type === 'selfie'
    ) {
      SnbToast.show('Foto Berhasil Diupload', 2500, { positionValue: 40 });
      // saveUserData({ taxImageUrl: stateGlobal.uploadImage.data.url });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  React.useEffect(() => {
    if (stateGlobal.uploadImage.data) {
      navigate(DATA_DIRI_STEP_5_VIEW);
      save(dispatchGlobal, '');
    }
  }, [stateGlobal.uploadImage.data]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto Diri dengan KTP Sesuai dengan Ketentuan"
        imgSrc={require('../../../../../assets/images/selfie_image.png')}
        buttonLabel="Ambil Foto"
        rules={[
          'Posisikan KTP di bawah dagu Anda.',
          'KTP Tidak silau dan tidak buram.',
          'Pastikan informasi KTP bisa terbaca dengan jelas.',
          'Hindari Tangan Menutupi KTP.',
        ]}
        action={() => openCamera('selfie')}
        listType={'number'}
      />
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'selfie';
    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
    }
    // else {
    //   uri = merchantData.user?.taxImageUrl;
    // }
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
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type="secondary"
              title="Ulangi"
              onPress={() => openCamera('selfie')}
              disabled={false}
            />
          </View>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type={'primary'}
              disabled={stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
              title={'Lanjutkan'}
              onPress={() => upload(dispatchGlobal, capturedImage.data.url)}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    // merchantData?.user?.taxImageUrl !== '' ||
    capturedImage.data?.type === 'selfie';

  return (
    <SnbContainer color="white">
      <View>
        <SnbTopNav.Type3
          backAction={() => setOPenModalBack(true)}
          type="white"
          title="Foto Diri Dengan KTP"
        />
        <Stepper
          complete={4}
          total={7}
          onPress={() => setOpenModalStep(true)}
        />
      </View>
      {isImageAvailable ? renderImagePreview() : renderUploadPhotoRules()}
      <ModalBack
        open={openModalBack}
        closeModal={() => setOPenModalBack(false)}
        confirm={() => navigate(DATA_COMPLETENESS_VIEW)}
      />
      <ListOfSteps
        open={openModalStep}
        type="user"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataDiriStep4View;
