import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  Content,
  FooterButton,
  SnbText2,
  SnbToast,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useAuthAction, useCheckPhoneV2, useOTP } from '@screen/auth/functions';
import { OTPInput } from '@screen/shared/views/components';
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
  const { onVerifyOTP, loading, phoneNo, resend: resendAction, errorMessage, otpSuccess, otpMethod } =
    props;
  const { otp, setOtp } = useOTP('listeningToHash');
  const [error, setError] = React.useState(false);
  const [otpType, setOtpType] = React.useState<'error' | 'default' | 'success'>(
    'default',
  );
  const [resend, setResend] = React.useState(false);
  const [timer, setTimer] = React.useState(90);
  const { requestOTPState, resetRequestOTP } = useAuthAction();
  const { checkPhoneV2 } = useCheckPhoneV2();

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

  React.useEffect(() => {
    if (
      (requestOTPState.data !== null || checkPhoneV2.data !== null) &&
      resend
    ) {
      resetRequestOTP()
      SnbToast.show('Kode berhasil dikirim', 2500, {
        position: 'top',
        positionValue: 96,
      });
    }
  }, [requestOTPState, checkPhoneV2, resend]);

  React.useEffect(() => {
    let temp = 0;
    let interval: any = null;
    if (resend) {
      /* istanbul ignore next */
      interval = setInterval(() => {
        temp += 1;
        if (timer) {
          setTimer(timer - temp);
        }
      }, 1000);
    }
    if (timer <= 0) {
      clearInterval(interval);
      setResend(false);
      setTimer(90);
    }
    return () => clearInterval(interval);
  }, [resend, timer]);

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ marginVertical: layout.spacing.xl }}>
        <Content.Illustration
          image={require('@image/sinbad_image/sinbad_otp.png')}
          imageStyle={{ height: 200, resizeMode: 'contain' }}
          title="Masukkan kode Verifikasi"
          description={
            <SnbText2.Paragraph.Default align="center">
              Kode verifikasi telah dikirimkan melalui {otpMethod === 'sms' ? 'sms' : 'Whatsapp'} ke{' '}
              <SnbText2.Body.Default>{phoneNo}</SnbText2.Body.Default>
            </SnbText2.Paragraph.Default>
          }
        />
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
          />
        </View>
      </View>
      <FooterButton.Single
        testID={props.testID}
        title='Veriffikasi'
        buttonPress={() => onVerifyOTP(otp)}
        loadingButton={loading}
        disabled={otp.length < 5 || loading}
        textLink={!resend ? "Kirim Ulang" : ""}
        description={
          !resend
            ? "Tidak menerima kode?"
            : (
              <SnbText2.Paragraph.Default align="center">
                Mohon tunggu dalam{' '}
                <SnbText2.Body.Default>{timer} detik</SnbText2.Body.Default> untuk
                kirim ulang
              </SnbText2.Paragraph.Default>
            )
        }
        textLinkPress={() => {
          setResend(true)
          resendAction()
        }}
      />
    </View>
  );
};

export default OTPContent;
