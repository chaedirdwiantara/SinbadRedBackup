import { useNavigation, useRoute } from '@react-navigation/core';
import { maskPhone, useAuthAction, useOTP } from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const LoginOTPView: React.FC = () => {
  const { goBack, reset } = useNavigation();
  const { requestOTP, verifyOTPState, verificationOTP } = useAuthAction();
  const { resetVerifyOTP } = useOTP();
  const { params }: any = useRoute();
  const [hide, setHide] = React.useState(true);
  const [otpSuccess, setOtpSuccess] = React.useState(false);

  React.useEffect(() => {
    if (verifyOTPState.data !== null) {
      setHide(false);
      setOtpSuccess(true);
      resetVerifyOTP();
      reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    if (verifyOTPState.error !== null) {
      setOtpSuccess(false);
      setHide(false);
    }
  }, [verifyOTPState]);

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
          verificationOTP({ mobilePhone: params?.phoneNo, otp });
        }}
        otpSuccess={otpSuccess}
        hideIcon={hide}
        loading={verifyOTPState.loading}
        phoneNo={maskPhone(params?.phoneNo)}
        resend={() => {
          requestOTP({ mobilePhone: params?.phoneNo });
        }}
        errorMessage={verifyOTPState.error?.message || ''}
      />
    </SnbContainer>
  );
};

export default LoginOTPView;
