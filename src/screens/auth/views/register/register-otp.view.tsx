import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useOTP,
  setErrorMessage,
  useCheckPhoneV2,
  useCheckAutoLogin,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbBottomSheet2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheetPart,
  Content,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';

const RegisterOTPView: React.FC = () => {
  const {
    verifyOTPRegister,
    verifyOTP,
    mobilePhone,
    getLocationPermissions,
    hashOtp,
  } = useOTP();
  const { goBack }: any = useNavigation();
  const { checkAutoLogin, resetCheckAutoLogin, checkAutoLoginData } =
    useCheckAutoLogin();
  const { checkPhone } = useCheckPhoneV2();
  const [reCheckAutoLogin, setReCheckAutoLogin] = React.useState(0);
  const [loadingCheckAutoLogin, setLoadingCheckAutoLogin] =
    React.useState(false);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      checkAutoLogin(verifyOTP.data);
      setReCheckAutoLogin(0);
      setLoadingCheckAutoLogin(true);
    }
  }, [verifyOTP]);

  React.useEffect(() => {
    if (checkAutoLoginData?.data?.message === 'Success') {
      getLocationPermissions();
      resetCheckAutoLogin();
    }
  }, [checkAutoLoginData]);

  React.useEffect(() => {
    if (
      checkAutoLoginData?.data?.message === 'Processing' &&
      reCheckAutoLogin !== 3
    ) {
      setTimeout(() => {
        checkAutoLogin(verifyOTP.data);
        setReCheckAutoLogin(reCheckAutoLogin + 1);
        setLoadingCheckAutoLogin(true);
      }, 1500);
    }
    if (reCheckAutoLogin === 3) {
      setLoadingCheckAutoLogin(false);
      bottomSheetRef.current?.open();
      resetCheckAutoLogin();
    }
  }, [reCheckAutoLogin, checkAutoLoginData]);

  React.useEffect(() => {
    if (checkAutoLoginData.error !== null) {
      bottomSheetRef.current?.open();
      setLoadingCheckAutoLogin(false);
    }
  }, [checkAutoLoginData.error]);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={goBack}
        color="white"
        title="Kode Verifikasi"
      />
      <ScrollView>
        <OTPContent
          testID="register"
          onVerifyOTP={(otp) => {
            verifyOTPRegister({
              mobilePhoneNo: mobilePhone,
              otp: Number(otp),
            });
          }}
          resend={() => {
            checkPhone({ mobilePhoneNo: mobilePhone, otpHash: hashOtp });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          loading={verifyOTP.loading || loadingCheckAutoLogin}
          phoneNo={maskPhone(mobilePhone)}
        />
      </ScrollView>
      <SnbBottomSheet2
        ref={bottomSheetRef}
        title={<SnbBottomSheetPart.Title title="" />}
        content={
          <View
            onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
            <Content.Illustration
              image={require('@image/sinbad_cry.png')}
              imageStyle={{
                height: 160,
                width: 160,
              }}
              title="Data Anda masih sedang tahap proses"
              description="silahkan tunggu atau hubungi customer service Sinbad"
            />
          </View>
        }
        name="modal-check-self-registration"
        type="content"
        contentHeight={contentHeight + 100}
        button={
          <View style={{ padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              title="Tutup"
              disabled={false}
              onPress={() => {
                bottomSheetRef.current?.close();
                setReCheckAutoLogin(0);
              }}
              size="medium"
              full
            />
          </View>
        }
      />
    </SnbContainer>
  );
};

export default RegisterOTPView;
