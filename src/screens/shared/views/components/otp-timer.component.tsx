import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';
import { useCheckPhoneV2 } from '@screen/auth/functions';
import { SnbButton2, SnbText2, SnbToast, spacingV2 as layout } from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View, StyleSheet } from 'react-native';


interface Props {
  action: () => void;
  timer?: number;
}

const OTPTimer: React.FC<Props> = (props) => {
  const [resend, setResend] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const { resetRequestOTP } = useAuthCoreAction();
  const { checkPhoneV2 } = useCheckPhoneV2();
  const { requestOTP: requestOTPState } = useDataAuth()

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
    if (props.timer) {
      setTimer(props.timer);
    }
  }, [props.timer]);

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
      if (props.timer) {
        setTimer(props.timer);
      }
    }
    return () => clearInterval(interval);
  }, [resend, timer, props.timer]);

  const renderResend = () => {
    return (
      <View style={styles.resend}>
        <View>
          <SnbText2.Paragraph.Default>
            Tidak menerima kode?
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{marginLeft: layout.spacing.xxsm}}>
          <SnbButton2.Link
            title="Kirim Ulang"
            size="small"
            onPress={() => {
              setResend(true);
              props.action();
            }}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <View style={{ ...styles.resend, paddingTop: 18 }}>
        <SnbText2.Paragraph.Default align="center">
          Mohon tunggu dalam{' '}
          <SnbText2.Body.Default>{timer} detik</SnbText2.Body.Default> untuk
          kirim ulang
        </SnbText2.Paragraph.Default>
      </View>
    );
  };

  return resend ? renderTimer() : renderResend();
};

OTPTimer.defaultProps = {
  timer: 90,
};

const styles = StyleSheet.create({
  resend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 8,
  },
});

export default OTPTimer;
