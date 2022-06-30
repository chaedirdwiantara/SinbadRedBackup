import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  colorV2,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbButton2,
  SnbDivider2,
  SnbIcon,
  SnbText2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/core';
import { useOTP } from '@screen/auth/functions';

interface Props {
  ref: any,
  phone: string,
  action: 'register' | 'login'
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

const ModalOTPMethod: React.FC<Props> = React.forwardRef((_, ref: any) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const [otpMethod, setOtpMethod] = React.useState('')
  const { } = useOTP()

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
      content={
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
      }
      button={
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Primary
            onPress={() => {
            }}
            title="Terapkan"
            size="medium"
            full
          />
        </View>
      }
    />
  )
})

export default ModalOTPMethod