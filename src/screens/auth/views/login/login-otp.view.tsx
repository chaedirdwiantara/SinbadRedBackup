import { useNavigation, useRoute } from '@react-navigation/core';
import { maskPhone, useCheckPhoneNoAvailability } from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const LoginOTPView: React.FC = () => {
  const { goBack } = useNavigation();
  const { state } = useCheckPhoneNoAvailability();
  const { params }: any = useRoute();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={() => {}}
        loading={state.loading}
        otpCode={state.data.otp}
        phoneNo={maskPhone(params?.phoneNo)}
      />
    </SnbContainer>
  );
};

export default LoginOTPView;
