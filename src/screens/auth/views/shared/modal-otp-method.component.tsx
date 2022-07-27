import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  colorV2,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbButton2,
  SnbDivider2,
  SnbIcon,
  SnbText2,
  SnbToast,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { useOTP } from '@screen/auth/functions';
import { useDataAuth } from '@core/redux/Data';
import { LOGIN_OTP_VIEW, REGISTER_OTP_VIEW } from '@screen/auth/functions/screens_name';
import { useAuthCoreAction } from '@core/functions/auth';

interface Props {
  ref: any,
  phone: string,
  action: 'register' | 'login',
  onResetField: () => void
}

interface RadioButtonProps {
  label: string;
  onPress: () => void,
  selected: boolean,
  icon?: React.ReactNode
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, onPress, selected, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: layout.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {icon && (
          <View style={{ marginRight: layout.spacing.sm }}>
            {icon}
          </View>
        )}
        <SnbText2.Paragraph.Default>
          {label}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={{ marginHorizontal: layout.spacing.sm }} />
      <SnbIcon
        name={
          selected
            ? 'radio_button'
            : 'radio_button_outline'
        }
        size={22}
        color={
          selected
            ? colorV2.iconColor.red
            : colorV2.iconColor.default
        }
      />
    </TouchableOpacity>
  )
}

const ModalOTPMethod: React.FC<Props> = React.forwardRef(({ phone, action, onResetField }, ref: any) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const [otpMethod, setOtpMethod] = React.useState('')
  const { requestOTP, resetRequestOTP } = useAuthCoreAction()
  const { otpHash } = useOTP()
  const { requestOTP: requestOTPState } = useDataAuth()
  const { navigate } = useNavigation()

  React.useEffect(() => {
    return resetRequestOTP
  }, [])

  const gotToOTP = React.useCallback(() => {
    if (requestOTPState.data !== null) {
      ref.current?.close()
      const navigateTo = action === 'login' ? LOGIN_OTP_VIEW : REGISTER_OTP_VIEW
      const params = { mobilePhone: phone, otpHash, type: otpMethod }
      navigate(navigateTo, params);
      resetRequestOTP()
      onResetField()
    }
  }, [requestOTPState])

  React.useEffect(() => {
    if (requestOTPState.error?.message) {
      ref.current?.close()
      SnbToast.show(requestOTPState.error.message, 2500)
    }
  }, [requestOTPState])

  useFocusEffect(gotToOTP)

  function handleOnGetOTP() {
    const data = { mobilePhone: phone, otpHash, type: otpMethod }
    requestOTP(data)
  }

  const renderContent = () => {
    return (
      <View
        onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}
      >
        <View style={{ paddingHorizontal: layout.spacing.lg, paddingTop: layout.spacing.lg }}>
          <SnbText2.Paragraph.Default align="center">
            Kami akan mengirimkan kode verifikasi ke nomor handphone Anda
          </SnbText2.Paragraph.Default>
        </View>
        <RadioButton
          label='SMS'
          onPress={() => setOtpMethod('sms')}
          selected={otpMethod === 'sms'}
          icon={<SnbIcon name="chat" size={24} color={colorV2.iconColor.default} />} />
        <SnbDivider2 />
        <RadioButton
          label='Whatsapp'
          onPress={() => setOtpMethod('wa')}
          selected={otpMethod === 'wa'}
          icon={<SnbIcon name="whatsapp" size={24} color={colorV2.iconColor.green} />} />
        <SnbDivider2 />
      </View>
    )
  }

  return (
    <SnbBottomSheet2
      close={() => setOtpMethod('')}
      ref={ref}
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
          onRight1Action={ref.current?.close}
        />
      }
      name="modal-pilih-metode-otp"
      type="content"
      content={renderContent()}
      button={
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Primary
            onPress={handleOnGetOTP}
            title="Terapkan"
            size="medium"
            full
            loading={requestOTPState.loading}
            disabled={otpMethod === '' || requestOTPState.loading}
            testID={'03'}
          />
        </View>
      }
    />
  )
})

export default ModalOTPMethod