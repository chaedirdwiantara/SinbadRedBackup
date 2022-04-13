import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { View, BackHandler, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { useEasyRegistration } from '@screen/account/functions';
import { renderIF, useCamera } from '@screen/auth/functions';
import { OCRResultContent } from '@screen/shared/views/components';
import * as models from '@models';

interface Props {
  openModalBack: boolean;
  onCloseModalBack: (value: boolean) => void;
}

const Content: React.FC<Props> = (props) => {
  const [openModalBack, setOpenModalBack] = useState(false);
  const { openCameraWithOCR } = useCamera();
  const [value, setValue] = React.useState<models.IOCRResult | null>(null);

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

  function renderUploadPhotoRules() {
    return (
      <View style={{ flex: 1 }}>
        <SnbUploadPhotoRules
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
          blurRadius={3}
        />
      </View>
    );
  }

  function renderOCRResult() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <OCRResultContent value={setValue} />
          </ScrollView>
        </View>
        <View style={{ height: 72 }}>
          <SnbButton.Multiple
            leftType={'secondary'}
            rightType={'primary'}
            leftTitle={'Ubah Foto'}
            rightTitle={'Lanjutkan'}
            onPressLeft={() => {}}
            onPressRight={() => {}}
            rightDisabled={value?.ktpNumber === '' || value?.nameOnKTP === ''}
            leftDisabled={false}
            rightLoading={false}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderIF(true, renderUploadPhotoRules(), renderOCRResult())}
      <ModalBack
        open={openModalBack || props.openModalBack}
        closeModal={() => {
          setOpenModalBack(false);
          props.onCloseModalBack(false);
        }}
        confirm={() => {}}
      />
    </View>
  );
};

const DataDiriStep1View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = React.useState(false);
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const { completeDataState } = useEasyRegistration();

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
      <Content
        openModalBack={openModalBack}
        onCloseModalBack={setOpenModalBack}
      />
      <ListOfSteps
        open={openModalStep}
        type="user"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataDiriStep1View;
