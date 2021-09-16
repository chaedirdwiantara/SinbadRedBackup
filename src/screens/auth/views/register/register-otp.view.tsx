import { useNavigation } from '@react-navigation/native';
import { useCheckPhoneNoAvailability } from '@screen/auth/functions';
import { REGISTER_STEP_1_VIEW } from '@screen/auth/screens_name';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const { state } = useCheckPhoneNoAvailability();
  const { goBack, replace } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={() => replace(REGISTER_STEP_1_VIEW)}
        otpCode={state.data.otp}
        loading={state.loading}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
