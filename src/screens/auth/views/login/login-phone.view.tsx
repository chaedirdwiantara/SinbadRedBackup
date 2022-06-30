import {
  setErrorMessage,
  useAuthAction,
  useInputPhone,
} from '@screen/auth/functions';
import {
  LOGIN_OTP_VIEW,
  SELF_REGISTRATION_VIEW,
} from '@screen/auth/functions/screens_name';
import { loginPhoneStyles } from '@screen/auth/styles';
import React, { useEffect } from 'react';
import { View, ScrollView, BackHandler, Image } from 'react-native';
import {
  colorV2,
  Option,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbButton2,
  SnbContainer,
  SnbIcon,
  SnbText2,
  SnbTextField2,
  SnbTopNav2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';

const Content: React.FC = () => {
  const { navigate } = useNavigation();
  const { requestOTP, requestOTPState, resetRequestOTP } = useAuthAction();
  const phone = useInputPhone();
  const { reset } = useNavigation();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    bottomSheetRef.current?.open()
    return resetRequestOTP;
  }, []);

  React.useEffect(() => {
    if (requestOTPState.data !== null) {
      phone.clearText();
      navigate(LOGIN_OTP_VIEW, { phoneNo: phone.value });
    }
    if (requestOTPState.error !== null) {
      phone.setMessageError(setErrorMessage(requestOTPState.error.code));
    }
  }, [requestOTPState]);

  useEffect(() => {
    const backAction = () => {
      reset({ index: 0, routes: [{ name: 'Home' }] });
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
      <Image
        source={require('@image/sinbad_image/login_register.png')}
        style={{
          height: 220,
          alignSelf: 'center',
          marginVertical: layout.spacing.xxl,
          resizeMode: 'contain',
        }}
      />
      <View style={{ padding: layout.spacing.lg }}>
        <SnbTextField2.Text
          {...phone}
          labelText="Nomer Handphone"
          keyboardType="phone-pad"
        />
      </View>
      <View style={{ marginTop: layout.spacing.lg }} />
      <View style={{ paddingHorizontal: layout.spacing.lg }}>
        <SnbButton2.Primary
          title="Selanjutnya"
          onPress={() => {
            resetRequestOTP();
            requestOTP({ mobilePhone: phone.value });
          }}
          loading={requestOTPState.loading}
          disabled={
            phone.value === '' ||
            phone.valMsgError !== '' ||
            requestOTPState.loading
          }
          size="medium"
          full
        />
      </View>
      <View style={loginPhoneStyles.registerLink}>
        <SnbText2.Paragraph.Default>
          Belum punya akun Sinbad?
        </SnbText2.Paragraph.Default>
        <View style={{ marginLeft: -layout.spacing.sm }}>
          <SnbButton2.Link
            title="Daftar"
            size="medium"
            onPress={() => {
              phone.clearText();
              navigate(SELF_REGISTRATION_VIEW);
            }}
          />
        </View>
      </View>
      <SnbBottomSheet2
        ref={bottomSheetRef}
        contentHeight={contentHeight + 100}
        title={
          <SnbBottomSheetPart.Title
            title="Pilih Metode Verifikasi"
            titleType="center"
            swipeIndicator
          />
        }
        navigation={
          <SnbBottomSheetPart.Navigation
            iconRight1Name="x"
            onRight1Action={bottomSheetRef.current?.close}
          />
        }
        name="modal-logout"
        type="content"
        content={
          <View
            onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}
          >
            <View style={{ padding: layout.spacing.lg }}>
              <SnbText2.Paragraph.Default align="center">
                Kami akan mengirimkan kode verifikasi ke nomor handphone Anda
              </SnbText2.Paragraph.Default>
            </View>
            <Option.Radio
              iconComponent={<SnbIcon name="chat" size={24} color={colorV2.iconColor.default} />}
              label='SMS'
              value={"Test"}
            />
            <Option.Radio
              iconComponent={<SnbIcon name="whatsapp" size={24} color={colorV2.iconColor.green} />}
              label='SMS'
              value={"Test"}
              disabled
            />
          </View>
        }
        button={
          <View style={{ padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              onPress={() => { }}
              title="Terapkan"
              disabled={false}
              size="medium"
              full
            />
          </View>
        }
      />
    </ScrollView>
  );
};

const LoginPhoneView = () => {
  const { reset } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
        color="white"
        title="Masuk"
      />
      <Content />
    </SnbContainer>
  );
};

export default LoginPhoneView;
