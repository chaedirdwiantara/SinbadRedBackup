import { useOTP } from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const LoginOTPView: React.FC = () => {
  const { state, func, reset, goBack } = useOTP();

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
            reset({ index: 0, routes: [{ name: 'Home' }] });
          }, 2500);
        }}
        loading={state.loading}
      />
    </SnbContainer>
  );
};

export default LoginOTPView;
