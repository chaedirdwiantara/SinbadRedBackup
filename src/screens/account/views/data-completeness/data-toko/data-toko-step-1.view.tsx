import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import { SnbButton, SnbContainer, SnbText, SnbTextField, SnbTopNav } from 'react-native-sinbad-ui';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';
import { useEasyRegistration } from '@screen/account/functions';
import {
  DATA_TOKO_STEP_2_VIEW,
  DATA_COMPLETENESS_VIEW,
} from '@screen/account/functions/screens_name';

const DataTokoStep1View: React.FC = () => {
  const { navigate, reset } = useNavigation();
  const {
    updateCompleteData,
    completeDataState,
    updateCompleteDataState,
    resetUpdateCompleteData,
  } = useEasyRegistration();
  
  const [name, setName] = useState(
    completeDataState?.data?.buyerData?.buyerName,
  );
  const [telp, setTelp] = useState(
    completeDataState?.data?.buyerData?.buyerPhoneNo,
  );
  const [openModalStep, setOpenModalStep] = useState(false);
  const [openModalBack, setOpenModalBack] = useState(false);
  const [backHandle, setBackHandle] = useState(false);

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

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      if (backHandle) {
        reset({ index: 0, routes: [{ name: DATA_COMPLETENESS_VIEW }] });
        resetUpdateCompleteData();
        setBackHandle(false);
      } else {
        navigate(DATA_TOKO_STEP_2_VIEW);
        resetUpdateCompleteData();
      }
    } else {
      if (backHandle) {
        reset({ index: 0, routes: [{ name: DATA_COMPLETENESS_VIEW }] });
        resetUpdateCompleteData();
        setBackHandle(false);
      }
    }
    // reset({ index: 0, routes: [{ name: DATA_COMPLETENESS_VIEW }] });
  }, [updateCompleteDataState]);
  
  return (
    <SnbContainer color="white">
      <ScrollView style={{ flex: 1 }}>
        <SnbTopNav.Type3
          backAction={() => setOpenModalBack(true)}
          type="white"
          title="Informasi Toko"
        />
        <Stepper
          complete={1}
          total={3}
          onPress={() => setOpenModalStep(true)}
        />
        <View style={{ margin: 16 }}>
          <SnbText.H4>Sinbad ID</SnbText.H4>
          <SnbText.B1 color='#aaa'>001122334455</SnbText.B1>
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={'default'}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Contoh: Samsul'}
            labelText={'Nama Toko'}
            mandatory
          />
        </View>
        <View style={{ margin: 16 }}>
          <SnbTextField.Text
            type={'default'}
            keyboardType={'phone-pad'}
            value={telp}
            maxLength={11}
            onChangeText={(text) => setTelp(text)}
            placeholder={'Contoh: 0812345678'}
            labelText={'Nomor Telepon Toko'}
            mandatory
          />
        </View>
      </ScrollView>
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title="Lanjut"
          type="primary"
          disabled={name && telp ? false : true}
          onPress={() => updateCompleteData({ buyer: { name: name, phoneNo: telp }})}
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => {
          setBackHandle(true);
          updateCompleteData({ buyer: { name: name, phoneNo: telp }});
        }}
      />
      <ListOfSteps
        open={openModalStep}
        type="buyer"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataTokoStep1View;
