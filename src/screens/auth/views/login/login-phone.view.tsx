import {
  setErrorMessage,
  useInputPhone,
} from '@screen/auth/functions';
import { SELF_REGISTRATION_VIEW } from '@screen/auth/functions/screens_name';
import React, { useEffect } from 'react';
import { View, ScrollView, BackHandler, Image, Keyboard } from 'react-native';
import {
  FooterButton,
  SnbBottomSheet2Ref,
  SnbContainer,
  SnbTextField2,
  SnbTopNav2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { ModalOTPMethod, ModalSalesman } from '../shared';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { ForceRegistrationModal } from '../shared/index';

const Content: React.FC = () => {
  const { checkPhoneLogin, resetCheckLoginPhone, resetRequestOTP } = useAuthCoreAction();
  const { checkPhoneLogin: checkPhoneLoginState } = useDataAuth()
  const phone = useInputPhone();
  const { reset, navigate } = useNavigation();
  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);
  const { advertisingId } = useDataPermanent();
  const refModalForceRegist = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    return () => {
      resetCheckLoginPhone()
      resetRequestOTP()
    };
  }, []);

  React.useEffect(() => {
    if (checkPhoneLoginState.data !== null) {
      const { isUserAgent, isUserMedea, phoneNumberAvailable } =
        checkPhoneLoginState.data.data || {};
      if (phoneNumberAvailable) {
        refModalOTP.current?.open();
      } else {
        if (isUserAgent) {
          refModalSalesman.current?.open();
        } else if (isUserMedea) {
          refModalForceRegist.current?.open();
        }
      }
    }
    if (checkPhoneLoginState.error !== null) {
      phone.setMessageError(setErrorMessage(checkPhoneLoginState.error.code));
    }
  }, [checkPhoneLoginState]);

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
      <FooterButton.Single
        testID='Login'
        title='Selanjutnya'
        buttonPress={() => {
          Keyboard.dismiss()
          resetCheckLoginPhone();
          checkPhoneLogin({ mobilePhone: phone.value, identifierDeviceId: advertisingId });
        }}
        loadingButton={checkPhoneLoginState.loading}
        disabled={
          phone.value === '' ||
          phone.valMsgError !== '' ||
          checkPhoneLoginState.loading
        }
        textLink="Daftar"
        textLinkPress={() => {
          phone.clearText();
          navigate(SELF_REGISTRATION_VIEW);
        }}
        description="Belum punya akun Sinbad?"
      />
      <ModalOTPMethod ref={refModalOTP} phone={phone.value} action="login" />
      <ModalSalesman ref={refModalSalesman} />
      <View style={{ flex: 1 }}>
        <ForceRegistrationModal
          ref={refModalForceRegist}
          confirm={() => {
            phone.clearText()
            navigate(SELF_REGISTRATION_VIEW);
            refModalForceRegist.current?.close();
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
        title="Masuk"
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
