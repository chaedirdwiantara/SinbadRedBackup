import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  SnbButton2,
  SnbText2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { loginOTPStyle } from '../../styles';
import Svg from '@svg';
import { useOTP } from '@screen/auth/functions';
import { OTPInput, OTPTimer } from '@screen/shared/views/components';
interface Props {
  onVerifyOTP: (otp: string) => void;
  loading: boolean;
  otpSuccess: boolean;
  hideIcon: boolean;
  phoneNo: string;
  resend: () => void;
  errorMessage: string;
  testID: string;
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
      <View style={{ marginVertical: layout.spacing.xl }}>
        <View style={{ alignSelf: 'center' }}>
          <Svg name="sinbad_otp" size={200} />
        </View>
        <View style={loginOTPStyle.titleContainer}>
          <SnbText2.Headline.Default>
            Masukkan kode Verifikasi
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: layout.spacing.xxsm }} />
          <View style={{ paddingHorizontal: layout.spacing['3xl'] }}>
            <SnbText2.Paragraph.Default align="center">
              Kode verifikasi telah dikirimkan melalui sms ke{' '}
              <SnbText2.Body.Default>{phoneNo}</SnbText2.Body.Default>
            </SnbText2.Paragraph.Default>
          </View>
        </View>
        <View style={{ margin: layout.spacing.xxsm }}>
          <OTPInput
            {...props}
            type={error ? 'error' : 'default'}
            showMessage={error || otpSuccess ? true : false}
            code={otp}
            onCodeChanged={setOtp}
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
        />
        <OTPTimer action={resend} />
      </View>
    </View>
  );
};

export default OTPContent;
