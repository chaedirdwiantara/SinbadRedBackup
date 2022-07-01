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
import { View, ScrollView, BackHandler, Image, Keyboard } from 'react-native';
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
import { ModalOTPMethod, ModalSalesman } from '../shared';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { ForceRegistrationModal } from '../shared/index';

const Content: React.FC = () => {
  const { navigate } = useNavigation();
  const { checkPhoneLogin, resetCheckLoginPhone, resetRequestOTP } = useAuthCoreAction();
  const { checkPhoneLogin: checkPhoneLoginState } = useDataAuth()
  const phone = useInputPhone();
  const { reset } = useNavigation();
  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);
  const { advertisingId } = useDataPermanent()

  React.useEffect(() => {
    return () => {
      resetCheckLoginPhone()
      resetRequestOTP()
    };
  }, []);

  React.useEffect(() => {
    if (checkPhoneLoginState.data !== null) {
      refModalOTP.current?.open()
    }
    if (checkPhoneLoginState.error !== null) {
      refModalOTP.current?.open()
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
            Keyboard.dismiss()
            resetCheckLoginPhone();
            checkPhoneLogin({ mobilePhoneNo: phone.value, identifierDeviceId: advertisingId });
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
      <ModalOTPMethod ref={refModalOTP} phone={phone.value} action='login' />
      <ModalSalesman ref={refModalSalesman} />
    </ScrollView>
  );
};

const LoginPhoneView = () => {
  const { reset, navigate } = useNavigation();
  const [openModalForceRegister, setOpenModalForceRegister] =
    React.useState(true);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
        color="white"
        title="Masuk"
      />
      <Content />
      <View style={{ flex: 1 }}>
        <ForceRegistrationModal
          open={openModalForceRegister}
          confirm={() => {
            navigate(SELF_REGISTRATION_VIEW);
            setOpenModalForceRegister(false);
          }}
        />
      </View>
    </SnbContainer>
  );
};

export default LoginPhoneView;
