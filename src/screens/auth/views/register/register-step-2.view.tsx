import { renderIF, useRegisterStep2 } from '@screen/auth/functions';
import React from 'react';
import { View, LogBox, Image } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
  SnbUploadPhotoRules,
  SnbButton,
} from 'react-native-sinbad-ui';

const Content: React.FC = () => {
  const { func, state } = useRegisterStep2();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
        imgSrc="https://s3-alpha-sig.figma.com/img/4e9b/f869/7b2c7d944da2051c0422f41d9b920d88?Expires=1631491200&Signature=J4sqf6bKuDT1xGesaA2s6W~h7ResGV9fSs6BnX60OWPNU5UMKhkZFnpHxcWH~RXRIVrBam5n5v6jVA8piyLprV5ab3l2-E3ar2ueK2X9K~wNQowIocdAheGhv5EanU6PiWyvQFls-LA7HkQeKOoJ17SHG~C2Xu9C~7RVT6JjlCVZg3bO8luil9pQI5BbatUEcSy8KkLLhrlpj9416wagJGFjpPhP-mrd6ssG2lFZ1dFYE2YfTY8Z35-Fjlyf7pBgWYOGFe4E2MqKpCifyFKR6qITS99qOxrDl~aDmsi0y8Bo0ycobady9GYe5D2X7J9L63uGrG9rWszKvzmozmg3rw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        title="Unggah Foto KTP"
        buttonLabel="Ambil Foto KTP"
        rules={[
          'Pastikan KTP sesuai dengan identitas Anda',
          'KTP Tidak silau dan tidak buram',
          'Pastikan KTP bisa terbaca dengan jelas',
          'Hindari Tangan Menutupi KTP',
        ]}
        action={() => func.gotoCamera()}
      />
    );
  };

  const renderImagePreview = () => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={{ uri: state?.imageKTP || ' ' }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 1,
            margin: 16,
          }}
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ height: 72 }}>
            <SnbButton.Dynamic
              size="small"
              type="tertiary"
              title="Ulangi"
              onPress={() => func.gotoCamera()}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type="primary"
              shadow
              title="Selanjutnya"
              onPress={func.gotoStep3}
              disabled={false}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.H1>DAFTAR</SnbText.H1>
        <View style={{ marginTop: 16 }}>
          <SnbText.B4>2/7 Profil Pemilik</SnbText.B4>
          <View style={{ marginVertical: 4 }} />
          <View
            style={{ height: 8, backgroundColor: color.red60, borderRadius: 8 }}
          />
        </View>
      </View>
      {renderIF(
        state.imageKTP === null,
        renderUploadPhotoRules(),
        renderImagePreview(),
      )}
    </View>
  );
};

const RegisterStep2View: React.FC = (props) => {
  const {} = props;
  const { goBack } = useRegisterStep2();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep2View;
