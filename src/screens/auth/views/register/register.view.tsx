import { useRegister } from '@screen/auth/functions';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Content: React.FC = () => {
  const { func, state }: any = useRegister();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField.Text
          type={state.type}
          labelText="Nomor Handphone"
          maxLength={16}
          keyboardType="phone-pad"
          onChangeText={func.handleOnChangeTextPhone}
          valMsgError={state.phoneError}
          placeholder="Masukkan nomor handphone anda"
          value={state.phone}
          clearText={() => {
            func.setPhone('');
            func.reinitializeState();
          }}
        />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Selanjutnya"
          onPress={func.handleRegisterProcess}
          type="primary"
          loading={state.loading}
          disabled={
            state.phone === '' || state.phoneError !== '' || state.loading
          }
        />
      </View>
    </ScrollView>
  );
};

const RegisterView: React.FC = () => {
  const { goBack } = useRegister();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterView;
