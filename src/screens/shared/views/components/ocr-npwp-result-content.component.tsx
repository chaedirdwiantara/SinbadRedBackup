import React from 'react';
import { useInput } from '@screen/auth/functions';
import { SnbText, SnbTextField } from '@sinbad/react-native-sinbad-ui';
import { View, Image } from 'react-native';
import { IOCRResult } from '@model/global';
import * as models from '@models';

interface Props {
  onChangeValue: (result: IOCRResult) => void;
  value: models.IOCRResult | null;
}

const OCRNPWPResultContent: React.FC<Props> = ({ onChangeValue, value }) => {
  const nameOnNPWP = useInput('');
  const idNumber = useInput('', 'number-only');

  React.useEffect(() => {
    if (value?.nameOnNPWP) {
      nameOnNPWP.setValue(value.nameOnNPWP);
      nameOnNPWP.setType('default');
      nameOnNPWP.setMessageError('');
    }
    if (value?.idNumber) {
      idNumber.setValue(value.idNumber);
      idNumber.setType('default');
      idNumber.setMessageError('');
    }
  }, [value]);

  React.useEffect(() => {
    if (idNumber && nameOnNPWP) {
      onChangeValue({ idNumber: idNumber.value, nameOnNPWP: nameOnNPWP.value });
    }
    if (!nameOnNPWP.value) {
      nameOnNPWP.setMessageError('Bagian ini belum diisi');
      nameOnNPWP.setType('error');
    }
    if (!idNumber.value) {
      idNumber.setMessageError('Nomor NPWP harus 16 Digit');
      idNumber.setType('error');
    }
  }, [nameOnNPWP.value, idNumber.value]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SnbText.H4>Foto NPWP Diupload</SnbText.H4>
      <View style={{ marginVertical: 4, width: 100 }} />
      <Image
        source={require('@image/ocr_npwp.png')}
        resizeMode="contain"
        style={{ height: 200, marginTop: 16, alignSelf: 'center' }}
      />
      <View style={{ padding: 16 }} />
      <SnbTextField.Text
        {...idNumber}
        labelText="Nomor NPWP"
        placeholder="Masukkan NIK pada NPWP"
        maxLength={16}
        helpText={
          idNumber.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan NPWP'
            : ''
        }
        keyboardType="number-pad"
        onChangeText={(text) => {
          text = text.replace(/[^0-9]/g, '');
          idNumber.setType('default');
          idNumber.setValue(text);
          if (text.length === 16 || text === '') {
            idNumber.setMessageError('');
          } else {
            idNumber.setMessageError('Nomor NPWP harus 16 Digit');
          }
        }}
      />
    </View>
  );
};

export default OCRNPWPResultContent;
