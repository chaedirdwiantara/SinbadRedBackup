import { useNavigation } from '@react-navigation/native';
import {
  maskPhone,
  useOTP,
  setErrorMessage,
  useCheckAutoLogin,
  useAuthAction,
} from '@screen/auth/functions';
import { OTPContent } from '@screen/auth/views/shared';
import React from 'react';
import { ScrollView, View } from 'react-native';
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
import { useDataAuth } from '@core/redux/Data';
import { useAuthCoreAction } from '@core/functions/auth';

const RegisterOTPView: React.FC = () => {
  const {
    verifyOTPRegister,
    verifyOTP,
    mobilePhone,
    getLocationPermissions,
    otpHash,
    type,
  } = useOTP();
  const { goBack }: any = useNavigation();
  const { checkAutoLogin, resetCheckAutoLogin, checkAutoLoginData } =
    useCheckAutoLogin();
  const { requestOTP } = useAuthAction();
  const [reCheckAutoLogin, setReCheckAutoLogin] = React.useState(0);
  const [loadingCheckAutoLogin, setLoadingCheckAutoLogin] =
    React.useState(false);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const authCoreAction = useAuthCoreAction();
  const { meV2 } = useDataAuth();

  React.useEffect(() => {
    if (verifyOTP.data !== null) {
      checkAutoLogin(verifyOTP.data);
      setReCheckAutoLogin(0);
      setLoadingCheckAutoLogin(true);
    }
  }, [verifyOTP]);

  React.useEffect(() => {
    if (checkAutoLoginData?.data?.message === 'Success') {
      authCoreAction.meV2();
    }
  }, [checkAutoLoginData]);

  React.useEffect(() => {
    if (checkAutoLoginData?.data?.message === 'Success') {
      if (meV2.data) {
        getLocationPermissions();
        resetCheckAutoLogin();
      }
    }
  }, [meV2.data]);

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
              otp: otp,
            });
          }}
          resend={() => {
            requestOTP({ mobilePhone, otpHash, type });
          }}
          errorMessage={
            verifyOTP.error?.code ? setErrorMessage(verifyOTP.error?.code) : ''
          }
          otpSuccess={verifyOTP.data !== null}
          loading={verifyOTP.loading || loadingCheckAutoLogin}
          phoneNo={maskPhone(mobilePhone)}
          otpMethod={type}
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
              description="Silakan tunggu atau hubungi customer service Sinbad"
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
