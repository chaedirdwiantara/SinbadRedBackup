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
  SnbTopNav2,
  SnbBottomSheet,
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
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
          source={require('@image/sinbad_cry.png')}
          style={{
            height: 160,
            width: 160,
            alignSelf: 'center',
            marginVertical: layout.spacing.lg,
          }}
        />
        <View style={{ margin: layout.spacing.lg }}>
          <SnbText2.Headline.Default align="center">
            Data Anda masih sedang tahap proses
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: layout.spacing.sm }} />
          <SnbText2.Body.Default align="center">
            silahkan tunggu atau hubungi customer service Sinbad
          </SnbText2.Body.Default>
        </View>
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Primary
            title="Tutup"
            disabled={false}
            onPress={() => {
              setModalError(false);
              setReCheckAutoLogin(0);
            }}
            size="medium"
            full
          />
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={goBack}
        color="white"
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
