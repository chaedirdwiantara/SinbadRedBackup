import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  SnbToast,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { View, Image, BackHandler } from 'react-native';
import {
  Stepper,
  ListOfSteps,
  ModalBack,
  UploadPhotoRules,
} from '../../shared/index';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import { DATA_DIRI_STEP_4_VIEW } from '@screen/account/functions/screens_name';
import { useCamera } from '@screen/account/functions';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { useEasyRegistration } from '@screen/account/functions';
import { NavigationAction } from '@navigation';

const DataDiriStep3View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOpenModalBack] = useState(false);
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { upload, save } = useUploadImageAction();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const [backHandle, setBackHandle] = useState(false);
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    backToDataCompleteness,
    refetchCompleteData,
  } = useEasyRegistration();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      resetUpdateCompleteData();
    };
  }, []);

  // HANDLE BACK DEVICE
  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setOpenModalBack(true);
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  React.useEffect(() => {
    if (
      stateGlobal.uploadImage.data !== null &&
      capturedImage.data?.type === 'selfie'
    ) {
      SnbToast.show('Foto Berhasil Diupload', 2500, { positionValue: 40 });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  //CONFIRM UPLOAD IMAGE
  const confirm = () => {
    if (capturedImage?.data?.url && capturedImage.data?.type === 'selfie') {
      upload(dispatchGlobal, capturedImage.data.url);
    } else {
      if (completeDataState?.data?.userData?.selfieImageUrl && isFocused) {
        NavigationAction.navigate(DATA_DIRI_STEP_4_VIEW);
      } else {
        openCamera('selfie');
      }
    }
  };

  //BACK AND SAVE
  const backSave = () => {
    if (capturedImage?.data?.url && capturedImage.data?.type === 'selfie') {
      upload(dispatchGlobal, capturedImage.data.url);
      setBackHandle(true);
    } else {
      backToDataCompleteness();
    }
  };

  //FOR CHECK IF IMAGE UPLOADED AND HIT API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (stateGlobal.uploadImage.data && capturedImage.data?.type === 'selfie') {
      updateCompleteData({
        user: { selfieImageUrl: stateGlobal.uploadImage?.data?.url },
      });
    }
  }, [stateGlobal.uploadImage.data, capturedImage.data?.type]);

  // FOR SAVE URL IMAGE TO DB USING API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (updateCompleteDataState.data !== null && isFocused) {
      refetchCompleteData();
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
        save(dispatchGlobal, '');
        resetCamera();
      } else {
        NavigationAction.navigate(DATA_DIRI_STEP_4_VIEW);
        resetUpdateCompleteData();
        save(dispatchGlobal, '');
        resetCamera();
      }
    }
  }, [updateCompleteDataState, isFocused]);

  const renderUploadPhotoRules = () => {
    return (
      <UploadPhotoRules
        rulesTitle="Pastikan Foto Diri dengan KTP Sesuai dengan Ketentuan"
        imgSrc={require('@image/selfie_image.png')}
        buttonLabel="Ambil Foto"
        rules={[
          'Posisikan KTP di bawah dagu Anda.',
          'KTP Tidak silau dan tidak buram.',
          'Pastikan informasi KTP bisa terbaca dengan jelas.',
          'Hindari Tangan Menutupi KTP.',
        ]}
        action={() => openCamera('selfie')}
        type="vertical"
        resizeMode="stretch"
      />
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'selfie';
    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
    } else {
      uri = completeDataState?.data?.userData?.selfieImageUrl;
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
            margin: layout.spacing.lg,
          }}
        />
        <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title="Ubah Foto"
              onPress={() => openCamera('selfie')}
              disabled={false}
              size="medium"
              full
              outline
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              disabled={stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
              title={'Lanjutkan'}
              onPress={() => confirm()}
              size="medium"
              full
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    completeDataState?.data?.userData?.selfieImageUrl !== null ||
    capturedImage.data?.type === 'selfie';

  return (
    <SnbContainer color="white">
      <View>
        <SnbTopNav2.Type3
          backAction={() => setOpenModalBack(true)}
          color="white"
          title="Foto Diri Dengan KTP"
        />
        <Stepper
          complete={completeDataState?.data?.userProgress?.completed}
          total={completeDataState?.data?.userProgress?.total}
          onPress={() => setOpenModalStep(true)}
        />
      </View>
      {isImageAvailable ? renderImagePreview() : renderUploadPhotoRules()}
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => backSave()}
      />
      <ListOfSteps
        open={openModalStep}
        type="user"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataDiriStep3View;
