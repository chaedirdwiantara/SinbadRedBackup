import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useCheckPhoneNoAvailability,
  useOTP,
  useRegister,
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
  const { saveRegisterUserData } = useRegister();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      saveRegisterUserData({ mobilePhone });
      replace(REGISTER_STEP_1_VIEW);
    }
    if (verifyOTP.error !== null) {
      setHide(false);
    }
  }, [verifyOTP.data]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={(otp) =>
          verifyOTPRegister({
            mobilePhone,
            otp,
          })
        }
        otpSuccess={verifyOTP.data !== null}
        hideIcon={hide}
        loading={verifyOTP.loading}
        phoneNo={maskPhone(mobilePhone)}
        errorMessage={verifyOTP.error?.message || ''}
        resend={() => {
          checkPhone({ mobilePhoneNo: mobilePhone });
        }}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
