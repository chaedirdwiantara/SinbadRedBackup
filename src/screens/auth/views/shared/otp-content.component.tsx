import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  SnbButton,
  SnbOTPInput,
  SnbText,
  SnbOTPTimer,
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
  const { onVerifyOTP, loading, phoneNo, resend, errorMessage, otpSuccess } =
    props;
  const { otp, setOtp } = useOTP();
  const [error, setError] = React.useState(false);

  useEffect(() => {
    if (otp.length < 5) {
      setError(false);
    }
  }, [otp]);

  useEffect(() => {
    if (errorMessage) {
      setError(true);
    }
  }, [errorMessage]);

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
            type={error ? 'error' : 'default'}
            hideIcon
            showMessage={error || otpSuccess ? true : false}
            autoFocusOnLoad
            code={otp}
            onCodeChanged={setOtp}
          />
        </View>
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
