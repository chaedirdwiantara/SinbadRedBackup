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
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorOldPasswordMessage, setErrorOldPasswordMessage] = useState('');
  const [errorNewPasswordMessage, setErrorNewPasswordMessage] = useState('');
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] =
    useState('');
  /** === FUNCTION FOR HOOK === */
  const textOldPassword = (oldPassword: string) => {
    setDataOldPassword(oldPassword);
  };
  const textNewPassword = (newPassword: string) => {
    let reg = /^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (reg.test(newPassword) || !newPassword) {
      setErrorNewPassword(false);
      setErrorNewPasswordMessage('');
    } else {
      setErrorNewPassword(true);
      setErrorNewPasswordMessage(
        'Kata sandi harus terdiri dari minimal 6 karakter dan memiliki kombinasi huruf besar, huruf kecil, angka dan simbol',
      );
    }
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
  //HANDLE ERROR
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
        setErrorNewPassword(true);
        setErrorNewPasswordMessage(
          'Kata sandi baru tidak boleh sama dengan kata sandi sekarang',
        );
      } else if (
        stateUser.update.error.code === 10012 ||
        stateUser.update.error.code === 10029
      ) {
        setOpenConfirm(false);
        setErrorOldPassword(true);
        setErrorOldPasswordMessage('Kata sandi sekarang salah');
      } else if (stateUser.update.error.code === 10013) {
        setOpenConfirm(false);
        setErrorNewPassword(true);
        setErrorNewPasswordMessage('Kata sandi baru tidak sesuai format');
      } else if (stateUser.update.error.code === 10031) {
        setOpenConfirm(false);
        setErrorNewPassword(true);
        setErrorNewPasswordMessage('Kata sandi baru tidak sesuai format');
      } else if (stateUser.update.error.code === 10033) {
        setOpenConfirm(false);
        setErrorConfirmPassword(true);
        setErrorConfirmPasswordMessage(
          'Konfirmasi kata sandi baru tidak sesuai format',
        );
      }
    }
  }, [stateUser.update]);

  useEffect(() => {
    if (
      dataNewPassword === dataConfirmNewPassword ||
      dataConfirmNewPassword === ''
    ) {
      setVerifyPassword(true);
      setErrorConfirmPassword(false);
      setErrorConfirmPasswordMessage('');
    } else {
      setVerifyPassword(false);
      setErrorConfirmPassword(true);
      setErrorConfirmPasswordMessage('Konfirmasi kata sandi baru tidak sesuai');
    }
  }, [dataNewPassword, dataConfirmNewPassword]);
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
            type={errorOldPassword ? 'error' : 'default'}
            placeholder="Masukkan kata sandi sekarang"
            onChangeText={(text) => {
              textOldPassword(text);
              setErrorOldPassword(false);
            }}
            clearText={() => setDataOldPassword('')}
            maxLength={40}
            keyboardType="default"
            suffixIconName={secureOldPassword ? 'visibility' : 'visibility_off'}
            secureTextEntry={secureOldPassword}
            suffixAction={() => setSecureOldPassword(!secureOldPassword)}
            valMsgError={errorOldPasswordMessage}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            mandatory
            boxIndicator
            labelText="Kata Sandi Baru"
            value={dataNewPassword}
            type={errorNewPassword ? 'error' : 'default'}
            placeholder="Masukkan kata sandi baru"
            onChangeText={(text) => {
              textNewPassword(text);
            }}
            clearText={() => {
              setDataNewPassword('');
              setErrorNewPassword(false);
            }}
            maxLength={40}
            keyboardType="default"
            suffixIconName={secureNewPassword ? 'visibility' : 'visibility_off'}
            secureTextEntry={secureNewPassword}
            suffixAction={() => setSecureNewPassword(!secureNewPassword)}
            valMsgError={errorNewPasswordMessage}
          />
        </View>
        <SnbTextField.Text
          mandatory
          boxIndicator
          labelText="Konfirmasi Kata Sandi Baru"
          value={dataConfirmNewPassword}
          type={errorConfirmPassword ? 'error' : 'default'}
          placeholder="Masukkan ulang kata sandi baru"
          onChangeText={(text) => {
            textConfirmNewPassword(text);
            setErrorConfirmPassword(false);
          }}
          clearText={() => setDataConfirmNewPassword('')}
          maxLength={40}
          valMsgError={errorConfirmPasswordMessage}
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
