import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import {
  SnbButton2,
  SnbContainer,
  SnbText2,
  SnbTextField2,
  SnbTopNav2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';
import { useEasyRegistration } from '@screen/account/functions';
import { DATA_TOKO_STEP_2_VIEW } from '@screen/account/functions/screens_name';

const DataTokoStep1View: React.FC = () => {
  const { navigate } = useNavigation();
  const {
    updateCompleteData,
    completeDataState,
    updateCompleteDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
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

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setOpenModalBack(true);
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      refetchCompleteData();
      resetUpdateCompleteData();
      if (backHandle) {
        backToDataCompleteness();
      } else {
        navigate(DATA_TOKO_STEP_2_VIEW);
      }
    }
  }, [updateCompleteDataState]);

  return (
    <SnbContainer color="white">
      <ScrollView style={{ flex: 1 }}>
        <SnbTopNav2.Type3
          backAction={() => setOpenModalBack(true)}
          color="white"
          title="Informasi Toko"
        />
        <Stepper
          complete={completeDataState?.data?.buyerProgress?.completed}
          total={completeDataState?.data?.buyerProgress?.total}
          onPress={() => setOpenModalStep(true)}
        />
        <View style={{ margin: layout.spacing.lg }}>
          <SnbText2.Body.Default>Sinbad ID</SnbText2.Body.Default>
          <SnbText2.Paragraph.Default>
            {completeDataState?.data?.buyerData?.buyerCode}
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{ margin: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'default'}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Contoh: Samsul'}
            labelText={'Nama Toko'}
            mandatory
          />
        </View>
        <View style={{ margin: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'default'}
            keyboardType={'numeric'}
            value={telp}
            maxLength={11}
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '');
              setTelp(text);
            }}
            placeholder={'Contoh: 0812345678'}
            labelText={'Nomor Telepon Toko'}
            mandatory
          />
        </View>
      </ScrollView>
      <View style={{ padding: layout.spacing.lg }}>
        <SnbButton2.Primary
          title="Lanjut"
          disabled={!name || !telp || updateCompleteDataState.loading}
          onPress={() => {
            const { buyerName, buyerPhoneNo } =
              completeDataState?.data?.buyerData || {};
            if (name !== buyerName || telp !== buyerPhoneNo) {
              updateCompleteData({ buyer: { name, phoneNo: telp } });
            } else {
              navigate(DATA_TOKO_STEP_2_VIEW);
            }
          }}
          loading={updateCompleteDataState.loading}
          size="medium"
          full
        />
      </View>
      <ModalBack
        open={openModalBack}
        closeModal={() => setOpenModalBack(false)}
        confirm={() => {
          setBackHandle(true);
          const { buyerName, buyerPhoneNo } =
            completeDataState?.data?.buyerData || {};
          if (name && telp && (name !== buyerName || telp !== buyerPhoneNo)) {
            updateCompleteData({ buyer: { name: name, phoneNo: telp } });
          } else {
            backToDataCompleteness();
          }
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
