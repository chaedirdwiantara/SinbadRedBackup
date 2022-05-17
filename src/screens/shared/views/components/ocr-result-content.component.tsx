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
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import apiHost from '@core/services/apiHost';
import { useEasyRegistration } from '@screen/account/functions';
interface Props {
  onChangeValue: (result: IOCRResult) => void;
  value: models.IOCRResult | null;
}

const OCRResultContent: React.FC<Props> = ({ onChangeValue, value }) => {
  const { ocrImageResult } = useOCR(true);
  const nameOnKtp = useInput('');
  const idNumber = useInput('', 'number-only');
  const { completeDataState } = useEasyRegistration();

  React.useEffect(() => {
    if (ocrImageResult) {
      nameOnKtp.setValue(ocrImageResult?.nameOnKtp);
      idNumber.setValue(ocrImageResult?.idNumber);
    }
  }, [ocrImageResult]);

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
    if (!nameOnKtp.value) {
      nameOnKtp.setMessageError('Bagian ini belum diisi');
      nameOnKtp.setType('error');
    }
  }, [nameOnKtp.value, idNumber.value]);

  return (
    <View style={{ flex: 1, padding: layout.spacing.lg }}>
      <SnbText2.Headline.Small>Foto KTP Diupload</SnbText2.Headline.Small>
      <View style={{ marginVertical: layout.spacing.xxsm }} />
      <Image
        source={{
          uri: `${apiHost.base}/common/api/v1/shared/public/secure-files/${
            ocrImageResult?.imageUid ||
            completeDataState.data?.userData?.imageId
          }`,
          headers: { 'x-platform': 'sinbad-app' },
        }}
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
      />
      <View style={{ padding: layout.spacing.lg }} />
      <SnbTextField2.Text
        {...idNumber}
        labelText="NIK pada KTP"
        placeholder="Masukkan NIK pada KTP"
        maxLength={16}
        helperText={
          idNumber.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        keyboardType="number-pad"
        onChangeText={(text) => {
          text = text.replace(/[^0-9]/g, '');
          idNumber.setValue(text);
          if (text.length === 16) {
            idNumber.setType('default');
          } else {
            idNumber.setMessageError('Nomor KTP harus 16 Digit');
          }
        }}
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
