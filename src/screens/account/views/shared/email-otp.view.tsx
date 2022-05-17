import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import {
  SnbButton,
  SnbOTPInput,
  SnbText,
  SnbOTPTimer,
  color,
  SnbContainer,
  SnbTopNav,
  SnbBottomSheet,
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
      <SnbTopNav.Type3
        type="white"
        title={'Kode Verifikasi'}
        backAction={() => backFunc()}
      />
    );
  };

  const content = () => {
    return (
      <View style={{ justifyContent: 'space-between' }}>
        <View>
          <Image
            source={require('../../../../assets/images/sinbad_image/otp.png')}
            style={OtpStyle.imageOtp}
          />
          <View style={OtpStyle.titleContainer}>
            <SnbText.H2>Masukkan kode Verifikasi</SnbText.H2>
            <View style={{ marginVertical: 4 }} />
            <SnbText.B1 align="center">
              Kode verifikasi telah dikirimkan melalui{' '}
              {props.route.params.type === 'email' ? 'email' : 'sms'} ke {data}
            </SnbText.B1>
          </View>
          <View style={{ margin: 4 }}>
            <SnbOTPInput
              autoFocusOnLoad
              code={otp}
              onCodeChanged={setOtp}
              otpSuccess={successOTP}
              hideIcon={hideIcon}
              type={'default'}
            />
          </View>
          <View
            style={{
              marginBottom: errorMessage ? 28 : 0,
              marginHorizontal: 16,
            }}>
            <SnbText.B4 color={color.red70} align="center">
              {errorMessage}
            </SnbText.B4>
          </View>
        </View>
        <View>
          <View style={{ height: 72, marginTop: -28, marginBottom: -20 }}>
            <SnbButton.Single
              title="Verifikasi"
              onPress={() => verifyOtp()}
              loading={
                loading ||
                stateMerchant.verificationBankAccount.loading ||
                stateMerchant.verificationEmail.loading ||
                stateMerchant.verificationMobilePhone.loading
              }
              type="primary"
              disabled={otp.length < 5}
            />
          </View>
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
                <SnbText.B2>Email Berhasil Terverifikasi</SnbText.B2>
              </View>
            </View>
            <View style={{ height: 75 }}>
              <SnbButton.Single
                type={'primary'}
                disabled={false}
                onPress={() => confirm()}
                title={'Oke, Saya Mengerti'}
              />
            </View>
          </View>
        }
      />
    </SnbContainer>
  );
};

export default OTPContent;
