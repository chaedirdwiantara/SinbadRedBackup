import { useLogin } from '@screen/auth/functions';
import { loginOTPStyle } from '@screen/auth/styles';
import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbOTPInput,
  SnbText,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const FAKE_OTP = '12345';

const Header: React.FC = () => {
  const { goBack } = useLogin();
  return (
    <SnbTopNav.Type3 backAction={goBack} type="white" title="Kode Verifikasi" />
  );
};

const Content: React.FC = () => {
  const [otp, setOtp] = React.useState('');
  React.useEffect(() => {
    setTimeout(() => {
      setOtp('12345');
    }, 3000);
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: ' ' }} style={loginOTPStyle.image} />
      <View style={loginOTPStyle.titleContainer}>
        <SnbText.H2>Masukan kode Verifikasi</SnbText.H2>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B1>
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
          onPress={() => {}}
          type="primary"
          disabled={otp !== FAKE_OTP}
        />
      </View>
      <View style={{ alignItems: 'center', padding: 24 }}>
        <SnbText.B3>
          Mohon tunggu dalam <SnbText.B4>90 detik</SnbText.B4> untuk kirim ulang
        </SnbText.B3>
      </View>
    </ScrollView>
  );
};

const LoginOTPView: React.FC = () => {
  return (
    <SnbContainer color="white">
      <Header />
      <Content />
    </SnbContainer>
  );
};

export default LoginOTPView;
