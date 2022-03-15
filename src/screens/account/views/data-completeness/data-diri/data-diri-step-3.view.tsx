import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbUploadPhotoRules,
  SnbToast,
} from 'react-native-sinbad-ui';
import { View, Image, BackHandler } from 'react-native';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { DATA_DIRI_STEP_4_VIEW } from '@screen/account/functions/screens_name';
import { useCamera } from '@screen/account/functions';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { useEasyRegistration } from '@screen/account/functions';

const DataDiriStep3View: React.FC = () => {
  const { navigate } = useNavigation();
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
      capturedImage.data?.type === 'npwp'
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
    if (capturedImage?.data?.url && capturedImage.data?.type === 'npwp') {
      upload(dispatchGlobal, capturedImage.data.url);
    } else {
      if (completeDataState?.data?.userData?.taxImageUrl) {
        navigate(DATA_DIRI_STEP_4_VIEW);
      } else {
        openCamera('npwp');
      }
    }
  };

  //BACK AND SAVE
  const backSave = () => {
    if (capturedImage?.data?.url && capturedImage.data?.type === 'npwp') {
      upload(dispatchGlobal, capturedImage.data.url);
      setBackHandle(true);
    } else {
      backToDataCompleteness();
    }
  };

  //FOR CHECK IF IMAGE UPLOADED AND HIT API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (stateGlobal.uploadImage.data && capturedImage.data?.type === 'npwp') {
      updateCompleteData({
        user: { taxImageUrl: stateGlobal.uploadImage?.data?.url },
      });
    }
  }, [stateGlobal.uploadImage.data, capturedImage.data?.type]);

  // FOR SAVE URL IMAGE TO DB USING API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      refetchCompleteData();
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
        save(dispatchGlobal, '');
        resetCamera();
      } else {
        navigate(DATA_DIRI_STEP_4_VIEW);
        resetUpdateCompleteData();
        save(dispatchGlobal, '');
        resetCamera();
      }
    }
  }, [updateCompleteDataState]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
        imgSrc={require('../../../../../assets/images/npwp_image.png')}
        buttonLabel="Ambil Foto"
        rules={[
          'Pastikan NPWP sesuai dengan identitas Anda',
          'NPWP Tidak silau dan tidak buram',
          'Pastikan NPWP bisa terbaca dengan jelas',
          'Hindari Tangan Menutupi NPWP',
        ]}
        action={() => openCamera('npwp')}
      />
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage?.data?.type === 'npwp';
    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
    } else {
      uri = completeDataState?.data?.userData?.taxImageUrl;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'space-between'}}>
        <Image
          resizeMode="contain"
          source={{ uri }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 0.6,
            margin: 16,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type="secondary"
              title="Ulangi"
              onPress={() => openCamera('npwp')}
              disabled={false}
            />
          </View>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type={'primary'}
              disabled={stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
              title={'Lanjutkan'}
              onPress={() => confirm()}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    completeDataState?.data?.userData?.taxImageUrl !== null ||
    capturedImage.data?.type === 'npwp';

  return (
    <SnbContainer color="white">
      <View>
        <SnbTopNav.Type3
          backAction={() => setOpenModalBack(true)}
          type="white"
          title="Foto NPWP"
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
