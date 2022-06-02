import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  SnbButton2,
  SnbText2,
  SnbContainer,
  SnbTopNav2,
  SnbBottomSheet,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import OtpStyle from '../../styles/otp.style';
import { MerchantHookFunc } from '../../../merchant/function';
import { contexts } from '@contexts';
import { NavigationAction } from '@navigation';
import { useEasyRegistration } from '@screen/account/functions';
import { OTPInput, OTPTimer } from '@screen/shared/views/components';
import Svg from '@svg';

interface Props {
  loading: boolean;
  otpSuccess: boolean;
  hideIcon: boolean;
  route: any;
}

const OTPContent: React.FC<Props> = (props) => {
  /** === HOOK === */
  const { loading, data, type } = props.route.params;
  const [otp, setOtp] = useState('');
  const changeEmailAction = MerchantHookFunc.useChangeEmail();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOTP, setSuccessOTP] = useState(false);
  const [otpType, setOtpType] = useState<'error' | 'default' | 'success'>(
    'default',
  );
  const {
    resetUpdateCompleteData,
    backToDataCompleteness,
    refetchCompleteData,
  } = useEasyRegistration();
  //FUNCTION
  const verifyOtp = () => {
    if (type === 'email') {
      // eslint-disable-next-line no-shadow
      const data = {
        email: props.route.params.data,
        code: otp,
      };
      changeEmailAction.verificationEmail(dispatchSupplier, { data });
    }
  };

  useEffect(() => {
    if (stateMerchant.verificationEmail.data) {
      setOpenModalSuccess(true);
      setSuccessOTP(true);
      setOtpType('success');
    } else if (stateMerchant.verificationEmail.error) {
      setSuccessOTP(false);
      setErrorMessage(
        'Pastikan nomor atau kode verifikasi yang Anda masukkan benar',
      );
      setOtpType('error');
    }
  }, [stateMerchant]);

  const confirm = () => {
    if (type === 'email') {
      changeEmailAction.resetVerificationEmail(dispatchSupplier);
      changeEmailAction.reset(dispatchSupplier);
    }
    setOpenModalSuccess(false);
    backToDataCompleteness();
    resetUpdateCompleteData();
  };

  React.useEffect(() => {
    if (stateMerchant.verificationEmail.data !== null) {
      refetchCompleteData();
    }
  }, [stateMerchant.verificationEmail.data]);

  const backFunc = () => {
    if (type === 'email') {
      changeEmailAction.resetVerificationEmail(dispatchSupplier);
      changeEmailAction.reset(dispatchSupplier);
    }
    NavigationAction.back();
  };

  NavigationAction.useCustomBackHardware(() => {
    backFunc();
  });

  const resend = () => {
    if (type === 'email') {
      const data = {
        email: props.route.params.data,
      };
      changeEmailAction.changeEmail(dispatchSupplier, { data });
    }
  };

  /** === VIEW === */
  const header = () => {
    return (
      <SnbTopNav2.Type3
        color="white"
        title={'Kode Verifikasi'}
        backAction={() => backFunc()}
      />
    );
  };

  const content = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={OtpStyle.titleContainer}>
              <View style={{ alignSelf: 'center' }}>
                <Svg name="sinbad_otp" size={200} />
              </View>
              <View
                style={{ padding: layout.spacing.lg, alignItems: 'center' }}>
                <SnbText2.Headline.Default>
                  Masukkan kode Verifikasi
                </SnbText2.Headline.Default>
                <View style={{ marginVertical: layout.spacing.xxsm }} />
                <SnbText2.Paragraph.Default align="center">
                  Kode verifikasi telah dikirimkan melalui{' '}
                  {props.route.params.type === 'email' ? 'email' : 'sms'} ke{' '}
                  {data}
                </SnbText2.Paragraph.Default>
              </View>
            </View>
            <View style={{ margin: layout.spacing.xxsm }}>
              <OTPInput
                autoFocusOnLoad
                code={otp}
                onCodeChanged={(val) => {
                  setOtp(val);
                  setErrorMessage('');
                  setOtpType('default');
                  setSuccessOTP(false);
                }}
                otpSuccess={successOTP}
                type={otpType}
                showMessage={errorMessage !== '' || successOTP}
              />
            </View>
            <View style={{ padding: layout.spacing.lg }}>
              <SnbButton2.Primary
                title="Verifikasi"
                onPress={() => verifyOtp()}
                loading={loading || stateMerchant.verificationEmail.loading}
                disabled={
                  otp.length < 5 ||
                  loading ||
                  stateMerchant.verificationEmail.loading
                }
                full
                size="medium"
              />
            </View>
          </ScrollView>
          <OTPTimer action={resend} timer={90} />
        </View>
      </View>
    );
  };

  //main
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
      <SnbBottomSheet
        open={openModalSuccess}
        content={
          <View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('@image/sinbad_image/smile_sinbad.png')}
                style={OtpStyle.image}
              />
              <View style={{ marginVertical: 16 }}>
                <SnbText2.Paragraph.Default>
                  Email Berhasil Terverifikasi
                </SnbText2.Paragraph.Default>
              </View>
            </View>
            <View style={{ padding: layout.spacing.lg }}>
              <SnbButton2.Primary
                disabled={false}
                onPress={() => confirm()}
                title={'Oke, Saya Mengerti'}
                full
                size="medium"
              />
            </View>
          </View>
        }
      />
    </SnbContainer>
  );
};

export default OTPContent;
