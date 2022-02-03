import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();

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
        <Image
          source={require('../../../../assets/images/self_regist/Registration.png')}
          style={styles.image}
        />
        <View style={{ height: 84, padding: 16 }}>
          <SnbTextField.Text
            keyboardType="phone-pad"
            labelText="Masukkan Nomor Handphone"
            placeholder="Masukkan nomor handphone anda"
            onChangeText={() => {}}
            clearText={() => console.log('clear')}
            type={'read'}
            value={''}
          />
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
            onPress={() => {}}
            type={'primary'}
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
      {header()}
      {content()}
      {buttonRegister()}
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 32,
  },
  button: {
    marginTop: 32,
    height: 72,
  },
});

export default SelfRegisterView;
