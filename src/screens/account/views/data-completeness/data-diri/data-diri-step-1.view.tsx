import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
} from 'react-native-sinbad-ui';
import { Stepper, ListOfSteps, ModalBack } from '../../shared/index';
import { View, ScrollView, BackHandler } from 'react-native';
import Svg from '@svg';
import { useNavigation, StackActions } from '@react-navigation/core';
import { DATA_DIRI_STEP_2_VIEW } from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';

const DataDiriStep1View: React.FC = () => {
  const { dispatch } = useNavigation();
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    backToDataCompleteness,
    refetchCompleteData,
  } = useEasyRegistration();
  const [name, setName] = useState(completeDataState?.data?.userData?.fullName);
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOpenModalBack] = useState(false);
  const [backHandle, setBackHandle] = useState(false);

  // HANDLE BACK DEVICE
  React.useEffect(() => {
    const backAction = () => {
      setOpenModalBack(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      resetUpdateCompleteData();
      refetchCompleteData();
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
      } else {
        dispatch(StackActions.replace(DATA_DIRI_STEP_2_VIEW));
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
          title="Nama Lengkap"
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
            type={'default'}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Masukkan Nama Lengkap'}
            labelText={'Nama Lengkap'}
            mandatory
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Lanjut"
          type="primary"
          disabled={name || updateCompleteDataState.loading ? false : true}
          onPress={() => updateCompleteData({ user: { name: name } })}
          loading={updateCompleteDataState.loading}
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => {
          setBackHandle(true);
          if ( name && name !== ''){
            updateCompleteData({ user: { name: name } });
            resetUpdateCompleteData();
          } else {
            backToDataCompleteness();
          }
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

export default DataDiriStep1View;
