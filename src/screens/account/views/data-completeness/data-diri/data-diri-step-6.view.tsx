import React, { useEffect, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { View, ScrollView, BackHandler } from 'react-native';
import Svg from '@svg';
import { useEasyRegistration } from '@screen/account/functions';

const DataDiriStep6View: React.FC = () => {
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    backToDataCompleteness,
    refetchCompleteData,
  } = useEasyRegistration();
  const [email, setEmail] = useState(completeDataState?.data?.userData?.email);
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOpenModalBack] = useState(false);
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [backHandle, setBackHandle] = useState(false);

  // HANDLE BACK DEVICE
  React.useEffect(() => {
    const backAction = () => {
      setOpenModalBack(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
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
    setEmail(textEmail);
  };

  const confirm = () => {
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

  useEffect(()=> {
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
        <SnbTopNav.Type3
          backAction={() => setOpenModalBack(true)}
          type="white"
          title="Alamat Email"
        />
        <Stepper
          complete={completeDataState?.data?.userProgress?.completed || 1}
          total={completeDataState?.data?.userProgress?.total || 6}
          onPress={() => setOpenModalStep(true)}
        />
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <Svg name="notification" size={240} />
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={emailIsNotValid ? 'error' : 'default'}
            value={email}
            onChangeText={(text) => validateEmail(text)}
            placeholder={'Masukkan Email'}
            labelText={'Email'}
            mandatory
            valMsgError={errorMessage}
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Simpan"
          type="primary"
          disabled={
            (emailIsNotValid && email) || updateCompleteDataState.loading
              ? true
              : false
          }
          onPress={() => confirm()}
          loading={updateCompleteDataState.loading}
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => {
          setBackHandle(true);
          confirm();
        }}
      />
      <ListOfSteps
        open={openModalStep}
        type="user"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataDiriStep6View;
