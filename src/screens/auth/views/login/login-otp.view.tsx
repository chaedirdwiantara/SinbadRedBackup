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
import { useAuthCoreAction } from '@core/functions/auth';

const LoginOTPView: React.FC = () => {
  const { goBack } = useNavigation();
  const { requestOTP, verifyOTP, verificationOTP } = useAuthAction();
  const { resetVerifyOTP, mobilePhone, getLocationPermissions } = useOTP();
  const [hide, setHide] = React.useState(true);
  const { meV2 } = useDataAuth();
  const authCoreAction = useAuthCoreAction();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      authCoreAction.meV2();
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP]);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setTimeout(() => {
        if (!meV2.data && !meV2.loading && meV2.error) {
          NavigationAction.resetToIntroSinbad();
        } else {
          if (
            meV2.data?.data?.isBuyerCategoryCompleted === true &&
            !meV2.error
          ) {
            NavigationAction.resetToHome();
          }
          if (
            meV2.data?.data?.isBuyerCategoryCompleted === false &&
            !meV2.error
          ) {
            getLocationPermissions();
          }
        }
      }, 2000);
    }
  }, [meV2.data, meV2.loading, meV2.error, verifyOTP]);

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
      </ScrollView>
    </SnbContainer>
  );
};

export default LoginOTPView;
