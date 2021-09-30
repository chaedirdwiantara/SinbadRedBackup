import { useNavigation } from '@react-navigation/core';
import { useAuthAction, useInputPhone, useOTP } from '@screen/auth/functions';
import {
  LOGIN_ID_VIEW,
  LOGIN_OTP_VIEW,
  REGISTER_VIEW,
} from '@screen/auth/screens_name';
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
  const { navigate } = useNavigation();
  const { requestOTP, requestOTPState, resetRequestOTP } = useAuthAction();
  const { resetVerifyOTP } = useOTP();
  const phone = useInputPhone();

  React.useEffect(() => {
    if (requestOTPState.data !== null) {
      resetRequestOTP();
      resetVerifyOTP();
      phone.clearText();
      navigate(LOGIN_OTP_VIEW, { phoneNo: phone.value });
    }
    if (requestOTPState.error !== null) {
      phone.setMessageError(requestOTPState.error.message);
    }
  }, [requestOTPState]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <SnbText.H1>Masuk</SnbText.H1>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField.Text {...phone} keyboardType="phone-pad" />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Selanjutnya"
          onPress={() => {
            resetRequestOTP();
            requestOTP({ mobilePhone: phone.value });
          }}
          type="primary"
          loading={requestOTPState.loading}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            requestOTPState.loading
          }
        />
      </View>
      <View style={loginPhoneStyles.choosenText}>
        <View style={loginPhoneStyles.line} />
        <View style={{ marginHorizontal: 8 }}>
          <SnbText.B4>atau masuk dengan</SnbText.B4>
        </View>
        <View style={loginPhoneStyles.line} />
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="ID Toko"
          onPress={() => navigate(LOGIN_ID_VIEW)}
          type="secondary"
          disabled={false}
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

const LoginPhoneView: React.FC = () => {
  const { reset } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
        type="white"
        title=""
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
