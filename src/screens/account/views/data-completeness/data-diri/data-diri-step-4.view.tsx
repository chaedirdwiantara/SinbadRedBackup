import React, { useEffect, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbTextField2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { View, ScrollView, BackHandler, Image } from 'react-native';
import { useEasyRegistration } from '@screen/account/functions';
import { MerchantHookFunc } from '../../../../merchant/function';
import { contexts } from '@contexts';
import { NavigationAction } from '@navigation';

const DataDiriStep4View: React.FC = () => {
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    backToDataCompleteness,
    refetchCompleteData,
  } = useEasyRegistration();
  const [email, setEmail] = useState(completeDataState?.data?.userData?.email);
  const refModalListOfStep = React.useRef<SnbBottomSheet2Ref>()
  const refModalBack = React.useRef<SnbBottomSheet2Ref>()
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [backHandle, setBackHandle] = useState(false);
  const changeEmailAction = MerchantHookFunc.useChangeEmail();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );

  // HANDLE BACK DEVICE
  React.useEffect(() => {
    const backAction = () => {
      refModalBack.current?.open()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  /** VALIDATE EMAIL */
  const validateEmail = (textEmail: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(textEmail)) {
      setEmailIsNotValid(false);
      setErrorMessage('');
    } else {
      setEmailIsNotValid(true);
      setErrorMessage('Pastikan email yang Anda masukkan benar');
    }
    if (textEmail === '') {
      setEmailIsNotValid(false);
      setErrorMessage('');
    }
    setEmail(textEmail);
  };

  const confirm = () => {
    if (completeDataState?.data?.userData?.email || email) {
      if (emailIsNotValid === false) {
        const data = {
          email: email,
        };
        if (
          email === completeDataState?.data?.userData?.email ||
          email === '' ||
          email === null
        ) {
          backToDataCompleteness();
        } else {
          changeEmailAction.changeEmail(dispatchSupplier, { data });
        }
      } else {
        setErrorMessage('Pastikan email yang Anda masukkan benar');
      }
    } else {
      backToDataCompleteness();
    }
  };

  const confirmWithBack = () => {
    if (completeDataState?.data?.userData?.email !== email) {
      if (emailIsNotValid === false) {
        updateCompleteData({ user: { email: email } });
      } else {
        setErrorMessage('Pastikan email yang Anda masukkan benar');
      }
    } else {
      backToDataCompleteness();
    }
  };

  useEffect(() => {
    if (stateMerchant.changeEmail.data !== null) {
      NavigationAction.navigate('EmailOtp', {
        type: 'email',
        data: email,
        testID: '10.4',
      });
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (updateCompleteDataState.error) {
      setEmailIsNotValid(true);
      setErrorMessage(updateCompleteDataState.error.message);
    }
  }, [updateCompleteDataState.error]);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      refetchCompleteData();
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
      } else {
        backToDataCompleteness();
        resetUpdateCompleteData();
      }
    }
  }, [updateCompleteDataState]);

  return (
    <SnbContainer color="white">
      <ScrollView style={{ flex: 1 }}>
        <SnbTopNav2.Type3
          backAction={() => refModalBack.current?.open()}
          color="white"
          title="Alamat Email"
          testID={'10'}
        />
        <Stepper
          complete={completeDataState?.data?.userProgress?.completed}
          total={completeDataState?.data?.userProgress?.total}
          onPress={() => refModalListOfStep.current?.open()}
          testID={'10'}
        />
        <View
          style={{ alignItems: 'center', marginVertical: layout.spacing.lg }}>
          <Image
            source={require('@image/sinbad_image/email_ilustration.png')}
            style={{ height: 240 }}
            resizeMode="center"
          />
        </View>
        <View style={{ margin: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={emailIsNotValid ? 'error' : 'default'}
            value={email}
            onChangeText={(text) => validateEmail(text)}
            placeholder={'Masukkan Email'}
            labelText={'Email'}
            mandatory
            valMsgError={errorMessage}
            testID={'10'}
          />
        </View>
      </ScrollView>
      <View style={{ padding: layout.spacing.lg }}>
        <SnbButton2.Primary
          title="Simpan"
          disabled={
            (emailIsNotValid && email) ||
              updateCompleteDataState.loading ||
              stateMerchant.changeEmail.loading ||
              email === '' ||
              email === null
              ? true
              : false
          }
          onPress={() => confirm()}
          loading={
            updateCompleteDataState.loading || stateMerchant.changeEmail.loading
          }
          size="medium"
          full
          testID={'10'}
        />
      </View>
      <ModalBack
        ref={refModalBack}
        confirm={() => {
          if (email && email !== '' && !emailIsNotValid) {
            setBackHandle(true);
            confirmWithBack();
          } else {
            backToDataCompleteness();
          }
        }}
      />
      <ListOfSteps
        type="user"
        ref={refModalListOfStep}
        testID={'10.3'}
      />
    </SnbContainer>
  );
};

export default DataDiriStep4View;
