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

  const [npwp, setNpwp] = React.useState(
    completeDataState?.data?.userData?.taxNo || '',
  );
  const [messageErrorNPWP, setMessageErrorNPWP] = React.useState('');

  const [isNPWPValid, setIsNPWPValid] = React.useState(false);
  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      resetUpdateCompleteData();
    };
  }, []);

  React.useEffect(() => {
    if (npwp) {
      if (npwp?.length === 15 || npwp === '' || npwp === null) {
        setMessageErrorNPWP('');
        setIsNPWPValid(true);
      } else {
        setMessageErrorNPWP('Pastikan Nomor NPWP 15 Digit');
        setIsNPWPValid(false);
      }
    }
  }, [npwp]);

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

  //BACK AND SAVE
  const backSave = () => {
    if (capturedImage?.data?.url && capturedImage.data?.type === 'npwp') {
      upload(dispatchGlobal, capturedImage.data.url);
      setBackHandle(true);
    } else if (isNPWPValid) {
      if (
        npwp === completeDataState?.data?.userData?.taxNo ||
        npwp === '' ||
        npwp === null
      ) {
        backToDataCompleteness();
      } else {
        updateCompleteData({
          user: { taxNo: npwp },
        });
      }
      setBackHandle(true);
    } else {
      backToDataCompleteness();
    }
  };

  //FOR CHECK IF IMAGE UPLOADED AND HIT API UPDATE COMPLETENESS DATA
  React.useEffect(() => {
    if (stateGlobal.uploadImage.data && capturedImage.data?.type === 'npwp') {
      updateCompleteData({
        user: {
          taxImageUrl: stateGlobal.uploadImage?.data?.url,
          taxNo: isNPWPValid ? npwp : null,
        },
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
        NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
        resetUpdateCompleteData();
        save(dispatchGlobal, '');
        resetCamera();
      }
    }
  }, [updateCompleteDataState, isFocused]);

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
              type={npwp ? (isNPWPValid ? 'default' : 'error') : 'default'}
              value={npwp}
              maxLength={15}
              helperText={'Abaikan bila sudah sesuai NPWP'}
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                setNpwp(text);
                setIsNPWPValid(false);
                setMessageErrorNPWP('');
                if (text?.length === 15 || text === '' || text === null) {
                  setMessageErrorNPWP('');
                  setIsNPWPValid(true);
                } else {
                  setMessageErrorNPWP('Pastikan Nomor NPWP 15 Digit');
                  setIsNPWPValid(false);
                }
              }}
              placeholder={'Masukkan Nomor NPWP'}
              labelText={'Nomor NPWP'}
              keyboardType={'number-pad'}
              mandatory
              valMsgError={messageErrorNPWP}
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
                !isNPWPValid ||
                !npwp
              }
              onPress={() => {
                if (capturedImage.data) {
                  upload(dispatchGlobal, capturedImage.data.url);
                } else if (isNPWPValid) {
                  if (
                    npwp === completeDataState?.data?.userData?.taxNo ||
                    npwp === '' ||
                    npwp === null
                  ) {
                    NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
                  } else {
                    updateCompleteData({
                      user: { taxNo: npwp },
                    });
                  }
                }
              }}
              size="medium"
              full
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
        />
        <Stepper
          complete={completeDataState?.data?.userProgress?.completed}
          total={completeDataState?.data?.userProgress?.total}
          onPress={() => refModalListOfStep.current?.open()}
        />
      </View>
      {isImageAvailable ? renderImagePreview() : renderUploadPhotoRules()}
      <ModalBack
        ref={refModalBack}
        confirm={() => backSave()}
      />
      <ListOfSteps
        type="user"
        ref={refModalListOfStep}
      />
    </SnbContainer>
  );
};

export default DataDiriStep2View;
