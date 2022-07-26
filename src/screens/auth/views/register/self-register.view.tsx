import React from 'react';
import { View, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbTextField2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
  FooterButton,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { LOGIN_PHONE_VIEW } from '@screen/auth/functions/screens_name';
import {
  useInputPhone,
  useCheckPhoneRegistrationV3,
  setErrorMessage,
} from '@screen/auth/functions';
import { useDataPermanent } from '@core/redux/Data';
import { ModalOTPMethod, ModalSalesman } from '../shared';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();
  const phone = useInputPhone();
  const {
    checkPhoneRegistration,
    checkPhoneRegistrationReset,
    checkPhoneRegisterV3: checkPhoneRegistrationState,
  } = useCheckPhoneRegistrationV3();
  const { advertisingId } = useDataPermanent();

  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    if (checkPhoneRegistrationState?.data !== null) {
      if (checkPhoneRegistrationState?.data?.phoneNumberAvailable) {
        //SHOW MODAL SEND OTP DAN NAVIGATE KE OTP PAGE
        refModalOTP.current?.open()
      } else if (checkPhoneRegistrationState?.data?.isUserAgent) {
        phone.clearText();
        checkPhoneRegistrationReset();
        // SHOW MODAL SALESMAN DISINI
        refModalSalesman.current?.open();
      } else {
        phone.setMessageError('Nomor telah terdaftar');
        phone.setType('error');
      }
    }
    if (checkPhoneRegistrationState.error !== null) {
      phone.setMessageError(
        setErrorMessage(checkPhoneRegistrationState.error.code),
      );
    }
  }, [checkPhoneRegistrationState]);

  React.useEffect(() => {
    checkPhoneRegistrationReset();
    phone.setMessageError('');
    phone.setType('default');
    return () => {
      checkPhoneRegistrationReset();
      phone.clearText();
    };
  }, []);
  const header = () => {
    return (
      <SnbTopNav2.Type3
        backAction={() => navigate('OnBoardingView')}
        color="white"
        title="Daftar"
      />
    );
  };

  const content = () => {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginBottom: layout.spacing.xl }}>
          <View style={styles.image}>
            <Image
              source={require('@image/sinbad_image/login_register.png')}
              style={{ height: 220, resizeMode: 'contain' }}
            />
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <SnbTextField2.Text {...phone} keyboardType="phone-pad" />
          </View>
        </View>
      </ScrollView>
    );
  };

  const buttonRegister = () => {
    return (
      <FooterButton.Single
        testID='registerOTP'
        title='Lanjut'
        buttonPress={() => {
          Keyboard.dismiss();
          checkPhoneRegistration({
            mobilePhone: phone.value,
            identifierDeviceId: advertisingId,
          })
        }}
        loadingButton={checkPhoneRegistrationState.loading}
        disabled={
          phone.value === '' ||
          phone.valMsgError !== '' ||
          checkPhoneRegistrationState.loading
        }
        textLink="Masuk"
        textLinkPress={() => {
          phone.clearText();
          navigate(LOGIN_PHONE_VIEW);
        }}
        description="Sudah punya akun Sinbad?"
      />
    );
  };

  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {buttonRegister()}
      <ModalOTPMethod
        ref={refModalOTP}
        phone={phone.value}
        action="register"
        onResetField={phone.clearText}
      />
      <ModalSalesman ref={refModalSalesman} />
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginVertical: layout.spacing.xxl,
  },
  button: { padding: layout.spacing.lg },
});

export default SelfRegisterView;
