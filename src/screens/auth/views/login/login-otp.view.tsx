import { useNavigation } from '@react-navigation/core';
import { maskPhone, useAuthAction, useOTP } from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const LoginOTPView: React.FC = () => {
  const { goBack, reset } = useNavigation();
  const { requestOTP, verifyOTP, verificationOTP } = useAuthAction();
  const { resetVerifyOTP, mobilePhone } = useOTP();
  const [hide, setHide] = React.useState(true);
  const [otpSuccess, setOtpSuccess] = React.useState(false);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      setOtpSuccess(true);
      reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    if (verifyOTP.error !== null) {
      setOtpSuccess(false);
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
          resetVerifyOTP();
          verificationOTP({ mobilePhone, otp });
        }}
        otpSuccess={otpSuccess}
        hideIcon={hide}
        loading={verifyOTP.loading}
        phoneNo={maskPhone(mobilePhone)}
        resend={() => {
          requestOTP({ mobilePhone });
        }}
        errorMessage={verifyOTP.error?.message || ''}
      />
    </SnbContainer>
  );
};

export default LoginOTPView;
