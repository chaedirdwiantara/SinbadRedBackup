import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  color,
  SnbCamera,
  SnbBottomSheet,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
import ImageEditor from '@sinbad/image-editor';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { renderIF, useCamera } from '@screen/auth/functions';
import { Dimensions, View } from 'react-native';

const { height, width: screenWidth } = Dimensions.get('window');

const KtpPhotoFrame = () => (
  <View
    style={{
      top: 0.4 * height,
      right: 0.1 * screenWidth,
      height: 110,
      width: 84,
      position: 'absolute',
      borderWidth: 2,
      borderRadius: 4,
      borderColor: color.white,
    }}
  />
);

const CameraWithOCRView = () => {
  const { navigate } = useNavigation();
  const { save } = useUploadImageAction();
  const { params }: any = useRoute();
  const { saveCapturedImage, resetCamera } = useCamera();
  const { dispatchGlobal } = React.useContext(contexts.GlobalContext);
  const [showModalError, setShowModalError] = React.useState<boolean>(false);
  const [retake, setRetake] = React.useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <SnbCamera
        title={params?.title}
        subtitle={params?.subtitle}
        type={'back'}
        includeBase64
        topOffset={100}
        focusPoints={params?.focusPoints}
        retake={retake}
        onImageCaptured={async (result: any, _) => {
          const width = result.width - result.width * 0.3;
          const x = result.width * 0.15;
          let offsetFactor = 0;
          let sizeFactor = 0;
          switch (params?.type) {
            case 'ktp':
            case 'npwp': {
              offsetFactor = 0.325;
              sizeFactor = 0.65;
              break;
            }
            default:
              break;
          }
          const url = await ImageEditor.cropImage(result.uri, {
            offset: { x, y: result.height * offsetFactor },
            size: { width, height: result.height - result.height * sizeFactor },
          });
          save(dispatchGlobal, url);
          saveCapturedImage({
            url,
            type: params?.type,
          });
        }}
      />
      {renderIF(params?.type === 'ktp', <KtpPhotoFrame />)}
      <SnbBottomSheet
        open={showModalError}
        title="Terjadi Kesalahan Upload"
        isSwipeable
        closeAction={() => {
          setShowModalError(false);
          setRetake(true);
        }}
        actionIcon="close"
        content={
          <View>
            <View style={{ paddingHorizontal: 24 }}>
              <SnbText.B3 align="center">
                Silahkan upload ulang foto KTP anda kembali. Pastikan jaringan
                anda tersedia.
              </SnbText.B3>
            </View>
            <View style={{ marginVertical: 8 }} />
            <View style={{ height: 72 }}>
              <SnbButton.Single
                title="Ulang Foto"
                onPress={() => {
                  setShowModalError(false);
                  setRetake(true);
                }}
                disabled={false}
                type="primary"
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default CameraWithOCRView;
