import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  SnbButton,
  SnbOTPInput,
  SnbText,
  SnbOTPTimer,
} from 'react-native-sinbad-ui';
import { loginOTPStyle } from '../styles';

const FAKE_OTP = '12345';
interface Props {
  onVerifyOTP: () => void;
  loading: boolean;
}

const OTPContent: React.FC<Props> = ({ onVerifyOTP, loading }) => {
  const [otp, setOtp] = React.useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: ' ' }} style={loginOTPStyle.image} />
      <View style={loginOTPStyle.titleContainer}>
        <SnbText.H2>Masukan kode Verifikasi</SnbText.H2>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B1 align="center">
          Kode verifikasi telah dikirimkan melalui sms ke ****-****-*123
        </SnbText.B1>
      </View>
      <View style={{ margin: 4 }}>
        <SnbOTPInput
          autoFocusOnLoad
          otpSuccess={otp === FAKE_OTP}
          code={otp}
          onCodeChanged={setOtp}
        />
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Verifikasi"
          onPress={onVerifyOTP}
          loading={loading}
          type="primary"
          disabled={otp !== FAKE_OTP}
        />
      </View>
      <SnbOTPTimer action={() => {}} />
    </ScrollView>
  );
};

export default OTPContent;
