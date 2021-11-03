import React, { FC, useEffect, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  SnbDialog,
} from 'react-native-sinbad-ui';
import { ScrollView, View, ToastAndroid, Image } from 'react-native';
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
      setOpenConfirm(false);
      ToastAndroid.showWithGravityAndOffset(
        'Kata Sandi berhasil diperbaharui',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      NavigationAction.back();
      changePasswordAction.resetChangePassword(dispatchUser);
    } else if (stateUser.update.error !== null) {
      if (stateUser.update.error.code === 10000) {
        setOpenConfirm(false);
        ToastAndroid.showWithGravityAndOffset(
          'Terjadi Kesalahan',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          240,
        );
        changePasswordAction.resetChangePassword(dispatchUser);
      } else if (stateUser.update.error.code === 10011) {
        setOpenConfirm(false);
        setErrorChangePassword(true);
        setErrorMessage(
          'Kata sandi baru tidak boleh sama dengan kata sandi sekarang',
        );
      } else if (stateUser.update.error.code === 10012) {
        setOpenConfirm(false);
        setErrorChangePassword(true);
        setErrorMessage('Kata sandi sekarang salah');
      } else if (stateUser.update.error.code === 10013) {
        setOpenConfirm(false);
        setErrorChangePassword(true);
        setErrorMessage('kata sandi baru tidak sesuai format');
      }
    }
  }, [stateUser.update]);

  useEffect(() => {
    if (dataNewPassword === dataConfirmNewPassword) {
      setVerifyPassword(true);
      setErrorChangePassword(false);
      setErrorMessage('');
    } else {
      setVerifyPassword(false);
      setErrorChangePassword(true);
      setErrorMessage('kata sandi baru tidak sesuai format');
    }
  }, [dataNewPassword, dataConfirmNewPassword]);

  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [errorChangePassword, setErrorChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifyPassword, setVerifyPassword] = useState(false);
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
  const renderTitle = () => {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Image
          source={require('../../../assets/images/sinbad_image/change_password.png')}
          style={{
            height: 145,
            width: undefined,
            aspectRatio: 1 / 1,
            resizeMode: 'contain',
          }}
        />
      </View>
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
          type={errorChangePassword ? 'error' : 'default'}
          placeholder="Masukkan ulang kata sandi baru"
          onChangeText={(text) => textConfirmNewPassword(text)}
          clearText={() => setDataConfirmNewPassword('')}
          maxLength={40}
          valMsgError={errorMessage}
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
          onPress={() => setOpenConfirm(true)}
          type={'primary'}
          disabled={
            !dataOldPassword ||
            !dataNewPassword ||
            !dataConfirmNewPassword ||
            stateUser.update.loading ||
            !verifyPassword
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
          content={'Apakah Anda yakin ingin mengganti kata sandi Anda ?'}
          okText={'Ya'}
          ok={() => confirm()}
          cancel={() => setOpenConfirm(false)}
        />
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {renderTitle()}
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
