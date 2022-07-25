import { useNavigation } from '@react-navigation/core';
import {
  maskPhone,
  setErrorMessage,
  useAuthAction,
  useOTP,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav2 } from 'react-native-sinbad-ui';
import { useDataAuth } from '@core/redux/Data';
import { NavigationAction } from '@navigation';

const LoginOTPView: React.FC = () => {
  const { goBack } = useNavigation();
  const { requestOTP, verifyOTP, verificationOTP } = useAuthAction();
  const { resetVerifyOTP, mobilePhone, getLocationPermissions, otpHash, type } = useOTP();
  const { meV2 } = useDataAuth();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    verifyOTP.data !== null && setLoading(true);
  }, [verifyOTP]);

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
          testID="loginOTP"
          onVerifyOTP={(otp) => {
            resetVerifyOTP();
            verificationOTP({ mobilePhone, otp });
          }}
          resend={() => {
            requestOTP({ mobilePhone, otpHash, type });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          loading={verifyOTP.loading || loading}
          phoneNo={maskPhone(mobilePhone)}
          otpMethod={type}
        />
      </ScrollView>
    </SnbContainer>
  );
};

export default LoginOTPView;
