import { useNavigation } from '@react-navigation/core';
import {
  setErrorMessage,
  useCheckPhoneNoAvailability,
  useInputPhone,
} from '@screen/auth/functions';
import { REGISTER_OTP_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbDialog,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Content: React.FC = () => {
  const phone = useInputPhone();
  const { checkPhone, resetCheckPhone, checkPhoneNoAvailability } =
    useCheckPhoneNoAvailability();
  const { navigate } = useNavigation();
  const { goBack } = useNavigation();

  React.useEffect(() => {
    if (checkPhoneNoAvailability.data !== null) {
      phone.clearText();
      navigate(REGISTER_OTP_VIEW, { phoneNo: phone.value });
    }
    if (checkPhoneNoAvailability.error !== null) {
      phone.setMessageError(
        setErrorMessage(checkPhoneNoAvailability.error.code),
      );
    }
  }, [checkPhoneNoAvailability]);

  React.useEffect(() => {
    return () => {
      resetCheckPhone();
    };
  }, []);

  React.useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SnbDialog
        open={true}
        title="Siapkan KTP Anda"
        ok={() => {}}
        okText="Lanjutkan"
        cancelText="Batal"
        cancel={() => {}}
        content={'Test'}
      />
      <View style={{ padding: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
      </View>
      <View style={{ height: 84, padding: 16 }}>
        <SnbTextField.Text {...phone} keyboardType="phone-pad" />
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          title="Selanjutnya"
          onPress={() => checkPhone({ mobilePhoneNo: phone.value })}
          type="primary"
          loading={checkPhoneNoAvailability.loading}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            checkPhoneNoAvailability.loading
          }
        />
      </View>
    </ScrollView>
  );
};

const RegisterView: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterView;
