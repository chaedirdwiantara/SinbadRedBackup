import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useOTP,
  setErrorMessage,
  useCheckPhoneV2,
  useCheckAutoLogin,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbBottomSheet,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const {
    verifyOTPRegister,
    verifyOTP,
    mobilePhone,
    getLocationPermissions,
    hashOtp,
  } = useOTP();
  const { goBack }: any = useNavigation();
  const [hide, setHide] = React.useState(true);
  const { checkAutoLogin, resetCheckAutoLogin, checkAutoLoginData } =
    useCheckAutoLogin();
  const { checkPhone } = useCheckPhoneV2();
  const [reCheckAutoLogin, setReCheckAutoLogin] = React.useState(0);
  const [loadingCheckAutoLogin, setLoadingCheckAutoLogin] =
    React.useState(false);
  const [modalError, setModalError] = React.useState(false);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      checkAutoLogin(verifyOTP.data);
      setReCheckAutoLogin(0);
      setLoadingCheckAutoLogin(true);
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP]);

  React.useEffect(() => {
    if (checkAutoLoginData?.data?.message === 'Success') {
      getLocationPermissions();
      resetCheckAutoLogin();
    }
  }, [checkAutoLoginData]);

  React.useEffect(() => {
    if (
      checkAutoLoginData?.data?.message === 'Processing' &&
      reCheckAutoLogin !== 3
    ) {
      setTimeout(() => {
        checkAutoLogin(verifyOTP.data);
        setReCheckAutoLogin(reCheckAutoLogin + 1);
        setLoadingCheckAutoLogin(true);
      }, 1500);
    }
    if (reCheckAutoLogin === 3) {
      setLoadingCheckAutoLogin(false);
      setModalError(true);
      resetCheckAutoLogin();
    }
  }, [reCheckAutoLogin, checkAutoLoginData]);

  React.useEffect(() => {
    if (checkAutoLoginData.error !== null) {
      setModalError(true);
      setLoadingCheckAutoLogin(false);
    }
  }, [checkAutoLoginData.error]);

  const renderModalError = () => {
    return (
      <View>
        <Image
          source={require('../../../../assets/images/sinbad_cry.png')}
          style={{
            height: 160,
            width: 160,
            alignSelf: 'center',
            marginVertical: 16,
          }}
        />
        <View style={{ margin: 16 }}>
          <SnbText.B2 align="center">
            Data Anda masih sedang tahap proses
          </SnbText.B2>
          <View style={{ marginVertical: 8 }} />
          <SnbText.B3 align="center">
            silahkan tunggu atau hubungi customer service Sinbad
          </SnbText.B3>
        </View>
        <View style={{ height: 75 }}>
          <SnbButton.Single
            title="Tutup"
            type="primary"
            disabled={false}
            onPress={() => {
              setModalError(false);
              setReCheckAutoLogin(0);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <ScrollView>
        <OTPContent
          testID="register"
          onVerifyOTP={(otp) => {
            setHide(true);
            verifyOTPRegister({
              mobilePhoneNo: mobilePhone,
              otp: Number(otp),
            });
          }}
          resend={() => {
            checkPhone({ mobilePhoneNo: mobilePhone, otpHash: hashOtp });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          hideIcon={hide}
          loading={verifyOTP.loading || loadingCheckAutoLogin}
          phoneNo={maskPhone(mobilePhone)}
        />
      </ScrollView>
      <SnbBottomSheet
        open={modalError}
        title={''}
        content={renderModalError()}
        size={'normal'}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
