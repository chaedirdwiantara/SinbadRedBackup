import React from 'react';
import { View, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbTextField2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
  FooterButton,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { LOGIN_PHONE_VIEW } from '@screen/auth/functions/screens_name';
import {
  useInputPhone,
  useCheckPhoneRegistrationV3,
  setErrorMessage,
  useCheckReferralCode,
  useReferral,
} from '@screen/auth/functions';
import { useDataPermanent } from '@core/redux/Data';
import { ModalOTPMethod, ModalSalesman } from '../shared';

const SelfRegisterView: React.FC = () => {
  const { navigate } = useNavigation();
  const phone = useInputPhone();
  const {
    checkPhoneRegistration,
    checkPhoneRegistrationReset,
    checkPhoneRegisterV3: checkPhoneRegistrationState,
  } = useCheckPhoneRegistrationV3();
  const { advertisingId } = useDataPermanent();

  const refModalOTP = React.useRef<SnbBottomSheet2Ref>(null);
  const refModalSalesman = React.useRef<SnbBottomSheet2Ref>(null);
  const [referal, setReferal] = React.useState('');
  const [statusReferal, setStatusReferal] = React.useState('default');
  const { checkReferralCode, checkReferralCodeData, resetReferralCode } =
    useCheckReferralCode();
  const { searchReferral, referralValue, debouncedValue } = useReferral();
  const [isInitialDebounce, setInitialDebounce] = React.useState(false);

  React.useEffect(() => {
    if (checkPhoneRegistrationState?.data !== null) {
      if (checkPhoneRegistrationState?.data?.phoneNumberAvailable) {
        //SHOW MODAL SEND OTP DAN NAVIGATE KE OTP PAGE
        refModalOTP.current?.open();
      } else if (checkPhoneRegistrationState?.data?.isUserAgent) {
        phone.clearText();
        checkPhoneRegistrationReset();
        // SHOW MODAL SALESMAN DISINI
        refModalSalesman.current?.open();
      } else {
        phone.setMessageError('Nomor telah terdaftar');
        phone.setType('error');
      }
    }
    if (checkPhoneRegistrationState.error !== null) {
      phone.setMessageError(
        setErrorMessage(checkPhoneRegistrationState.error.code),
      );
    }
  }, [checkPhoneRegistrationState]);

  React.useEffect(() => {
    checkPhoneRegistrationReset();
    resetReferralCode();
    setReferal('');
    setStatusReferal('default');
    phone.setMessageError('');
    phone.setType('default');
    return () => {
      checkPhoneRegistrationReset();
      phone.clearText();
      resetReferralCode();
      setReferal('');
      setStatusReferal('default');
    };
  }, []);

  React.useEffect(() => {
    if (checkReferralCodeData.data !== null) {
      setStatusReferal('success');
      setInitialDebounce(false);
    }
    if (checkReferralCodeData.error !== null) {
      if (referal !== '') {
        setStatusReferal('error');
        setInitialDebounce(false);
      } else {
        setStatusReferal('default');
        setInitialDebounce(false);
      }
    }
  }, [checkReferralCodeData]);

  React.useEffect(() => {
    if (referal === '') {
      setStatusReferal('default');
    }
  }, [referal]);

  React.useEffect(() => {
    if (
      (debouncedValue.length >= 3 || debouncedValue.length === 0) &&
      !checkReferralCodeData.loading &&
      isInitialDebounce
    ) {
      checkReferralCode({ code: referralValue });
    } else {
      setInitialDebounce(false);
    }
  }, [debouncedValue, checkReferralCodeData.loading]);

  const header = () => {
    return (
      <SnbTopNav2.Type3
        backAction={() => navigate('OnBoardingView')}
        color="white"
        title="Daftar"
        testID={'02'}
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
            <SnbTextField2.Text
              testID={'02'}
              {...phone}
              keyboardType="phone-pad"
            />
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <SnbTextField2.Text
              testID={'02'}
              value={referal}
              onChangeText={(text) => {
                setReferal(text);
                setStatusReferal('default');
                setInitialDebounce(true);
                searchReferral(text);
              }}
              helperText={
                checkReferralCodeData.loading ? 'Pengecekan Kode...' : ''
              }
              keyboardType="default"
              labelText="Masukkan Kode Referal (Optional)"
              placeholder="Masukkan kode referal jika ada"
              type={
                statusReferal === 'error'
                  ? 'error'
                  : statusReferal === 'success'
                  ? 'success'
                  : 'default'
              }
              valMsgError={'Kode referal tidak ditemukan'}
              valMsgSuccess={'Kode referal dapat digunakan'}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  const buttonRegister = () => {
    return (
      <View>
        <FooterButton.Single
          testID={'02'}
          title={'Lanjut'}
          buttonPress={() => {
            Keyboard.dismiss();
            checkPhoneRegistration({
              mobilePhone: phone.value,
              identifierDeviceId:
                advertisingId === undefined ? null : advertisingId,
            });
          }}
          textLink={'Masuk'}
          description={'Sudah punya akun Sinbad?'}
          textLinkPress={() => {
            phone.clearText();
            setReferal('');
            setStatusReferal('default');
            navigate(LOGIN_PHONE_VIEW);
          }}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            checkPhoneRegistrationState.loading ||
            checkReferralCodeData.loading
          }
          loadingButton={checkPhoneRegistrationState.loading}
        />
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {buttonRegister()}
      <ModalOTPMethod
        ref={refModalOTP}
        phone={phone.value}
        action="register"
        onResetField={() => {
          phone.clearText();
          setReferal('');
          setStatusReferal('default');
        }}
        referralCode={statusReferal === 'success' ? referal : undefined}
      />
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
