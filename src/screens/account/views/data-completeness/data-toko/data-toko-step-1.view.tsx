import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SnbButton, SnbContainer, SnbText, SnbTextField, SnbTopNav } from 'react-native-sinbad-ui';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';
import { useEasyRegistration } from '@screen/account/functions';
import {
  DATA_TOKO_STEP_2_VIEW,
  DATA_COMPLETENESS_VIEW,
} from '@screen/account/functions/screens_name';

const DataTokoStep1View: React.FC = () => {
  const { navigate } = useNavigation();
  const { completeDataState } = useEasyRegistration();
  const [name, setName] = useState(
    completeDataState?.data?.data?.userData?.fullName,
  );
  const [telp, setTelp] = useState(
    completeDataState?.data?.data?.userData?.phone,
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
          total={3}
          onPress={() => setOpenModalStep(true)}
        />
        <View style={{ margin: 16 }}>
          <SnbText.H4>Sinbad ID</SnbText.H4>
          <SnbText.B1 color='#aaa'>001122334455</SnbText.B1>
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={'default'}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Contoh: Samsul'}
            labelText={'Nama Toko'}
            mandatory
          />
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={'phone'}
            keyboardType={'phone-pad'}
            value={telp}
            onChangeText={(text) => setTelp(text)}
            placeholder={'Contoh: 0812345678'}
            labelText={'Nomor Telepon Toko'}
            mandatory
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Lanjut"
          type="primary"
          disabled={name ? false : true}
          onPress={() => navigate(DATA_TOKO_STEP_2_VIEW)}
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOPenModalBack(false)}
        confirm={() => navigate(DATA_COMPLETENESS_VIEW)}
      />
      <ListOfSteps
        open={openModalStep}
        type="buyer"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataTokoStep1View;
