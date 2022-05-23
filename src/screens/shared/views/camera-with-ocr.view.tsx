import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  colorV2,
  SnbCamera,
  SnbBottomSheet,
  SnbText2,
  SnbButton2,
  SnbProgress,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import ImageEditor from '@sinbad/image-editor';
import { renderIF } from '@screen/auth/functions';
import { BackHandler, Dimensions, View } from 'react-native';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import { useCheckFlagByTask } from '@core/functions/firebase/flag-rtdb.function';
import { useDataFlagRTDB } from '@core/redux/Data';

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
      borderColor: colorV2.bgColor.light,
    }}
  />
);

const CameraWithOCRView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const [showModalError, setShowModalError] = React.useState<boolean>(true);
  const [retake, setRetake] = React.useState<boolean>(false);
  const { processImage, ocrImageState, resetOcrStatusRtdb, ocrImageReset } =
    useOCR(true);
  const { ocrStatus } = useDataFlagRTDB() || {};
  useCheckFlagByTask('ocrStatus');
  const [isImageProcessed, setIsImageProcessed] = React.useState(false);

  React.useEffect(() => {
    resetOcrStatusRtdb();
    return resetOcrStatusRtdb;
  }, []);

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        ocrImageReset();
        goBack();
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

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
            <View style={{ paddingHorizontal: layout.spacing.xl }}>
              <SnbText2.Paragraph.Small align="center">
                Silahkan upload ulang foto KTP anda kembali. Pastikan jaringan
                anda tersedia.
              </SnbText2.Paragraph.Small>
            </View>
            <View style={{ marginVertical: layout.spacing.sm }} />
            <View style={{ padding: layout.spacing.lg }}>
              <SnbButton2.Primary
                title="Ulang Foto"
                onPress={() => {
                  resetOcrStatusRtdb();
                  setShowModalError(false);
                  setRetake(true);
                }}
                disabled={false}
                size="medium"
                full
              />
            </View>
          </View>
        }
      />
      {renderIF(
        ocrImageState.loading || ocrStatus === 'processing',
        <View style={{ position: 'absolute', bottom: 36, right: 0, left: 0 }}>
          <SnbProgress size={60} />
        </View>,
      )}
    </View>
  );
};

export default CameraWithOCRView;