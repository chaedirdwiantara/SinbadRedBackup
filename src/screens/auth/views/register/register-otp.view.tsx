import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useCheckPhoneNoAvailability,
  useOTP,
  useMerchant,
  setErrorMessage,
} from '@screen/auth/functions';
import { REGISTER_STEP_1_VIEW } from '@screen/auth/functions/screens_name';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const { checkPhone } = useCheckPhoneNoAvailability();
  const { verifyOTPRegister, verifyOTP, mobilePhone } = useOTP();
  const { goBack, replace }: any = useNavigation();
  const [hide, setHide] = React.useState(true);
  const { saveUserData, resetMerchantData } = useMerchant();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      resetMerchantData();
      saveUserData({ mobilePhone });
      replace(REGISTER_STEP_1_VIEW);
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
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
    </SnbContainer>
  );
};

export default RegisterOTPView;
