import { useNavigation } from '@react-navigation/core';
import {
  maskPhone,
  setErrorMessage,
  useAuthAction,
  useOTP,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const LoginOTPView: React.FC = () => {
  const { goBack, reset } = useNavigation();
  const { requestOTP, verifyOTP, verificationOTP } = useAuthAction();
  const { resetVerifyOTP, mobilePhone } = useOTP();
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      setTimeout(() => {
        reset({ index: 0, routes: [{ name: 'Home' }] });
      }, 250);
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={(otp) => {
          setHide(true);
          resetVerifyOTP();
          verificationOTP({ mobilePhone, otp });
        }}
        resend={() => {
          requestOTP({ mobilePhone });
        }}
        errorMessage={
          verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
        }
        hideIcon={hide}
        otpSuccess={verifyOTP.data !== null}
        loading={verifyOTP.loading}
        phoneNo={maskPhone(mobilePhone)}
      />
    </SnbContainer>
  );
};

export default LoginOTPView;
