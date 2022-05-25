import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  SnbButton2,
  SnbOTPInput,
  SnbText2,
  SnbOTPTimer,
  colorV2,
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
  const [hideIcon, setHideIcon] = useState(true);
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
      setHideIcon(false);
    } else if (stateMerchant.verificationEmail.error) {
      setSuccessOTP(false);
      setHideIcon(false);
      setErrorMessage(
        'Pastikan nomor atau kode verifikasi yang Anda masukkan benar',
      );
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
              <Image
                source={require('../../../../assets/images/sinbad_image/otp.png')}
                style={OtpStyle.imageOtp}
              />
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
            <View style={{ margin: layout.spacing.md }}>
              <SnbOTPInput
                autoFocusOnLoad
                code={otp}
                onCodeChanged={setOtp}
                otpSuccess={successOTP}
                hideIcon={hideIcon}
                type={'default'}
              />
              <View
                style={{
                  marginBottom: errorMessage ? layout.spacing.xl : 0,
                  marginHorizontal: layout.spacing.lg,
                }}>
                <SnbText2.Paragraph.Tiny
                  color={colorV2.textColor.error}
                  align="center">
                  {errorMessage}
                </SnbText2.Paragraph.Tiny>
              </View>
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
          <SnbOTPTimer action={resend} timer={90} />
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
