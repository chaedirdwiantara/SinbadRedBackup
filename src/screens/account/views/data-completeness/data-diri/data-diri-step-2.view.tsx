import { renderIF, useCamera } from '@screen/auth/functions';
import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { DATA_DIRI_STEP_3_VIEW } from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';
import { NavigationAction } from '@navigation';

const DataDiriStep2View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = React.useState(false);
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const [backHandle, setBackHandle] = React.useState(false);
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );

  const { openCamera, capturedImage, resetCamera } = useCamera();

  const { upload, save } = useUploadImageAction();
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
  } = useEasyRegistration();
  const { idImageUrl } = completeDataState.data?.userData || {};
  const isFocused  = useIsFocused();

  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      resetUpdateCompleteData();
    };
  }, []);

  React.useEffect(() => {
    if (
      Boolean(stateGlobal.uploadImage.data) &&
      capturedImage.data?.type === 'ktp'
    ) {
      updateCompleteData({
        user: { idImageUrl: stateGlobal.uploadImage.data?.url },
      });
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null && isFocused) {
      refetchCompleteData();
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
      } else {
        resetCamera();
        resetUpdateCompleteData();
        NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
      }
    }
  }, [updateCompleteDataState, isFocused]);

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

  const renderUploadPhotoRules = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
            imgSrc={require('@image/ktp_image.png')}
            buttonLabel="Ambil Foto"
            blurRadius={2}
            rules={[
              'Pastikan anda menggunakan KTP sendiri',
              'Foto KTP tidak silau dan tidak buram',
              'Pastikan informasi KTP bisa terbaca dengan jelas',
              'Hindari tangan menutup KTP',
            ]}
            action={() => openCamera('ktp')}
          />
        </View>
      </View>
    );
  };

  const renderImagePreview = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Image
          resizeMode="contain"
          source={{ uri: capturedImage?.data?.url || idImageUrl }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 0.6,
            margin: 16,
          }}
        />
        <View style={{ height: 72 }}>
          {renderIF(
            capturedImage?.data?.url,
            <SnbButton.Multiple
              leftType={'secondary'}
              rightType={'primary'}
              leftTitle={'Ulangi'}
              rightTitle={'Lanjutkan'}
              onPressLeft={() => openCamera('ktp')}
              onPressRight={() =>
                upload(dispatchGlobal, capturedImage.data.url)
              }
              rightDisabled={stateGlobal.uploadImage.loading}
              leftDisabled={stateGlobal.uploadImage.loading}
              rightLoading={stateGlobal.uploadImage.loading}
            />,
            <SnbButton.Multiple
              leftType={'secondary'}
              rightType={'primary'}
              leftTitle={'Ubah Foto'}
              rightTitle={'Lanjutkan'}
              onPressLeft={() => openCamera('ktp')}
              onPressRight={() => NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW)}
              rightDisabled={false}
              leftDisabled={false}
            />,
          )}
        </View>
      </View>
    );
  };

  //BACK AND SAVE
  const backSave = () => {
    if (capturedImage?.data?.url && capturedImage.data?.type === 'ktp') {
      upload(dispatchGlobal, capturedImage.data.url);
      setBackHandle(true);
    } else {
      backToDataCompleteness();
    }
  };

  const isImageAvailable =
    Boolean(idImageUrl) || capturedImage.data?.type === 'ktp';

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={() => setOpenModalBack(true)}
        type="white"
        title="Foto KTP"
      />
      <Stepper
        complete={completeDataState?.data?.userProgress?.completed}
        total={completeDataState?.data?.userProgress?.total}
        onPress={() => setOpenModalStep(true)}
      />
      <View style={{ flex: 1 }}>
        {renderIF(
          isImageAvailable,
          renderImagePreview(),
          renderUploadPhotoRules(),
        )}
      </View>
      <ListOfSteps
        open={openModalStep}
        type="user"
        closeModal={() => setOpenModalStep(false)}
      />
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => backSave()}
      />
    </SnbContainer>
  );
};

export default DataDiriStep2View;