import { renderIF, useRegisterStep3 } from '@screen/auth/functions';
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
  const { func, state } = useRegisterStep3();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const renderUploadPhotoRules = () => {
    return (
      <SnbUploadPhotoRules
        rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
        imgSrc="https://s3-alpha-sig.figma.com/img/a472/29ec/6a39c819ea1b71b155ef102e6fe133bb?Expires=1631491200&Signature=He7sZQIlhUQ0DT5S567y7n5RRrp~Dc6oiBzC4dt4Y6pVQ9nTeR9sE3zGwpOndPB32dHUYkkdXh4eSvUkSa5zE-wN-6nTtDza3v~9oCnKccJxq285UsTfYT4Gotg7eBG7Ln-MIVcLKDSLL6rXbs1j5PdSCzyyLKp3CRrYavT9gOY7oCOKZvS7FHztGcQD885sYjyhwYd0dZcNM1XbSQpZllj3d0oRRaJqQIMZOVO6NH9E-U81LToTapltMzPQUXuwJr1qN3wnOjHDM2C6unmWCbPL07CXJJOhtp0vExmwUfOvdLc6z3N2fNeSCVx7~UAJ-GI48i~f0B4YoeDgMsb0Dw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        title="Unggah Foto Selfie KTP"
        buttonLabel="Ambil Foto Selfie & KTP"
        rules={[
          'Posisikan KTP di bawah dagu Anda',
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
          source={{ uri: state?.imageSelfieKTP || ' ' }}
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
              onPress={func.gotoStep4}
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
          <SnbText.B4>3/7 Profil Pemilik</SnbText.B4>
          <View style={{ marginVertical: 4 }} />
          <View
            style={{ height: 8, backgroundColor: color.red60, borderRadius: 8 }}
          />
        </View>
      </View>
      {renderIF(
        state.imageSelfieKTP === null,
        renderUploadPhotoRules(),
        renderImagePreview(),
      )}
    </View>
  );
};

const RegisterStep3View: React.FC = (props) => {
  const {} = props;
  const { goBack } = useRegisterStep3();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep3View;
