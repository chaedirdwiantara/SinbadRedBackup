import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import {
  SnbButton2,
  SnbText2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { loginOTPStyle } from '../../styles';
import { useOTP } from '@screen/auth/functions';
import { OTPInput, OTPTimer } from '@screen/shared/views/components';
interface Props {
  onVerifyOTP: (otp: string) => void;
  loading: boolean;
  otpSuccess: boolean;
  phoneNo: string;
  resend: () => void;
  errorMessage: string;
  testID: string;
  otpMethod: 'sms' | 'wa' | string
}

const OTPContent: React.FC<Props> = (props) => {
  const { onVerifyOTP, loading, phoneNo, resend, errorMessage, otpSuccess, otpMethod } =
    props;
  const { otp, setOtp } = useOTP('listeningToHash');
  const [error, setError] = React.useState(false);
  const [otpType, setOtpType] = React.useState<'error' | 'default' | 'success'>(
    'default',
  );

  useEffect(() => {
    if (otp.length < 5) {
      setError(false);
    }
  }, [otp]);

  useEffect(() => {
    if (errorMessage) {
      setError(true);
      setOtpType('error');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (otpSuccess) {
      setOtpType('success');
    }
  }, [otpSuccess]);

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ marginVertical: layout.spacing.xl }}>
        <View style={{ alignSelf: 'center' }}>
          <Image
            source={require('@image/sinbad_image/sinbad_otp.png')}
            style={{ height: 200, resizeMode: 'contain' }}
          />
        </View>
        <View style={loginOTPStyle.titleContainer}>
          <SnbText2.Headline.Default>
            Masukkan kode Verifikasi
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: layout.spacing.xxsm }} />
          <View style={{ paddingHorizontal: layout.spacing['3xl'] }}>
            <SnbText2.Paragraph.Default align="center" testID={'04'}>
              Kode verifikasi telah dikirimkan melalui {otpMethod === 'sms' ? 'sms' : 'Whatsapp'} ke{' '}
              <SnbText2.Body.Default>{phoneNo}</SnbText2.Body.Default>
            </SnbText2.Paragraph.Default>
          </View>
        </View>
        <View style={{ margin: layout.spacing.xxsm }}>
          <OTPInput
            {...props}
            type={otpType}
            showMessage={error || otpSuccess ? true : false}
            code={otp}
            onCodeChanged={(val) => {
              setOtp(val);
              setOtpType('default');
              setError(false);
            }}
            testID={'04'}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: layout.spacing.lg }}>
        <SnbButton2.Primary
          title="Verifikasi"
          onPress={() => onVerifyOTP(otp)}
          loading={loading}
          disabled={otp.length < 5 || loading}
          size="medium"
          full
          testID={'04'}
        />
        <OTPTimer action={resend} />
      </View>
    </View>
  );
};

export default OTPContent;
