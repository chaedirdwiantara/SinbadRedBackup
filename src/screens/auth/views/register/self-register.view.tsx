import React from 'react';
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
import { useInputPhone } from '@screen/auth/functions';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();
  const phone = useInputPhone();

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
      <View style={{ flex: 1 }}>
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
              navigate(REGISTER_OTP_VIEW, { phoneNo: phone.value })
            }
            type={'primary'}
            disabled={phone.value === '' || phone.valMsgError !== ''}
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
        {buttonRegister()}
      </ScrollView>
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
