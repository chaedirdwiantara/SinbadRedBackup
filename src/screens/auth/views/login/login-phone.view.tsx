import { setErrorMessage, useInputPhone } from '@screen/auth/functions';
import { SELF_REGISTRATION_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, ScrollView, Image, Keyboard } from 'react-native';
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
  const { checkPhoneLogin, resetCheckLoginPhone, resetRequestOTP } =
    useAuthCoreAction();
  const { checkPhoneLogin: checkPhoneLoginState } = useDataAuth();
  const phone = useInputPhone();
  const { navigate } = useNavigation();
  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);
  const { advertisingId } = useDataPermanent();
  const refModalForceRegist = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    return () => {
      resetCheckLoginPhone();
      resetRequestOTP();
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
          labelText="Nomor Handphone"
          keyboardType="phone-pad"
          testID={'01'}
        />
      </View>
      <FooterButton.Single
        testID={'01'}
        title="Selanjutnya"
        buttonPress={() => {
          Keyboard.dismiss();
          resetCheckLoginPhone();
          checkPhoneLogin({
            mobilePhone: phone.value,
            identifierDeviceId:
              advertisingId === undefined ? null : advertisingId,
          });
        }}
        textLink={'Daftar'}
        description={'Belum punya akun Sinbad?'}
        textLinkPress={() => {
          phone.clearText();
          navigate(SELF_REGISTRATION_VIEW);
        }}
        disabled={
          phone.value === '' ||
          phone.valMsgError !== '' ||
          checkPhoneLoginState.loading
        }
        loadingButton={checkPhoneLoginState.loading}
      />
      <ModalOTPMethod ref={refModalOTP} phone={phone.value} action="login" />
      <ModalSalesman ref={refModalSalesman} />
      <View style={{ flex: 1 }}>
        <ForceRegistrationModal
          ref={refModalForceRegist}
          confirm={() => {
            phone.clearText();
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
        testID={'01'}
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
