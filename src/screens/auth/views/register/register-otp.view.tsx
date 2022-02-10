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
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import BottomSheetError from '@core/components/BottomSheetError';

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
  const { checkAutoLogin, checkAutoLoginData } = useCheckAutoLogin();
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
    if (checkAutoLoginData.data !== null) {
      getLocationPermissions();
    }
  }, [checkAutoLoginData]);

  React.useEffect(() => {
    if (checkAutoLoginData.error && reCheckAutoLogin !== 3) {
      setTimeout(() => {
        checkAutoLogin(verifyOTP.data);
        setReCheckAutoLogin(reCheckAutoLogin + 1);
        setLoadingCheckAutoLogin(true);
      }, 1500);
    }
    if (reCheckAutoLogin === 3) {
      setLoadingCheckAutoLogin(false);
      setModalError(true);
    }
  }, [reCheckAutoLogin, checkAutoLoginData]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <ScrollView>
        <OTPContent
          onVerifyOTP={(otp) => {
            setHide(true);
            verifyOTPRegister({
              mobilePhone,
              otp,
            });
          }}
          resend={() => {
            checkPhone({ mobilePhone: mobilePhone, otpHash: hashOtp });
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
      <BottomSheetError
        open={modalError}
        error={checkAutoLoginData.error}
        backAction={() => setModalError(false)}
        isCloseable
        closeAction={() => setModalError(false)}
        retryAction={() => {
          setModalError(false);
          setReCheckAutoLogin(0);
          checkAutoLogin(verifyOTP.data);
        }}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
