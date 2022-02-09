import React from 'react';
import { View } from 'react-native';
import {
  SnbButton,
  SnbOTPInput,
  SnbText,
  SnbOTPTimer,
  color,
} from 'react-native-sinbad-ui';
import { loginOTPStyle } from '../../styles';
import Svg from '@svg';
import { useOTP } from '@screen/auth/functions';
interface Props {
  onVerifyOTP: (otp: string) => void;
  loading: boolean;
  otpSuccess: boolean;
  hideIcon: boolean;
  phoneNo: string;
  resend: () => void;
  errorMessage: string;
}

const OTPContent: React.FC<Props> = (props) => {
  const { onVerifyOTP, loading, phoneNo, resend, errorMessage } = props;
  const { otp, setOtp } = useOTP();

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ marginVertical: 24 }}>
        <View style={{ alignSelf: 'center' }}>
          <Svg name="sinbad_otp" size={220} />
        </View>
        <View style={loginOTPStyle.titleContainer}>
          <SnbText.H2>Masukan kode Verifikasi</SnbText.H2>
          <View style={{ marginVertical: 4 }} />
          <SnbText.B1 align="center">
            Kode verifikasi telah dikirimkan melalui sms ke {phoneNo}
          </SnbText.B1>
        </View>
        <View style={{ margin: 4 }}>
          <SnbOTPInput
            {...props}
            autoFocusOnLoad
            code={otp}
            onCodeChanged={setOtp}
          />
        </View>
        <SnbText.B1 color={color.red70} align="center">
          {errorMessage}
        </SnbText.B1>
      </View>
      <View>
        <SnbButton.Single
          title="Verifikasi"
          onPress={() => onVerifyOTP(otp)}
          loading={loading}
          type="primary"
          disabled={otp.length < 5}
        />
        <SnbOTPTimer action={resend} />
      </View>
    </View>
  );
};

export default OTPContent;
