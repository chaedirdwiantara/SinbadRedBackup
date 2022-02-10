import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useCheckPhoneNoAvailability,
  useOTP,
  setErrorMessage,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { useCheckAutoLogin } from '@screen/auth/functions';

const RegisterOTPView: React.FC = () => {
  const { checkPhone } = useCheckPhoneNoAvailability();
  const { verifyOTPRegister, verifyOTP, mobilePhone, getLocationPermissions } =
    useOTP();
  const { goBack }: any = useNavigation();
  const [hide, setHide] = React.useState(true);
  const { checkAutoLogin, checkAutoLoginData } = useCheckAutoLogin();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      checkAutoLogin(verifyOTP.data);
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
            checkPhone({ mobilePhoneNo: mobilePhone });
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
