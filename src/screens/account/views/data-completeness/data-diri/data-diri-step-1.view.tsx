import React from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import {
  Stepper,
  ListOfSteps,
  ModalBack,
  UploadPhotoRules,
} from '../../shared/index';
import { View, BackHandler, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation, useIsFocused } from '@react-navigation/core';
import { useEasyRegistration } from '@screen/account/functions';
import { renderIF, useCamera } from '@screen/auth/functions';
import { OCRResultContent } from '@screen/shared/views/components';
import * as models from '@models';
import { DATA_DIRI_STEP_2_VIEW } from '@screen/account/functions/screens_name';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';

interface Props {
  ref: any;
}

const Content: React.FC<Props> = React.forwardRef((_, ref: any) => {
  const { capturedImage, openCameraWithOCR } = useCamera();
  const [value, setValue] = React.useState<models.IOCRResult | any>(null);
  const {
    updateCompleteData,
    updateCompleteDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
    completeDataState,
    uploadImageSecureState,
  } = useEasyRegistration();
  const [backHandle, setBackHandle] = React.useState(false);
  const { navigate } = useNavigation();
  const userData = completeDataState.data?.userData;
  const isFocused = useIsFocused();
  const { ocrImageReset, ocrImageState } = useOCR()

  React.useEffect(() => {
    if (userData) {
      setValue({
        idNumber: userData?.idNo,
        nameOnKtp: userData?.fullName,
      });
    }
    ocrImageReset();
    return ocrImageReset;
  }, []);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null && isFocused) {
      refetchCompleteData();
      resetUpdateCompleteData();
      ocrImageReset();
      if (backHandle) {
        backToDataCompleteness();
      } else {
        navigate(DATA_DIRI_STEP_2_VIEW);
      }
    }
  }, [updateCompleteDataState]);

  function handleSave(actionFrom: 'simpan' | 'back') {
    const idNumberIsChanged = value.idNumber !== '' && value.idNumber !== userData.idNo;
    const nameIsChanged = value.nameOnKtp !== '' && value.nameOnKtp !== userData.fullName;

    actionFrom === 'back' && setBackHandle(true);

    if (idNumberIsChanged || nameIsChanged || ocrImageState.data !== null) {
      const user: any = {};
      if (nameIsChanged) {
        user.name = value.nameOnKtp
      }
      if (idNumberIsChanged) {
        user.idNo = value?.idNumber
      }
      if (ocrImageState.data?.uploadImageData?.data) {
        user.imageId = ocrImageState.data?.uploadImageData?.data?.id
      }
      updateCompleteData({ user });
    } else {
      actionFrom === 'back'
        ? backToDataCompleteness()
        : navigate(DATA_DIRI_STEP_2_VIEW);
    }
  }

  function renderUploadPhotoRules() {
    return (
      <View style={{ flex: 1 }}>
        <UploadPhotoRules
          rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
          imgSrc={require('@image/ktp_image.png')}
          buttonLabel="Ambil Foto"
          rules={[
            'Pastikan anda menggunakan KTP sendiri',
            'Foto KTP tidak silau dan tidak buram',
            'Pastikan informasi KTP bisa terbaca dengan jelas',
            'Hindari tangan menutup KTP',
          ]}
          action={() => openCameraWithOCR('ktp')}
          type="vertical"
          resizeMode="contain"
          listType="number"
          blurRadius={2.2}
          isTiltImage
          testID={'07.1'}
        />
      </View>
    );
  }

  function renderOCRResult() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <OCRResultContent
              value={value}
              onChangeValue={(result) => setValue(result)}
            />
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={'Ubah Foto'}
              onPress={() => openCameraWithOCR('ktp')}
              disabled={false}
              size="medium"
              full
              outline
              testID={'07.1'}
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={'Simpan'}
              onPress={() => handleSave('simpan')}
              disabled={
                value?.idNumber === '' ||
                value?.idNumber?.length < 16 ||
                value?.nameOnKtp === '' ||
                updateCompleteDataState.loading
              }
              loading={updateCompleteDataState.loading}
              size="medium"
              full
              testID={'07.1'}
            />
          </View>
        </View>
      </View>
    );
  }
  const isImageAvailable =
    ocrImageState.data !== null ||
    completeDataState.data?.userData?.imageId !== null;

  return (
    <View style={{ flex: 1 }}>
      {renderIF(isImageAvailable, renderOCRResult(), renderUploadPhotoRules())}
      <ModalBack ref={ref} confirm={() => handleSave('back')} />
    </View>
  );
});

const DataDiriStep1View: React.FC = () => {
  const refModalListOfStep = React.useRef<SnbBottomSheet2Ref>();
  const { completeDataState } = useEasyRegistration();
  const refModalBack = React.useRef<SnbBottomSheet2Ref>();

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        refModalBack.current?.open();
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => refModalBack.current?.open()}
        title="Foto KTP"
        color="white"
        testID={'07'}
      />
      <Stepper
        complete={completeDataState?.data?.userProgress?.completed}
        total={completeDataState?.data?.userProgress?.total}
        onPress={() => refModalListOfStep.current?.open()}
        testID={'07'}
      />
      <Content ref={refModalBack} />
      <ListOfSteps type="user" ref={refModalListOfStep} testID={'07.4'} />
    </SnbContainer>
  );
};

export default DataDiriStep1View;
