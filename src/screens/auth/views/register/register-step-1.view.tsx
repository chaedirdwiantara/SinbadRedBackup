import { useNavigation } from '@react-navigation/core';
import { setErrorMessage, useInput, useMerchant } from '@screen/auth/functions';
import { useCheckEmailAvailability } from '@screen/auth/functions/register-hooks.functions';
import { REGISTER_STEP_2_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import RegisterProgress from '../shared/register-progress.component';

const Content: React.FC = () => {
  const { checkEmail, checkEmailAvailability, resetCheckEmail } =
    useCheckEmailAvailability();
  const { saveUserData } = useMerchant();
  const { navigate } = useNavigation();
  const name = useInput();
  const idNumber = useInput();
  const taxNumber = useInput();
  const email = useInput();

  React.useEffect(() => {
    if (checkEmailAvailability.data !== null) {
      saveUserData({
        name: name.value,
        email: email.value,
        idNo: idNumber.value,
        taxNo: taxNumber.value,
      });
      resetCheckEmail();
      navigate(REGISTER_STEP_2_VIEW);
    }

    if (checkEmailAvailability.error !== null) {
      email.setMessageError(setErrorMessage(checkEmailAvailability.error.code));
    }
  }, [checkEmailAvailability]);

  /** VALIDATE EMAIL */
  const validateEmail = (data: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(data) || !data) {
      email.setMessageError('');
    } else {
      email.setMessageError('Pastikan email yang Anda masukkan benar');
    }
    email.setValue(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            <SnbText.H1>DAFTAR</SnbText.H1>
          </View>
          <RegisterProgress step={1} title="Profil Pemilik" />
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              {...name}
              labelText="Nama Pemilik Toko"
              placeholder="Masukkan nama pemilik toko"
              mandatory
              maxLength={64}
            />
          </View>
          <View
            style={{
              height: 92,
              padding: 16,
              marginBottom: idNumber.valMsgError ? 8 : 0,
            }}>
            <SnbTextField.Text
              {...idNumber}
              mandatory
              maxLength={16}
              labelText="Nomor KTP"
              placeholder="Masukkan nomor KTP anda"
              keyboardType="number-pad"
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                idNumber.setType('default');
                idNumber.setValue(text);
                if (text.length === 16 || text === '') {
                  idNumber.setMessageError('');
                } else {
                  idNumber.setMessageError('Pastikan Nomor KTP 16 Digit');
                }
              }}
            />
          </View>
          <View
            style={{
              height: 92,
              padding: 16,
              marginBottom: taxNumber.valMsgError ? 8 : 0,
            }}>
            <SnbTextField.Text
              {...taxNumber}
              labelText="Nomor NPWP Pemilik"
              maxLength={15}
              placeholder="Masukkan nomor NPWP anda"
              keyboardType="number-pad"
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, '');
                taxNumber.setType('default');
                taxNumber.setValue(text);
                if (text.length === 16 || text === '') {
                  taxNumber.setMessageError('');
                } else {
                  taxNumber.setMessageError('Pastikan Nomor NPWP 15 Digit');
                }
              }}
            />
          </View>
          <View style={{ height: 92, padding: 16, marginBottom: 24 }}>
            <SnbTextField.Text
              {...email}
              labelText="Alamat Email Pemilik"
              placeholder="Masukkan alamat email anda"
              keyboardType="email-address"
              onChangeText={(text) => validateEmail(text)}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          height: 72,
          backgroundColor: 'red',
        }}>
        <SnbButton.Single
          title="Selanjutnya"
          onPress={() => {
            if (email.value !== '') {
              checkEmail({ email: email.value });
            } else {
              saveUserData({
                name: name.value,
                email: email.value,
                idNo: idNumber.value,
                taxNo: taxNumber.value,
              });
              navigate(REGISTER_STEP_2_VIEW);
            }
          }}
          type="primary"
          loading={checkEmailAvailability.loading}
          disabled={
            true ||
            name.value === '' ||
            idNumber.value === '' ||
            idNumber.valMsgError !== '' ||
            taxNumber.valMsgError !== '' ||
            email.valMsgError !== ''
          }
        />
      </View>
    </View>
  );
};

const RegisterStep1View: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep1View;
