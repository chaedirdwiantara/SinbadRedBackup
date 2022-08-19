import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  SnbToast,
  SnbTextField2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { View, Image, BackHandler, ScrollView } from 'react-native';
import {
  Stepper,
  ListOfSteps,
  ModalBack,
  UploadPhotoRules,
} from '../../shared/index';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import { DATA_DIRI_STEP_3_VIEW } from '@screen/account/functions/screens_name';
import { useCamera } from '@screen/account/functions';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { useEasyRegistration } from '@screen/account/functions';
import { NavigationAction } from '@navigation';
import { useInputFormat } from '@screen/auth/functions';

const DataDiriStep2View: React.FC = () => {
  const refModalListOfStep = React.useRef<SnbBottomSheet2Ref>()
  const refModalBack = React.useRef<SnbBottomSheet2Ref>()
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

  const npwp = useInputFormat(completeDataState?.data?.userData?.taxNo || '', 'number-only', 'npwp');
  const userData = completeDataState.data?.userData;

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
        refModalBack.current?.open()
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  React.useEffect(() => {
    if (stateGlobal.uploadImage.data !== null && capturedImage.data?.type === 'npwp') {
      SnbToast.show('Foto Berhasil Diupload', 2500, { positionValue: 40 });
      const npwpIsChanged =
        npwp.value !== '' &&
        npwp.value.replace(/[^0-9]/g, '') !== userData.taxNo;
      const user: any = {
        taxImageUrl: stateGlobal.uploadImage?.data?.url,
      };
      npwpIsChanged &&
        (user.taxNo = npwp.value?.replace(/[^0-9]/g, ''));
      updateCompleteData({ user });
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  // FOR SAVE URL IMAGE TO DB USING API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (updateCompleteDataState.data !== null && isFocused) {
      refetchCompleteData();
      resetUpdateCompleteData();
      save(dispatchGlobal, '');
      resetCamera();
      if (backHandle) {
        backToDataCompleteness();
      } else {
        NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
      }
    }
  }, [updateCompleteDataState, isFocused]);

  function handleSave(actionFrom: 'simpan' | 'back') {
    const npwpIsChanged =
      npwp.value !== '' &&
      npwp.value.replace(/[^0-9]/g, '') !== userData.taxNo;

    actionFrom === 'back' && setBackHandle(true);

    if (capturedImage?.data?.type === 'npwp') {
      upload(dispatchGlobal, capturedImage.data.url)
    } else if (npwpIsChanged) {
      const user: any = {};
      npwpIsChanged && (user.taxNo = npwp.value?.replace(/[^0-9]/g, ''));
      updateCompleteData({ user });
    } else {
      actionFrom === 'back'
        ? backToDataCompleteness()
        : NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
    }
  }

  const renderUploadPhotoRules = () => {
    return (
      <UploadPhotoRules
        rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
        imgSrc={require('@image/npwp_image.png')}
        buttonLabel="Ambil Foto"
        rules={[
          'Pastikan anda menggunakan NPWP sendiri',
          'Foto NPWP tidak silau dan tidak buram',
          'Pastikan informasi NPWP bisa terbaca dengan jelas',
          'Hindari tangan menutup NPWP',
        ]}
        action={() => openCamera('npwp')}
        type="vertical"
        resizeMode="contain"
        listType="number"
        blurRadius={3}
        isTiltImage
        testID={'08.1'}
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
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: layout.spacing.xl,
              maxHeight: 370,
            }}>
            <Image
              resizeMode="contain"
              source={{ uri }}
              borderRadius={4}
              style={{
                height: 200,
                width: undefined,
                marginBottom: layout.spacing.md,
              }}
            />
            <View style={{ padding: 16 }} />
            <SnbTextField2.Text
              {...npwp}
              labelText={'Nomor NPWP'}
              placeholder={'Masukkan Nomor NPWP'}
              keyboardType="number-pad"
              testID={'08.1'}
            />
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title="Ubah Foto"
              onPress={() => openCamera('npwp')}
              disabled={false}
              size="medium"
              full
              outline
              testID={'08.3'}
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              loading={
                stateGlobal.uploadImage.loading ||
                updateCompleteDataState.loading
              }
              title={'Lanjutkan'}
              disabled={
                stateGlobal.uploadImage.loading ||
                updateCompleteDataState.loading ||
                npwp?.value?.length < 20
              }
              onPress={() => handleSave('simpan')}
              size="medium"
              full
              testID={'08.3'}
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
        <SnbTopNav2.Type3
          backAction={() => refModalBack.current?.open()}
          color="white"
          title="Foto NPWP"
          testID={'08'}
        />
        <Stepper
          complete={completeDataState?.data?.userProgress?.completed}
          total={completeDataState?.data?.userProgress?.total}
          onPress={() => refModalListOfStep.current?.open()}
          testID={'08'}
        />
      </View>
      {isImageAvailable ? renderImagePreview() : renderUploadPhotoRules()}
      <ModalBack
        ref={refModalBack}
        confirm={() => handleSave('back')}
      />
      <ListOfSteps
        type="user"
        ref={refModalListOfStep}
        testID={'08.4'}
      />
    </SnbContainer>
  );
};

export default DataDiriStep2View;
