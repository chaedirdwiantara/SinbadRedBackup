import { useNavigation } from '@react-navigation/core';
import { setErrorMessage, useInput } from '@screen/auth/functions';
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
import { REGISTER_VIEW } from '@screen/auth/functions/screens_name';
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
  const storeID = useInput();
  const password = useInput();
  const { loginUserName, loginIDState, resetLoginUsername } = useAuthAction();
  const [secureTextEntry, setsecureTextEntry] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (loginIDState.data) {
      storeID.clearText();
      password.clearText();
      resetLoginUsername();
      reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    if (loginIDState.error !== null) {
      password.setMessageError(setErrorMessage(loginIDState.error.code));
    }
  }, [loginIDState]);

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
          type={password.valMsgError ? 'error' : 'default'}
          suffixAction={() => setsecureTextEntry(!secureTextEntry)}
          suffixIconName={secureTextEntry ? 'visibility_off' : 'visibility'}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Masuk"
          onPress={() => {
            password.setMessageError('');
            const data = {
              username: storeID.value,
              password: password.value,
            };
            loginUserName(data);
          }}
          type="primary"
          loading={loginIDState.loading}
          disabled={
            storeID.value === '' ||
            password.value === '' ||
            loginIDState.loading ||
            loginIDState.errorID
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
