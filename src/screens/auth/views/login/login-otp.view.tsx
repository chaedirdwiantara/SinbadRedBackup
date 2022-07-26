import { useNavigation } from '@react-navigation/core';
import {
  maskPhone,
  setErrorMessage,
  useOTP,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav2 } from 'react-native-sinbad-ui';
import { useDataAuth } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
import { useAuthCoreAction } from '@core/functions/auth';

const LoginOTPView: React.FC = () => {
  const { goBack } = useNavigation();
  const { requestOTP, verificationOTP, resetVerificationOTP } = useAuthCoreAction();
  const { mobilePhone, getLocationPermissions, otpHash, type } = useOTP();
  const { meV2 } = useDataAuth();
  const [loading, setLoading] = React.useState(false);
  const { loginPhoneNumber } = useDataAuth()

  React.useEffect(() => {
    return resetVerificationOTP
  }, [])

  React.useEffect(() => {
    loginPhoneNumber.data !== null && setLoading(true);
  }, [loginPhoneNumber]);

  React.useEffect(() => {
    if (meV2.data) {
      if (meV2.data?.data?.isBuyerCategoryCompleted) {
        NavigationAction.resetToHome();
      } else {
        getLocationPermissions();
      }
    }
    meV2.error && setLoading(false);
  }, [meV2]);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={goBack}
        color="white"
        title="Kode Verifikasi"
      />
      <ScrollView>
        <OTPContent
          testID="login"
          onVerifyOTP={(otp) => {
            resetVerificationOTP()
            verificationOTP({ mobilePhone, otp });
          }}
          resend={() => {
            requestOTP({ mobilePhone, otpHash, type });
          }}
          errorMessage={
            loginPhoneNumber.error?.code ? setErrorMessage(loginPhoneNumber.error?.code) : ''
          }
          otpSuccess={loginPhoneNumber.data !== null}
          loading={loginPhoneNumber.loading || loading}
          phoneNo={maskPhone(mobilePhone)}
          otpMethod={type}
        />
      </ScrollView>
    </SnbContainer>
  );
};

export default LoginOTPView;
