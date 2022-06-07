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
import { MerchantHookFunc } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { contexts } from '@contexts';
import { NavigationAction } from '@navigation';

import { useQuestTaskAction } from '../../../quest/function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { OTPInput, OTPTimer } from '@screen/shared/views/components';
import Svg from '@svg';

interface Props {
  loading: boolean;
  otpSuccess: boolean;
  route: any;
}

const setLabel = (type: string) => {
  let title = '';
  switch (type) {
    case 'email': {
      title = 'Email';
      break;
    }
    case 'bankAccount': {
      title = 'Nomor Rekening';
      break;
    }
    case 'mobilePhone': {
      title = 'Nomor Handphone';
      break;
    }
    default:
      break;
  }
  return title;
};

const OTPContent: React.FC<Props> = (props) => {
  /** === HOOK === */
  const { loading, data, type, source, sourceData } = props.route.params;
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
  const [successOTP, setSuccessOTP] = useState(false);
  const [otpType, setOtpType] = useState<'error' | 'default' | 'success'>(
    'default',
  );
  // related Quest hook
  const { dispatchQuest } = useQuestContext();
  const { update } = useQuestTaskAction();
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
      setSuccessOTP(true);
      setOtpType('success');
      // if source Quest, update quest task status
      if (source === 'Quest') {
        const data = {
          questId: sourceData?.questId,
          taskId: sourceData?.taskId,
          status: 'done',
        };
        update(dispatchQuest, { data });
      }
    } else if (
      stateMerchant.verificationEmail.error ||
      stateMerchant.verificationMobilePhone.error ||
      stateMerchant.verificationBankAccount.error
    ) {
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
    } else if (type === 'mobilePhone') {
      changeMobilePhoneAction.resetChangeMobilePhone(dispatchSupplier);
      changeMobilePhoneAction.resetVerificationMobilePhone(dispatchSupplier);
    } else if (type === 'bankAccount') {
      changeBankAccountAction.resetChangeBankAccount(dispatchSupplier);
      changeBankAccountAction.resetVerificationBankAccount(dispatchSupplier);
    }
    setOpenModalSuccess(false);
    // if source Quest, navigate to quest detail view
    if (source === 'Quest') {
      NavigationAction.navigate('QuestDetailView', {
        questId: sourceData.questId,
      });
    } else {
      NavigationAction.backToPage('MerchantDetailProfileView');
      storeDetailAction.detail(dispatchUser);
    }
    NavigationAction.backToPage('MerchantDetailProfileView');
    storeDetailAction.detail(dispatchUser);
    // if source Quest, navigate to quest detail view
    if (source === 'Quest') {
      NavigationAction.navigate('QuestDetailView', {
        questId: sourceData.questId,
      });
    } else {
      NavigationAction.backToPage('MerchantDetailProfileView');
      storeDetailAction.detail(dispatchUser);
    }
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

  NavigationAction.useCustomBackHardware(() => {
    backFunc();
  });

  const resend = () => {
    if (type === 'email') {
      const data = {
        email: props.route.params.data,
      };
      changeEmailAction.changeEmail(dispatchSupplier, { data });
    } else if (type === 'mobilePhone') {
      const data = {
        mobilePhone: props.route.params.data,
      };
      changeMobilePhoneAction.changeMobilePhone(dispatchSupplier, { data });
    } else if (type === 'bankAccount') {
      const data = props.route.params.bankData;
      changeBankAccountAction.changeBankAccount(dispatchSupplier, { data });
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
                style={{ padding: layout.spacing.sm, alignItems: 'center' }}>
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
                loading={
                  loading ||
                  stateMerchant.verificationBankAccount.loading ||
                  stateMerchant.verificationEmail.loading ||
                  stateMerchant.verificationMobilePhone.loading
                }
                disabled={
                  otp.length < 5 ||
                  loading ||
                  stateMerchant.verificationBankAccount.loading ||
                  stateMerchant.verificationEmail.loading ||
                  stateMerchant.verificationMobilePhone.loading
                }
                full
                size="medium"
              />
            </View>
          </ScrollView>
        </View>
        <OTPTimer action={resend} timer={90} />
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
              <View style={{ marginVertical: layout.spacing.lg }}>
                <SnbText2.Paragraph.Tiny>
                  {setLabel(type)} Berhasil Terverifikasi
                </SnbText2.Paragraph.Tiny>
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
