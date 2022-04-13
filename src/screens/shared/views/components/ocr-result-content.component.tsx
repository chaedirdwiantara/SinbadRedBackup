import React from 'react';
import { useInput } from '@screen/auth/functions';
import { color, SnbText, SnbTextField } from '@sinbad/react-native-sinbad-ui';
import { View, Image } from 'react-native';
import { IOCRResult } from '@model/global';

interface Props {
  value: (result: IOCRResult) => void;
}

const OCRResultContent: React.FC<Props> = ({ value }) => {
  const nameOnKTP = useInput('');
  const ktpNumber = useInput('', 'number-only');

  React.useEffect(() => {
    if (ktpNumber && nameOnKTP) {
      value({ ktpNumber: ktpNumber.value, nameOnKTP: nameOnKTP.value });
    }
    if (!nameOnKTP.value) {
      nameOnKTP.setMessageError('Bagian ini belum diisi');
      nameOnKTP.setType('error');
    }
    if (!ktpNumber.value) {
      ktpNumber.setMessageError('Nomor KTP harus 16 Digit');
      ktpNumber.setType('error');
    }
  }, [nameOnKTP.value, ktpNumber.value]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SnbText.H4>Foto KTP Diupload</SnbText.H4>
      <View style={{ marginVertical: 4 }} />
      <Image
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/d716/e95a/ec27bf0b7f1c6e49350877d9fbdef7fe?Expires=1650844800&Signature=MWTp9y2ITh7ucs8ZU76EFzWWuBMdRh21XHZz87bh9ZF4hobR8XPjJ35~jU7VgrgnXwib2A7xTwatPqUYPOFNE42j9NWQ1OLbXfhpDbhqP~pfNnkeBZv9LxcBxzj93RcvdT~gF44u6xHg6WALK59OgdfgeToPrbtWfhS0kajKglDK0Wt-lcc8u1RHwAxFUKNt~ldxJh1eYK9rfTXSKHBJ8vRBizcxyEKWhOuZo3f9c8Gg3E9dIOVlliNqKL1Tjkn69KHONMKQRPJARKZAkI5Lno8Mw-vhlTc~4qvBw6N4nn77X5AfmmGn6r0qzKguN6yNkGLfJJfHvuFX~fHVOzMV2Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        }}
        resizeMode="contain"
        style={{ height: 200, marginTop: 16 }}
      />
      <View style={{ padding: 16 }} />
      <SnbTextField.Text
        {...nameOnKTP}
        helpText={
          nameOnKTP.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        labelText="Nama pada KTP"
        placeholder="Masukkan nama pada KTP"
        maxLength={200}
      />
      <View style={{ padding: 16 }} />
      <SnbTextField.Text
        {...ktpNumber}
        labelText="NIK pada KTP"
        placeholder="Masukkan NIK pada KTP"
        maxLength={16}
        helpText={
          ktpNumber.type !== 'error'
            ? 'Abaikan bila sudah sesuai dengan KTP'
            : ''
        }
        keyboardType="number-pad"
        onChangeText={(text) => {
          text = text.replace(/[^0-9]/g, '');
          ktpNumber.setType('default');
          ktpNumber.setValue(text);
          if (text.length === 16 || text === '') {
            ktpNumber.setMessageError('');
          } else {
            ktpNumber.setMessageError('Nomor KTP harus 16 Digit');
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
