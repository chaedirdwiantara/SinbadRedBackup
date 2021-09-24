import { useNavigation, useRoute } from '@react-navigation/native';
import {
  maskPhone,
  useCheckPhoneNoAvailability,
  useOTP,
  useRegister,
} from '@screen/auth/functions';
import { REGISTER_STEP_1_VIEW } from '@screen/auth/screens_name';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const { checkPhone } = useCheckPhoneNoAvailability();
  const { saveRegisterUserData, state: registerData } = useRegister();
  const { verifyOTPRegister, verifyOTP } = useOTP();
  const { goBack, replace }: any = useNavigation();
  const { params }: any = useRoute();
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      setHide(false);
      saveRegisterUserData({ mobilePhone: params?.phoneNo });
    }
  }, [verifyOTP.data]);

  React.useEffect(() => {
    if (registerData.user?.mobilePhone !== '') {
      replace(REGISTER_STEP_1_VIEW);
    }
  }, [registerData.user]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        type="white"
        title="Kode Verifikasi"
      />
      <OTPContent
        onVerifyOTP={() =>
          verifyOTPRegister({ mobilePhone: params?.phoneNo, otp: '12345' })
        }
        otpSuccess={verifyOTP.data !== null}
        hideIcon={hide}
        loading={verifyOTP.loading}
        phoneNo={maskPhone(params?.phoneNo)}
        resend={() => {
          checkPhone({ mobilePhoneNo: params?.phoneNo });
        }}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
