import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT FUNCTION HERE === */
import { UserHookFunc } from '../functions';

const UserChangePasswordView: FC = () => {
  /** === HOOK === */
  const { dataOldPassword, setDataOldPassword } = UserHookFunc.useOldPassword();
  const { dataNewPassword, setDataNewPassword } = UserHookFunc.useNewPassword();
  const { dataConfirmNewPassword, setDataConfirmNewPassword } =
    UserHookFunc.useConfirmNewPassword();
  /** === FUNCTION FOR HOOK === */
  const textOldPassword = (oldPassword: string) => {
    setDataOldPassword(oldPassword);
  };
  const textNewPassword = (newPassword: string) => {
    setDataNewPassword(newPassword);
  };
  const textConfirmNewPassword = (confirmNewPassword: string) => {
    setDataConfirmNewPassword(confirmNewPassword);
  };
  /** === FUNCTION === */
  const confirm = () => {
    console.log({
      old: dataOldPassword,
      new: dataNewPassword,
      confirm: dataConfirmNewPassword,
    });
  };
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
            value={dataOldPassword}
            type={'password'}
            placeholder="Masukkan kata sandi sekarang"
            onChangeText={(text) => textOldPassword(text)}
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
            value={dataNewPassword}
            type={'enable'}
            placeholder="Masukkan kata sandi baru"
            onChangeText={(text) => textNewPassword(text)}
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
          value={dataConfirmNewPassword}
          type={'enable'}
          placeholder="Masukkan ulang kata sandi baru"
          onChangeText={(text) => textConfirmNewPassword(text)}
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
          onPress={() => confirm()}
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
