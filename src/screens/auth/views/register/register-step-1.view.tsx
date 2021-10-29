import { useNavigation } from '@react-navigation/core';
import { setErrorMessage, useInput, useMerchant } from '@screen/auth/functions';
import { useCheckEmailAvailability } from '@screen/auth/functions/register-hooks.functions';
import { REGISTER_STEP_2_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  color,
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            <SnbText.H1>DAFTAR</SnbText.H1>
          </View>
          <View style={{ margin: 16 }}>
            <SnbText.B4>1/7 Profil Pemilik</SnbText.B4>
            <View style={{ marginVertical: 4 }} />
            <View
              style={{
                height: 8,
                backgroundColor: color.red60,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              {...name}
              labelText="Nama Pemilik Toko"
              placeholder="Masukkan nama pemilik toko"
              mandatory
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              {...idNumber}
              mandatory
              maxLength={16}
              labelText="Nomor KTP"
              placeholder="Masukkan nomor KTP anda"
              keyboardType="number-pad"
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              {...taxNumber}
              labelText="Nomor NPWP Pemilik"
              maxLength={15}
              placeholder="Masukkan nomor NPWP anda"
              keyboardType="number-pad"
            />
          </View>
          <View style={{ height: 92, padding: 16, marginBottom: 24 }}>
            <SnbTextField.Text
              {...email}
              maxLength={32}
              labelText="Alamat Email Pemilik"
              placeholder="Masukkan alamat email anda"
              keyboardType="email-address"
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
          shadow
          loading={checkEmailAvailability.loading}
          disabled={name.value === '' || idNumber.value === ''}
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
