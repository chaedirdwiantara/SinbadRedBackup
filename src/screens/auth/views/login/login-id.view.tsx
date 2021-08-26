import { useLogin } from '@screen/auth/functions';
import { REGISTER_VIEW } from '@screen/auth/screens_name';
import { loginPhoneStyles } from '@screen/auth/styles';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Header: React.FC = () => {
  const { goBack } = useLogin();
  return <SnbTopNav.Type3 backAction={goBack} type="white" title="" />;
};

const Content: React.FC = () => {
  const { func, state, navigate }: any = useLogin();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <SnbText.H1>Masuk</SnbText.H1>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField.Text
          type={state.type}
          labelText="ID Toko"
          maxLength={30}
          valMsgError={state.errorID}
          valMsgSuccess={state.errorID}
          onChangeText={func.handleOnChangeTextID}
          placeholder="Masukkan ID Toko anda"
          value={state.storeID}
          clearText={() => {
            func.setStoreID('');
            func.reinitializeState();
          }}
        />
      </View>
      <View style={{ height: 84, padding: 16, marginTop: 16 }}>
        <SnbTextField.Text
          type={state.type}
          labelText="Kata Sandi"
          maxLength={30}
          valMsgError={state.errorID}
          valMsgSuccess={state.errorID}
          secureTextEntry={!state.visiblePassword}
          suffixIconName={
            state.visiblePassword ? 'visibility' : 'visibility_off'
          }
          suffixAction={func.toggleVisibilityPassword}
          onChangeText={func.handleOnChangeTextPassword}
          placeholder="Masukkan Kata Sandi anda"
          value={state.password}
          clearText={() => {
            func.setPassword('');
            func.reinitializeState();
          }}
        />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Masuk"
          onPress={func.handleLoginIDProcess}
          type="primary"
          loading={state.loading}
          disabled={
            state.storeID === '' ||
            state.password === '' ||
            state.loading ||
            state.errorID
          }
        />
      </View>
      <View style={loginPhoneStyles.registerLink}>
        <View>
          <SnbText.B3>Belum punya akun Sinbad?</SnbText.B3>
        </View>
        <SnbButton.Dynamic
          title="Daftar"
          size="small"
          onPress={() => navigate(REGISTER_VIEW)}
          type="tertiary"
          disabled={false}
        />
      </View>
    </ScrollView>
  );
};

const LoginIDView: React.FC = () => {
  return (
    <SnbContainer color="white">
      <Header />
      <Content />
    </SnbContainer>
  );
};

export default LoginIDView;
