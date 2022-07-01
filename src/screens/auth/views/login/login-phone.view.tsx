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
import { View, ScrollView, BackHandler, Image } from 'react-native';
import {
  SnbBottomSheet2Ref,
  SnbButton2,
  SnbContainer,
  SnbText2,
  SnbTextField2,
  SnbTopNav2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { ModalOTPMethod } from '../shared';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';

const Content: React.FC = () => {
  const { navigate } = useNavigation();
  const { checkPhoneLogin, resetCheckLoginPhone, resetRequestOTP } = useAuthCoreAction();
  const { checkPhoneLogin: checkPhoneLoginState } = useDataAuth()
  const phone = useInputPhone();
  const { reset } = useNavigation();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    return () => {
      resetCheckLoginPhone()
      resetRequestOTP()
    };
  }, []);

  React.useEffect(() => {
    if (checkPhoneLoginState.data !== null) {
      bottomSheetRef.current?.open()
    }
    if (checkPhoneLoginState.error !== null) {
      bottomSheetRef.current?.open()
      // phone.setMessageError(setErrorMessage(checkPhoneLoginState.error.code));
    }
  }, [checkPhoneLoginState]);

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
      <Image
        source={require('@image/sinbad_image/login_register.png')}
        style={{
          height: 220,
          alignSelf: 'center',
          marginVertical: layout.spacing.xxl,
          resizeMode: 'contain',
        }}
      />
      <View style={{ padding: layout.spacing.lg }}>
        <SnbTextField2.Text
          {...phone}
          labelText="Nomer Handphone"
          keyboardType="phone-pad"
        />
      </View>
      <View style={{ marginTop: layout.spacing.lg }} />
      <View style={{ paddingHorizontal: layout.spacing.lg }}>
        <SnbButton2.Primary
          title="Selanjutnya"
          onPress={() => {
            resetCheckLoginPhone();
            checkPhoneLogin({ mobilePhoneNo: phone.value, identifierDeviceId: 'idbro' });
          }}
          loading={checkPhoneLoginState.loading}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            checkPhoneLoginState.loading
          }
          size="medium"
          full
        />
      </View>
      <View style={loginPhoneStyles.registerLink}>
        <SnbText2.Paragraph.Default>
          Belum punya akun Sinbad?
        </SnbText2.Paragraph.Default>
        <View style={{ marginLeft: -layout.spacing.sm }}>
          <SnbButton2.Link
            title="Daftar"
            size="medium"
            onPress={() => {
              phone.clearText();
              navigate(SELF_REGISTRATION_VIEW);
            }}
          />
        </View>
      </View>
      <ModalOTPMethod ref={bottomSheetRef} phone={phone.value} action='login' />
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
        title="Masuk"
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
