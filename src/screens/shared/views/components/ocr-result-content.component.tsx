import React from 'react';
import { useInput } from '@screen/auth/functions';
import { color, SnbText, SnbTextField } from '@sinbad/react-native-sinbad-ui';
import { View, Image } from 'react-native';
import { IOCRResult } from '@model/global';
import * as models from '@models';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
// import apiHost from '@core/services/apiHost';

const defaultImage =
  'https://s3-alpha-sig.figma.com/img/d716/e95a/ec27bf0b7f1c6e49350877d9fbdef7fe?Expires=1652054400&Signature=cTYjBbo7lHGdLyGwMEMzdeXcJbk0Ws875cZRzwxRr7QcgZ2jPnbXNZUKsRMg-qLQKObiaxlMOV-m7lt3Kc8tyyA7IHmE83oYw6N3EuMeem~bxDz4R6X8boIPQyrSNGJ~KCrWKijfvlhJ47vibcO7sEi3IQLngW~1HI1WvbaA5GOE-OPKEcTlmg16VVCVH~RWwlMhRpC26zF1YxoRdqIU-UiCsmgzu~9fuMr5WN5gUftceY~eqAAvVQ5JFLm9c7Y3moZBkj5BfdyATmawsEiBxlzuUHD1fQ5-jHWnkRUJnzjH3ou04eYqPmfKv3UIa4JyYD4zv54dexiNYMfyMLPofQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

interface Props {
  onChangeValue: (result: IOCRResult) => void;
  value: models.IOCRResult | null;
}

const OCRResultContent: React.FC<Props> = ({ onChangeValue, value }) => {
  const { ocrImageResult }: any = useOCR(true);

  const nameOnKtp = useInput('');
  const idNumber = useInput('', 'number-only');
  // const [imageUrl] = React.useState(
  //   `${apiHost.base}/common/api/v1/shared/public/secure-files/${ocrImageState.data?.id}`,
  // );

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
      idNumber.setType('default');
      idNumber.setMessageError('');
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
    if (!idNumber.value) {
      idNumber.setMessageError('Nomor KTP harus 16 Digit');
      idNumber.setType('error');
    }
  }, [nameOnKtp.value, idNumber.value]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SnbText.H4>Foto KTP Diupload</SnbText.H4>
      <View style={{ marginVertical: 4 }} />
      <Image
        // source={{ uri: imageUrl || defaultImage }}
        source={{ uri: defaultImage }}
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
          idNumber.setType('default');
          idNumber.setValue(text);
          if (text.length === 16 || text === '') {
            idNumber.setMessageError('');
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
