import React from 'react';
import { useInput } from '@screen/auth/functions';
import { color, SnbText, SnbTextField } from '@sinbad/react-native-sinbad-ui';
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
    <View style={{ flex: 1, padding: 16 }}>
      <SnbText.H4>Foto KTP Diupload</SnbText.H4>
      <View style={{ marginVertical: 4 }} />
      <Image
        source={{
          uri: `${apiHost.base}/common/api/v1/shared/public/secure-files/${
            ocrImageResult?.imageUid ||
            completeDataState.data?.userData?.imageId
          }`,
          headers: { 'x-platform': 'sinbad-app' },
        }}
        resizeMode="contain"
        style={{ height: 200, marginTop: 16 }}
      />
      <View style={{ padding: 16 }} />
      <SnbTextField.Text
        {...nameOnKtp}
        helpText={
          nameOnKtp.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        labelText="Nama pada KTP"
        placeholder="Masukkan nama pada KTP"
        maxLength={200}
      />
      <View style={{ padding: 16 }} />
      <SnbTextField.Text
        {...idNumber}
        labelText="NIK pada KTP"
        placeholder="Masukkan NIK pada KTP"
        maxLength={16}
        helpText={
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
          backgroundColor: color.blue10,
          padding: 12,
          borderRadius: 8,
          marginTop: 16,
        }}>
        <SnbText.B3 color={color.blue50}>
          Nama secara otomatis diambil dari foto KTP yang anda upload. Periksa
          kembali nama anda bila terjadi kesalahan.
        </SnbText.B3>
      </View>
    </View>
  );
};

export default OCRResultContent;
