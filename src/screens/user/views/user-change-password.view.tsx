import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View, ToastAndroid } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT FUNCTION HERE === */
import { UserHookFunc } from '../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';

const UserChangePasswordView: FC = () => {
  /** === HOOK === */
  const { dataOldPassword, setDataOldPassword } = UserHookFunc.useOldPassword();
  const { dataNewPassword, setDataNewPassword } = UserHookFunc.useNewPassword();
  const { dataConfirmNewPassword, setDataConfirmNewPassword } =
    UserHookFunc.useConfirmNewPassword();
  const changePasswordAction = UserHookFunc.useChangePassword();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  useEffect(() => {
    if (stateUser.update.data) {
      ToastAndroid.showWithGravityAndOffset(
        'Success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      NavigationAction.back();
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Failed',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
    }
  }, [stateUser.update.data]);

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
    changePasswordAction.changePassword(dispatchUser, {
      data: {
        oldPassword: dataOldPassword,
        newPassword: dataNewPassword,
        confirmNewPassword: dataConfirmNewPassword,
      },
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
            type={'default'}
            placeholder="Masukkan kata sandi sekarang"
            onChangeText={(text) => textOldPassword(text)}
            clearText={() => setDataOldPassword('')}
            maxLength={40}
            valMsgError="ini contoh kalau error ya"
            keyboardType="default"
            suffixIconName="visibility"
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            mandatory
            boxIndicator
            labelText="Kata Sandi Baru"
            value={dataNewPassword}
            type={'default'}
            placeholder="Masukkan kata sandi baru"
            onChangeText={(text) => textNewPassword(text)}
            clearText={() => setDataNewPassword('')}
            maxLength={40}
            valMsgError="ini contoh kalau error ya"
            keyboardType="default"
            suffixIconName="visibility"
            secureTextEntry={true}
          />
        </View>
        <SnbTextField.Text
          mandatory
          boxIndicator
          labelText="Konfirmasi Kata Sandi Baru"
          value={dataConfirmNewPassword}
          type={'default'}
          placeholder="Masukkan ulang kata sandi baru"
          onChangeText={(text) => textConfirmNewPassword(text)}
          clearText={() => setDataConfirmNewPassword('')}
          maxLength={40}
          valMsgError="ini contoh kalau error ya"
          keyboardType="default"
          suffixIconName="visibility"
          secureTextEntry={true}
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
