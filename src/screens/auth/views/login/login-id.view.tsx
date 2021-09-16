import { useNavigation } from '@react-navigation/core';
import { useInput } from '@screen/auth/functions';
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
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

const Content: React.FC = () => {
  const { navigate, reset } = useNavigation();
  const storeID = useInput('08966666670');
  const password = useInput('sinbad');
  const { loginUserName, state, resetLoginUsername } = useAuthAction();

  React.useEffect(() => {
    if (state.data) {
      storeID.clearText();
      password.clearText();
      resetLoginUsername();
      reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    if (state.error) {
      password.setMessageError(state.error.message);
    }
  }, [state]);

  React.useEffect(() => {
    return () => resetLoginUsername();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <SnbText.H1>Masuk</SnbText.H1>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField.Text
          {...storeID}
          labelText="ID Toko"
          placeholder="Masukkan ID toko Anda"
        />
      </View>
      <View style={{ height: 84, padding: 16, marginTop: 16 }}>
        <SnbTextField.Text
          {...password}
          labelText="Kata Sandi"
          placeholder="Masukkan kata sandi Anda"
          // secureTextEntry={!state.visiblePassword}
          // suffixIconName={
          //   state.visiblePassword ? 'visibility' : 'visibility_off'
          // }
          // suffixAction={func.toggleVisibilityPassword}
        />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Masuk"
          onPress={() => {
            const data = {
              username: storeID.value,
              password: password.value,
            };
            loginUserName(data);
          }}
          type="primary"
          loading={state.loading}
          disabled={
            storeID.value === '' ||
            password.value === '' ||
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
  const { goBack }: any = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default LoginIDView;
