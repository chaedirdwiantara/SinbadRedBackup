import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  color,
  SnbCamera,
  SnbBottomSheet,
  SnbText,
  SnbButton,
  SnbProgress,
} from 'react-native-sinbad-ui';
import ImageEditor from '@sinbad/image-editor';
import { renderIF } from '@screen/auth/functions';
import { Dimensions, View } from 'react-native';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import { useCheckFlagByTask } from '@core/functions/firebase/flag-rtdb.function';
import { useDataFlagRTDB } from '@core/redux/Data';
import database from '@react-native-firebase/database';
import { uniqueId } from '@core/functions/global/device-data';

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
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const [showModalError, setShowModalError] = React.useState<boolean>(false);
  const [retake, setRetake] = React.useState<boolean>(false);
  const { processImage, ocrImageState } = useOCR(true);
  const { ocrStatus } = useDataFlagRTDB() || {};
  useCheckFlagByTask('ocrStatus');
  const [isImageProcessed, setIsImageProcessed] = React.useState(false);

  React.useEffect(() => {
    return () => {
      const ref = database().ref('sinbadApp').child(uniqueId);
      ref.child('flag').child('ocrStatus').set('none');
    };
  }, []);

  React.useEffect(() => {
    let ocrTimeout: any = null;
    if (ocrStatus === 'error') {
      setShowModalError(true);
    } else if (ocrStatus === 'done' && isImageProcessed) {
      goBack();
    } else if (ocrStatus === 'processing') {
      ocrTimeout = setTimeout(() => {
        setShowModalError(true);
      }, 30 * 1000);
    }
    return () => {
      clearTimeout(ocrTimeout);
    };
  }, [ocrStatus]);

  React.useEffect(() => {
    if (ocrImageState.error !== null) {
      setShowModalError(true);
    }
  }, [ocrImageState]);

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
          setRetake(false);
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
          setIsImageProcessed(true);
          processImage({ imageUrl: url, type: params?.type });
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
      {renderIF(
        ocrImageState.loading,
        <View style={{ position: 'absolute', bottom: 36, right: 0, left: 0 }}>
          <SnbProgress size={60} />
        </View>,
      )}
    </View>
  );
};

export default CameraWithOCRView;
