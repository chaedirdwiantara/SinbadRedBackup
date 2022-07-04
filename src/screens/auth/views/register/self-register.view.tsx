import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';
import {
  SnbContainer,
  SnbText2,
  SnbTopNav2,
  SnbTextField2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import {
  REGISTER_OTP_VIEW,
  LOGIN_PHONE_VIEW,
} from '@screen/auth/functions/screens_name';
import {
  useInputPhone,
  // useCheckPhoneV2,
  useCheckPhoneRegistrationV3,
  setErrorMessage,
} from '@screen/auth/functions';
import RNOtpVerify from 'react-native-otp-verify';
import { useDataPermanent } from '@core/redux/Data';
import { ModalOTPMethod, ModalSalesman } from '../shared';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();
  const phone = useInputPhone();
  // const { checkPhone, resetCheckPhone, checkPhoneV2, checkPhoneV2Reset } =
  //   useCheckPhoneV2();
  const [hashOtp, setHashOtp] = useState('');
  const {
    checkPhoneRegistration,
    checkPhoneRegistrationReset,
    checkPhoneRegisterV3: checkPhoneRegistrationState,
  } = useCheckPhoneRegistrationV3();
  const { advertisingId } = useDataPermanent();

  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);

  // React.useEffect(() => {
  //   if (checkPhoneV2.data !== null) {
  //     if (checkPhoneV2.data.isAvailable) {
  //       phone.clearText();
  //       resetCheckPhone();
  //       checkPhoneV2Reset();
  //       navigate(REGISTER_OTP_VIEW, { phoneNo: phone.value, hashOtp: hashOtp });
  //     } else {
  //       phone.setMessageError('Nomor telah terdaftar');
  //       phone.setType('error');
  //     }
  //   }
  //   if (checkPhoneV2.error !== null) {
  //     phone.setMessageError(checkPhoneV2.error.message);
  //   }
  // }, [checkPhoneV2]);

  React.useEffect(() => {
    if (checkPhoneRegistrationState?.data !== null) {
      if (checkPhoneRegistrationState?.data?.phoneNumberAvailable) {
        if (checkPhoneRegistrationState?.data?.isUserAgent) {
          phone.clearText();
          checkPhoneRegistrationReset();
          // SHOW MODAL SALESMAN DISINI
          refModalSalesman.current?.open();
        } else {
          //SHOW MODAL SEND OTP DAN NAVIGATE KE OTP PAGE
          refModalOTP.current?.open();
        }
      } else {
        phone.setMessageError('Nomor telah terdaftar');
        phone.setType('error');
      }
    }
    if (checkPhoneRegistrationState.error !== null) {
      phone.setMessageError(setErrorMessage(checkPhoneRegistrationState.error.code));
    }
  }, [checkPhoneRegistrationState]);

  React.useEffect(() => {
    // resetCheckPhone();
    checkPhoneRegistrationReset();
    phone.setMessageError('');
    phone.setType('default');
    return () => {
      checkPhoneRegistrationReset();
      phone.clearText();
    };
  }, []);

  React.useEffect(() => {
    RNOtpVerify.getHash().then((value) => setHashOtp(value[0]));
    return RNOtpVerify.removeListener;
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
      <View>
        <View style={styles.button}>
          <SnbButton2.Primary
            title={'Lanjut'}
            onPress={() => {
              // checkPhone({ mobilePhoneNo: phone.value, otpHash: hashOtp })
              Keyboard.dismiss();
              checkPhoneRegistration({
                mobilePhone: phone.value,
                identifierDeviceId: advertisingId,
              });
            }}
            disabled={
              phone.value === '' ||
              phone.valMsgError !== '' ||
              checkPhoneRegistrationState.loading
            }
            loading={checkPhoneRegistrationState.loading}
            size="medium"
            full
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: layout.spacing.md,
          }}>
          <SnbText2.Paragraph.Default>
            Sudah punya akun Sinbad?{' '}
          </SnbText2.Paragraph.Default>
          <View style={{ marginLeft: -layout.spacing.md }}>
            <SnbButton2.Link
              title="Masuk"
              size="medium"
              onPress={() => {
                phone.clearText();
                navigate(LOGIN_PHONE_VIEW);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {buttonRegister()}
      <ModalOTPMethod ref={refModalOTP} phone={phone.value} action="register" />
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
