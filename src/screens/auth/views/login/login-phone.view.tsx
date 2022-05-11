import {
  setErrorMessage,
  useAuthAction,
  useInputPhone,
} from '@screen/auth/functions';
import {
  LOGIN_OTP_VIEW,
  SELF_REGISTRATION_VIEW,
} from '@screen/auth/functions/screens_name';
import { loginPhoneStyles } from '@screen/auth/styles';
import React, { useEffect } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import {
  SnbButton2,
  SnbContainer,
  SnbText2,
  SnbTextField2,
  SnbTopNav2,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';

const Content: React.FC = () => {
  const { navigate } = useNavigation();
  const { requestOTP, requestOTPState, resetRequestOTP } = useAuthAction();
  const phone = useInputPhone();
  const { reset } = useNavigation();

  React.useEffect(() => {
    return resetRequestOTP;
  }, []);

  React.useEffect(() => {
    if (requestOTPState.data !== null) {
      phone.clearText();
      navigate(LOGIN_OTP_VIEW, { phoneNo: phone.value });
    }
    if (requestOTPState.error !== null) {
      phone.setMessageError(setErrorMessage(requestOTPState.error.code));
    }
  }, [requestOTPState]);

  useEffect(() => {
    const backAction = () => {
      reset({ index: 0, routes: [{ name: 'Home' }] });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <SnbText2.Headline.Large>Masuk</SnbText2.Headline.Large>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField2.Text {...phone} keyboardType="phone-pad" />
      </View>
      <View style={{ marginTop: 32 }} />
      <View style={{ paddingHorizontal: 16 }}>
        <SnbButton2.Primary
          title="Selanjutnya"
          onPress={() => {
            resetRequestOTP();
            requestOTP({ mobilePhone: phone.value });
          }}
          loading={requestOTPState.loading}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            requestOTPState.loading
          }
          size="large"
          full
        />
      </View>
      <View style={loginPhoneStyles.registerLink}>
        <View>
          <SnbText2.Paragraph.Default>
            Belum punya akun Sinbad?
          </SnbText2.Paragraph.Default>
        </View>
        <SnbButton2.Link
          title="Daftar"
          size="medium"
          onPress={() => {
            phone.clearText();
            navigate(SELF_REGISTRATION_VIEW);
          }}
        />
      </View>
    </ScrollView>
  );
};

const LoginPhoneView = () => {
  const { reset } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
        color="white"
        title=""
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
