import { useNavigation, StackActions } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
import { DATA_DIRI_STEP_6_VIEW } from '@screen/account/functions/screens_name';
import Svg from '@svg';
import React from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';

const DataDiriStep5View: React.FC = () => {
  const { dispatch } = useNavigation();
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    backToDataCompleteness,
  } = useEasyRegistration();

  const [ktp, setKtp] = React.useState(completeDataState?.data?.userData?.idNo);
  const [npwp, setNpwp] = React.useState(
    completeDataState?.data?.userData?.taxNo,
  );
  const [openModalStep, setOpenModalStep] = React.useState(false);
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const [backHandle, setBackHandle] = React.useState(false);
  const [isKTPValid, setIsKTPValid] = React.useState(false);
  const [isNPWPValid, setIsNPWPValid] = React.useState(false);
  const [messageErrorKTP, setMessageErrorKTP] = React.useState('');
  const [messageErrorNPWP, setMessageErrorNPWP] = React.useState('');

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
      if (backHandle) {
        backToDataCompleteness();
        resetUpdateCompleteData();
        setBackHandle(false);
      } else {
        dispatch(StackActions.replace(DATA_DIRI_STEP_6_VIEW));
        resetUpdateCompleteData();
      }
    }
  }, [updateCompleteDataState]);

  React.useEffect(() => {
    //validate KTP
    if (ktp?.length === 16 || ktp === '' || ktp === null) {
      setMessageErrorKTP('');
      setIsKTPValid(true);
    } else {
      setMessageErrorKTP('Pastikan Nomor KTP 16 Digit');
      setIsKTPValid(false);
    }
    //validate NPWP
    if (npwp?.length === 15 || npwp === '' || ktp === null) {
      setMessageErrorNPWP('');
      setIsNPWPValid(true);
    } else {
      setMessageErrorNPWP('Pastikan Nomor NPWP 15 Digit');
      setIsNPWPValid(false);
    }
  }, [ktp, npwp]);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={() => setOpenModalBack(true)}
        type="white"
        title="Konfirmasi Kartu Identitas"
      />
      <ScrollView style={{ flex: 1 }}>
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
            type={isKTPValid ? 'default' : 'error'}
            value={ktp}
            maxLength={16}
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '');
              setKtp(text);
              setIsKTPValid(false);
              setMessageErrorKTP('');
            }}
            placeholder={'Default Text'}
            labelText={'Nomor KTP'}
            keyboardType={'number-pad'}
            mandatory
            valMsgError={messageErrorKTP}
          />
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={isNPWPValid ? 'default' : 'error'}
            value={npwp}
            maxLength={15}
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '');
              setNpwp(text);
              setIsNPWPValid(false);
              setMessageErrorNPWP('');
            }}
            placeholder={'Default Text'}
            labelText={'Nomor NPWP'}
            keyboardType={'number-pad'}
            mandatory
            valMsgError={messageErrorNPWP}
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Lanjut"
          type="primary"
          disabled={
            !isKTPValid || !isNPWPValid || updateCompleteDataState.loading || !ktp || !npwp
          }
          onPress={() =>
            updateCompleteData({ user: { idNo: ktp, taxNo: npwp } })
          }
          loading={updateCompleteDataState.loading}
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => {
          setBackHandle(true);
          updateCompleteData({ user: { idNo: ktp, taxNo: npwp } });
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

export default DataDiriStep5View;
