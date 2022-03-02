import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { View, ScrollView } from 'react-native';
import Svg from '@svg';
import { useNavigation } from '@react-navigation/core';
import {
  DATA_DIRI_STEP_2_VIEW,
  DATA_COMPLETENESS_VIEW,
} from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';

const DataDiriStep1View: React.FC = () => {
  const { navigate } = useNavigation();
  const { completeDataState } = useEasyRegistration();
  const [name, setName] = useState(
    completeDataState?.data?.data?.userData?.fullName,
  );
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOPenModalBack] = useState(false);

  return (
    <SnbContainer color="white">
      <ScrollView style={{ flex: 1 }}>
        <SnbTopNav.Type3
          backAction={() => setOPenModalBack(true)}
          type="white"
          title="Nama Lengkap"
        />
        <Stepper
          complete={1}
          total={7}
          onPress={() => setOpenModalStep(true)}
        />
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <Svg name="notification" size={240} />
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={'default'}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Masukkan Nama Lengkap'}
            labelText={'Nama Lengkap'}
            mandatory
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Lanjut"
          type="primary"
          disabled={name ? false : true}
          onPress={() => navigate(DATA_DIRI_STEP_2_VIEW)}
        />
      </View>
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

export default DataDiriStep1View;
