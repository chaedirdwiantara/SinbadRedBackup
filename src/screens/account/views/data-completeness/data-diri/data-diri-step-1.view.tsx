import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps } from '../../shared/index';
import { View, ScrollView } from 'react-native';
import Svg from '@svg';
import { useNavigation } from '@react-navigation/core';
import { DATA_DIRI_STEP_2_VIEW } from '@screen/account/functions/screens_name';

const DataDiriStep1View: React.FC = () => {
  const { navigate } = useNavigation();
  const [storeName, setStoreName] = useState('');
  const [openModalStep, setOpenModalStep] = useState(false);

  const listOfSteps = () => {
    return (
      <View>
        <SnbBottomSheet
          open={openModalStep}
          content={
            <ListOfSteps
              type="user"
              closeModal={() => setOpenModalStep(false)}
            />
          }
          closeAction={() => setOpenModalStep(false)}
          isSwipeable
          title="Konfirmasi Data Diri"
          actionIcon="close"
        />
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <ScrollView style={{ flex: 1 }}>
        <SnbTopNav.Type3
          backAction={() => {}}
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
            value={storeName}
            onChangeText={(text) => setStoreName(text)}
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
          disabled={storeName ? false : true}
          onPress={() => navigate(DATA_DIRI_STEP_2_VIEW)}
        />
      </View>
      {listOfSteps()}
    </SnbContainer>
  );
};

export default DataDiriStep1View;
