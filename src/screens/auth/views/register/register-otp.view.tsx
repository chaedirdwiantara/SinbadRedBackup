import { useNavigation, useRoute } from '@react-navigation/native';
import {
  maskPhone,
  useCheckPhoneNoAvailability,
  useRegister,
} from '@screen/auth/functions';
import { REGISTER_STEP_1_VIEW } from '@screen/auth/screens_name';
import { OTPContent } from '@screen/auth/shared';
import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import * as models from '@models';

const RegisterOTPView: React.FC = () => {
  const { state } = useCheckPhoneNoAvailability();
  const { saveRegisterUserData, state: registerData } = useRegister();
  const { goBack, replace }: any = useNavigation();
  const { params }: any = useRoute();

  React.useEffect(() => {
    const user: models.User = registerData.user;
    if (user.mobilePhone) {
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
          saveRegisterUserData({ mobilePhone: params?.phoneNo })
        }
        otpCode={state.data.otp}
        loading={state.loading}
        phoneNo={maskPhone(params?.phoneNo)}
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
