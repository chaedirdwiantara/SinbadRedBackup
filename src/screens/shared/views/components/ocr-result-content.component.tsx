import React from 'react';
import { useInput } from '@screen/auth/functions';
import {
  colorV2,
  SnbText2,
  SnbTextField2,
  spacingV2 as layout,
  borderV2,
} from '@sinbad/react-native-sinbad-ui';
import { View, Image } from 'react-native';
import { IOCRResult } from '@model/global';
import * as models from '@models';
import { useCamera, useInputFormat } from '@screen/auth/functions/global-hooks.functions';
import apiHost from '@core/services/apiHost';
import { useEasyRegistration } from '@screen/account/functions';
interface Props {
  onChangeValue: (result: IOCRResult) => void;
  value: models.IOCRResult | null;
  testID?: string;
}

const OCRResultContent: React.FC<Props> = ({
  onChangeValue,
  value,
  testID,
}) => {
  const nameOnKtp = useInput('');
  const idNumber = useInputFormat('', 'number-only', 'ktp');
  const { completeDataState } = useEasyRegistration();
  const { capturedImage, resetCamera } = useCamera()

  React.useEffect(() => {
    return resetCamera
  }, []);


  React.useEffect(() => {
    if (value?.nameOnKtp) {
      nameOnKtp.setValue(value.nameOnKtp);
      nameOnKtp.setType('default');
      nameOnKtp.setMessageError('');
    }
    if (value?.idNumber) {
      idNumber.setValue(value.idNumber);
    }
  }, [value]);

  React.useEffect(() => {
    if (idNumber && nameOnKtp) {
      onChangeValue({ idNumber: idNumber.value, nameOnKtp: nameOnKtp.value });
    }
  }, [nameOnKtp.value, idNumber.value]);

  const isImageCaptured = capturedImage?.data?.type === 'ktp';
  let source: any | undefined = '';
  if (isImageCaptured) {
    source = { uri: capturedImage?.data?.url }
  } else {
    source = {
      uri: `${apiHost.base}/common/api/v1/shared/public/secure-files/${completeDataState.data?.userData?.imageId}`,
      headers: { 'x-platform': 'sinbad-app' },
    }
  }
  return (
    <View style={{ flex: 1, padding: layout.spacing.lg }}>
      <SnbText2.Headline.Small>Foto KTP Diupload</SnbText2.Headline.Small>
      <View style={{ marginVertical: layout.spacing.xxsm }} />
      <Image
        source={source}
        resizeMode="contain"
        style={{
          height: 200,
          marginTop: layout.spacing.lg,
          backgroundColor: colorV2.bgColor.green,
        }}
      />
      <View style={{ padding: layout.spacing.lg }} />
      <SnbTextField2.Text
        {...nameOnKtp}
        helperText={
          nameOnKtp.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        labelText="Nama pada KTP"
        placeholder="Masukkan nama pada KTP"
        maxLength={200}
        testID={testID}
      />
      <View style={{ padding: layout.spacing.lg }} />
      <SnbTextField2.Text
        {...idNumber}
        labelText="NIK pada KTP"
        placeholder="Masukkan NIK pada KTP"
        maxLength={18}
        helperText={
          idNumber.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        keyboardType="number-pad"
        testID={testID}
      />
      <View
        style={{
          backgroundColor: colorV2.bgColor.blue,
          padding: layout.spacing.md,
          borderRadius: borderV2.radius.sm,
          marginTop: layout.spacing.lg,
        }}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.link}>
          Nama secara otomatis diambil dari foto KTP yang anda upload. Periksa
          kembali nama anda bila terjadi kesalahan.
        </SnbText2.Paragraph.Small>
      </View>
    </View>
  );
};

export default OCRResultContent;
