import { useOTP } from '@screen/auth/functions';
import { REGISTER_STEP_1_VIEW } from '@screen/auth/screens_name';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const { func, state, replace, goBack } = useOTP();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={() => {
          func.setLoading(true);
          setTimeout(() => {
            func.setLoading(false);
            replace(REGISTER_STEP_1_VIEW);
          }, 2500);
        }}
        loading={state.loading}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
