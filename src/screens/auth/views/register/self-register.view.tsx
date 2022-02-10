import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { REGISTER_OTP_VIEW } from '@screen/auth/functions/screens_name';
import Svg from '@svg';
import { useInputPhone, useCheckPhoneV2 } from '@screen/auth/functions';
import RNOtpVerify from 'react-native-otp-verify';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();
  const phone = useInputPhone();
  const { checkPhone, resetCheckPhone, checkPhoneV2 } = useCheckPhoneV2();
  const [hashOtp, setHashOtp] = useState('');

  React.useEffect(() => {
    if (checkPhoneV2.data !== null) {
      phone.clearText();
      navigate(REGISTER_OTP_VIEW, { phoneNo: phone.value, hashOtp: hashOtp });
      resetCheckPhone();
    }
    if (checkPhoneV2.error !== null) {
      phone.setMessageError(checkPhoneV2.error.code);
    }
  }, [checkPhoneV2]);

  React.useEffect(() => {
    return () => {
      resetCheckPhone();
    };
  }, []);

  React.useEffect(() => {
    RNOtpVerify.getHash().then((value) => setHashOtp(value[0]));
    return RNOtpVerify.removeListener;
  }, []);

  const header = () => {
    return (
      <SnbTopNav.Type3
        backAction={() => navigate('OnBoardingView')}
        type="white"
        title="Daftar"
      />
    );
  };

  const content = () => {
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        <View style={styles.image}>
          <Svg name="registration" size={220} />
        </View>
        <View style={{ height: 84, padding: 16 }}>
          <SnbTextField.Text {...phone} keyboardType="phone-pad" />
        </View>
      </View>
    );
  };

  const buttonRegister = () => {
    return (
      <View>
        <View style={styles.button}>
          <SnbButton.Single
            title={'Lanjut'}
            onPress={() =>
              checkPhone({ mobilePhone: phone.value, otpHash: hashOtp })
            }
            type={'primary'}
            disabled={
              phone.value === '' ||
              phone.valMsgError !== '' ||
              checkPhoneV2.loading
            }
            loading={checkPhoneV2.loading}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 24,
            alignSelf: 'center',
          }}>
          <SnbText.B4>Sudah punya akun Sinbad? </SnbText.B4>
          <TouchableOpacity>
            <SnbText.B4 color={color.blue50}>Masuk</SnbText.B4>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {header()}
        {content()}
      </ScrollView>
      {buttonRegister()}
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginVertical: 32,
  },
  button: {
    marginTop: 32,
    height: 72,
  },
});

export default SelfRegisterView;
