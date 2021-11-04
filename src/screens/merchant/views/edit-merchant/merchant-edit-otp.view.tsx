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
import { MerchantHookFunc } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { contexts } from '@contexts';
import { NavigationAction } from '@navigation';
interface Props {
  loading: boolean;
  otpSuccess: boolean;
  hideIcon: boolean;
  resend: () => void;
  route: any;
}

const OTPContent: React.FC<Props> = (props) => {
  /** === HOOK === */
  const { loading, resend, data, type } = props.route.params;
  const [otp, setOtp] = useState('');
  const changeEmailAction = MerchantHookFunc.useChangeEmail();
  const changeMobilePhoneAction = MerchantHookFunc.useChangeMobilePhone();
  const changeBankAccountAction = MerchantHookFunc.useChangeBankAccount();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { dispatchUser } = React.useContext(contexts.UserContext);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //FUNCTION
  const verifyOtp = () => {
    if (type === 'email') {
      // eslint-disable-next-line no-shadow
      const data = {
        email: props.route.params.data,
        code: otp,
      };
      changeEmailAction.verificationEmail(dispatchSupplier, { data });
    } else if (type === 'mobilePhone') {
      // eslint-disable-next-line no-shadow
      const data = {
        mobilePhone: props.route.params.data,
        code: otp,
      };
      changeMobilePhoneAction.verificationMobilePhone(dispatchSupplier, {
        data,
      });
    } else if (type === 'bankAccount') {
      // eslint-disable-next-line no-shadow
      const data = {
        code: otp,
      };
      changeBankAccountAction.verificationBankAccount(dispatchSupplier, {
        data,
      });
    }
  };

  useEffect(() => {
    if (
      stateMerchant.verificationEmail.data ||
      stateMerchant.verificationMobilePhone.data ||
      stateMerchant.verificationBankAccount.data
    ) {
      setOpenModalSuccess(true);
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (stateMerchant.verificationEmail.error) {
      setErrorMessage(stateMerchant.verificationEmail.error.message);
    }
  }, [stateMerchant]);

  const confirm = () => {
    if (type === 'email') {
      changeEmailAction.resetVerificationEmail(dispatchSupplier);
      changeEmailAction.reset(dispatchSupplier);
    } else if (type === 'mobilePhone') {
      changeMobilePhoneAction.resetChangeMobilePhone(dispatchSupplier);
      changeMobilePhoneAction.resetVerificationMobilePhone(dispatchSupplier);
    } else if (type === 'bankAccount') {
      changeBankAccountAction.resetChangeBankAccount(dispatchSupplier);
      changeBankAccountAction.resetVerificationBankAccount(dispatchSupplier);
    }
    setOpenModalSuccess(false);
    NavigationAction.backToPage('MerchantDetailProfileView');
    storeDetailAction.detail(dispatchUser, { id: '3' });
  };

  const backFunc = () => {
    if (type === 'email') {
      changeEmailAction.resetVerificationEmail(dispatchSupplier);
      changeEmailAction.reset(dispatchSupplier);
    } else if (type === 'mobilePhone') {
      changeMobilePhoneAction.resetChangeMobilePhone(dispatchSupplier);
      changeMobilePhoneAction.resetVerificationMobilePhone(dispatchSupplier);
    } else if (type === 'bankAccount') {
      changeBankAccountAction.resetChangeBankAccount(dispatchSupplier);
      changeBankAccountAction.resetVerificationBankAccount(dispatchSupplier);
    }
    NavigationAction.back();
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
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Image
            source={require('../../../../assets/images/sinbad_image/otp.png')}
            style={OtpStyle.imageOtp}
          />
          <View style={OtpStyle.titleContainer}>
            <SnbText.H2>Masukan kode Verifikasi</SnbText.H2>
            <View style={{ marginVertical: 4 }} />
            <SnbText.B1 align="center">
              Kode verifikasi telah dikirimkan melalui{' '}
              {props.route.params.type === 'email' ? 'email' : 'sms'} ke {data}
            </SnbText.B1>
          </View>
          <View style={{ margin: 4 }}>
            <SnbOTPInput
              {...props}
              autoFocusOnLoad
              code={otp}
              onCodeChanged={setOtp}
              otpSuccess={true}
            />
          </View>
          <SnbText.B1 color={color.red70} align="center">
            {errorMessage}
          </SnbText.B1>
        </View>
        <View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              title="Verifikasi"
              onPress={() => verifyOtp()}
              loading={loading}
              type="primary"
              disabled={otp.length < 5}
            />
          </View>
          <SnbOTPTimer action={resend} timer={90} />
        </View>
      </View>
    );
  };

  const modalSuccess = () => {
    const label =
      type === 'email'
        ? 'Email'
        : type === 'bankAccount'
        ? 'Nomor Rekening'
        : type === 'mobilePhone'
        ? 'Nomor Handphone'
        : '';
    return openModalSuccess ? (
      <View style={{ backgroundColor: 'red' }}>
        <SnbBottomSheet
          open={openModalSuccess}
          content={
            <View>
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../../../assets/images/sinbad_image/smile_sinbad.png')}
                  style={OtpStyle.image}
                />
                <View style={{ marginVertical: 16 }}>
                  <SnbText.B2>{label} Berhasil Terverifikasi</SnbText.B2>
                </View>
              </View>
              <View>
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
      </View>
    ) : (
      <View />
    );
  };

  //main
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
      {modalSuccess()}
    </SnbContainer>
  );
};

export default OTPContent;
