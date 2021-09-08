import { renderIF, useRegisterStep4 } from '@screen/auth/functions';
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
  const { func, state } = useRegisterStep4();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
        imgSrc="https://s3-alpha-sig.figma.com/img/4f9b/2a06/d04d4acef65a83217d814ed9aa953a31?Expires=1631491200&Signature=X0oHSl7mxGiCRnqORNSDZGjneF7zeUChvEG5nUF5nUmKZZTcEvsVys1nf28ZJFS9zC9MxNpXvWHVqUEeU5xwWseYoex4BayzFXlniyZkKH0LPk7kP4AjeI7MNJosQCSfFLsOmwdItAHXF4PVfBUcp6NZy-BFOMSeWtswxHx78hwCEgM-391d4L2k5fp--hEDxaj5tM41ayxVts9cp6ZdPS~hb-u6bNoK4AKd2TubnW001dPt-8rzBHux6jdOON3gouO-ZC3ZLoCvafLayYsl76jUE7DwM7qjWbfYU0DPDU2IGDDc00yE53R0vCz8hB0kbQTm0wu0sln0gdg6TQpDkw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        title="Unggah Foto NPWP"
        buttonLabel="Ambil Foto NPWP"
        rules={[
          'Pastikan NPWP sesuai dengan identitas Anda',
          'NPWP Tidak silau dan tidak buram',
          'Pastikan NPWP bisa terbaca dengan jelas',
          'Hindari Tangan Menutupi NPWP',
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
          source={{ uri: state?.imageNPWP || ' ' }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 1,
            margin: 16,
          }}
        />
        <View style={{ flex: 0.75, justifyContent: 'space-between' }}>
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
              onPress={func.gotoStep5}
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
          <SnbText.B4>4/7 Profil Pemilik</SnbText.B4>
          <View style={{ marginVertical: 4 }} />
          <View
            style={{ height: 8, backgroundColor: color.red60, borderRadius: 8 }}
          />
        </View>
      </View>
      {renderIF(
        state.imageNPWP === null,
        renderUploadPhotoRules(),
        renderImagePreview(),
      )}
    </View>
  );
};

const RegisterStep4View: React.FC = (props) => {
  const {} = props;
  const { goBack } = useRegisterStep4();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep4View;
