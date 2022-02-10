import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useOTP,
  setErrorMessage,
  useCheckPhoneV2,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { useCheckAutoLogin } from '@screen/auth/functions';

const RegisterOTPView: React.FC = () => {
  const {
    verifyOTPRegister,
    verifyOTP,
    mobilePhone,
    getLocationPermissions,
    hashOtp,
  } = useOTP();
  const { goBack }: any = useNavigation();
  const [hide, setHide] = React.useState(true);
  const { checkAutoLogin, checkAutoLoginData } = useCheckAutoLogin();
  const { checkPhone } = useCheckPhoneV2();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      var times = 3;
      for (var i = 0; i < times; i++) {
        setTimeout(() => {
          checkAutoLogin(verifyOTP.data);
        }, 1500);
      }
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP]);

  React.useEffect(() => {
    if (checkAutoLoginData.data !== null) {
      getLocationPermissions();
    }
  }, [checkAutoLoginData]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <ScrollView>
        <OTPContent
          onVerifyOTP={(otp) => {
            setHide(true);
            verifyOTPRegister({
              mobilePhone,
              otp,
            });
          }}
          resend={() => {
            checkPhone({ mobilePhone: mobilePhone, otpHash: hashOtp });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          hideIcon={hide}
          loading={verifyOTP.loading}
          phoneNo={maskPhone(mobilePhone)}
        />
      </ScrollView>
    </SnbContainer>
  );
};

export default RegisterOTPView;
