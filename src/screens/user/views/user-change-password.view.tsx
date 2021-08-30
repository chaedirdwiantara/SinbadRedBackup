import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';

const UserChangePasswordView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Ganti Kata Sandi"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  const renderForm = () => {
    return (
      <View style={{ margin: 16, flex: 1 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            mandatory
            boxIndicator
            labelText="Kata Sandi Sekarang"
            value={''}
            type={'password'}
            placeholder="Masukkan kata sandi sekarang"
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('test')}
            maxLength={40}
            valMsgError="ini contoh kalau error ya"
            keyboardType="default"
            suffixIconName="visibility"
            suffixAction={() => console.log('this for suffix action')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            mandatory
            boxIndicator
            labelText="Kata Sandi Baru"
            value={''}
            type={'enable'}
            placeholder="Masukkan kata sandi baru"
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('test')}
            maxLength={40}
            valMsgError="ini contoh kalau error ya"
            keyboardType="default"
            suffixIconName="visibility"
            suffixAction={() => console.log('this for suffix action')}
          />
        </View>
        <SnbTextField.Text
          mandatory
          boxIndicator
          labelText="Konfirmasi Kata Sandi Baru"
          value={''}
          type={'enable'}
          placeholder="Masukkan ulang kata sandi baru"
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('test')}
          maxLength={40}
          valMsgError="ini contoh kalau error ya"
          keyboardType="default"
          suffixIconName="visibility"
          suffixAction={() => console.log('this for suffix action')}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View>
        <SnbButton.Single
          title={'Ganti Kata Sandi'}
          onPress={() => console.log('test')}
          type={'primary'}
          disabled={false}
          position={'center'}
        />
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {renderForm()}
          {renderButton()}
        </View>
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default UserChangePasswordView;
