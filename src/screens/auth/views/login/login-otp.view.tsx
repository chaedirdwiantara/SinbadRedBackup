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
  const { resetVerifyOTP, mobilePhone, getLocationPermissions } = useOTP();
  const { meV2 } = useDataAuth();

  React.useEffect(() => {
    if (meV2.data) {
      if (meV2.data?.data?.isBuyerCategoryCompleted) {
        NavigationAction.resetToHome();
      } else {
        getLocationPermissions();
      }
    }
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
            resetVerifyOTP();
            verificationOTP({ mobilePhone, otp });
          }}
          resend={() => {
            requestOTP({ mobilePhone });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          loading={verifyOTP.loading}
          phoneNo={maskPhone(mobilePhone)}
        />
      </ScrollView>
    </SnbContainer>
  );
};

export default LoginOTPView;
