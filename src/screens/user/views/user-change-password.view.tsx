import React, { FC, useEffect, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  SnbDialog,
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
    if (stateUser.update.data !== null) {
      setOPenConfirm(false);
      ToastAndroid.showWithGravityAndOffset(
        'Success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      NavigationAction.back();
      changePasswordAction.resetChangePassword(dispatchUser);
    } else if (stateUser.update.error !== null) {
      setOPenConfirm(false);
      ToastAndroid.showWithGravityAndOffset(
        'Failed',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      changePasswordAction.resetChangePassword(dispatchUser);
    }
  }, [stateUser.update]);

  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [openConfirm, setOPenConfirm] = useState(false);
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
            suffixIconName={secureOldPassword ? 'visibility' : 'visibility_off'}
            secureTextEntry={secureOldPassword}
            suffixAction={() => setSecureOldPassword(!secureOldPassword)}
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
            suffixIconName={secureNewPassword ? 'visibility' : 'visibility_off'}
            secureTextEntry={secureNewPassword}
            suffixAction={() => setSecureNewPassword(!secureNewPassword)}
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
          suffixIconName={
            secureConfirmPassword ? 'visibility' : 'visibility_off'
          }
          secureTextEntry={secureConfirmPassword}
          suffixAction={() => setSecureConfirmPassword(!secureConfirmPassword)}
        />
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View>
        <SnbButton.Single
          title={'Ganti Kata Sandi'}
          onPress={() => setOPenConfirm(true)}
          type={'primary'}
          disabled={
            !dataOldPassword ||
            !dataNewPassword ||
            !dataConfirmNewPassword ||
            stateUser.update.loading
          }
          position={'center'}
          loading={stateUser.update.loading}
        />
      </View>
    );
  };
  const renderConfirm = () => {
    return (
      <View>
        <SnbDialog
          open={openConfirm}
          title={'Ganti Kata Sandi'}
          content={'Apakah anda yakin ingin mengganti kata sandi Anda ?'}
          okText={'Ya'}
          ok={() => confirm()}
          cancel={() => setOPenConfirm(false)}
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
      {renderConfirm()}
    </SnbContainer>
  );
};

export default UserChangePasswordView;
