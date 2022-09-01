import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  colorV2,
  SnbBottomSheet2,
  SnbText2,
  SnbProgress,
  spacingV2 as layout,
  borderV2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
  FooterButton,
} from 'react-native-sinbad-ui';
import ImageEditor from '@sinbad/image-editor';
import { renderIF } from '@screen/auth/functions';
import { BackHandler, Dimensions, View } from 'react-native';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import { useCheckFlagByTask } from '@core/functions/firebase/flag-rtdb.function';
import { useDataFlagRTDB } from '@core/redux/Data';
import { Camera } from './components';

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
      borderRadius: borderV2.radius.sm,
      borderColor: colorV2.bgColor.light,
    }}
  />
);

const CameraWithOCRView = () => {
  const [retake, setRetake] = React.useState<boolean>(false);
  const [isImageProcessed, setIsImageProcessed] = React.useState(false);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(true)
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { processImage, ocrImageState, setOcrStatusRtdb, ocrImageReset } =
    useOCR(true);
  const { ocrStatus } = useDataFlagRTDB() || {};
  useCheckFlagByTask('ocrStatus');

  React.useEffect(() => {
    setOcrStatusRtdb('none');
    return () => {
      setIsMounted(false)
      setOcrStatusRtdb('none');
    }
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
      bottomSheetRef.current?.open();
    } else if (ocrStatus === 'done' && isImageProcessed) {
      goBack();
    } else if (ocrStatus === 'processing') {
      ocrTimeout = setTimeout(() => {
        setOcrStatusRtdb('error')
      }, 15 * 1000);
    }
    return () => {
      clearTimeout(ocrTimeout);
    };
  }, [ocrStatus]);

  React.useEffect(() => {
    if (ocrImageState.error !== null) {
      bottomSheetRef.current?.open();
    }
  }, [ocrImageState]);

  function renderContent() {
    return (
      <View
        style={{ paddingHorizontal: layout.spacing.xl, paddingTop: layout.spacing.md }}
        onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
        <SnbText2.Paragraph.Small align="center">
          Harap menggunakan E-KTP asli dan jelas, difoto di dalam bingkai dengan pencahayaan yang memadai dan tidak buram.
        </SnbText2.Paragraph.Small>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        testID='03.0'
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
      <SnbBottomSheet2
        ref={bottomSheetRef}
        name="modal-ocr-failed"
        type="content"
        contentHeight={contentHeight + 120}
        title={
          <SnbBottomSheetPart.Title
            title="Pastikan Foto Sesuai Ketentuan"
            titleType="center"
            swipeIndicator
          />
        }
        close={() => {
          setOcrStatusRtdb('none');
          isMounted && setRetake(true);
        }}
        content={renderContent()}
        button={
          <FooterButton.Dual
            testID='03.1'
            title1='Lanjutkan'
            button1Press={() => {
              setOcrStatusRtdb('none');
              setRetake(true);
              bottomSheetRef.current?.close()
              setTimeout(() => {
                goBack()
              }, 100)
            }}
            title2='Foto Ulang'
            button2Press={() => {
              setOcrStatusRtdb('none');
              setRetake(true);
              bottomSheetRef.current?.close();
            }}
          />
        }
      />
      {renderIF(
        ocrImageState.loading || ocrStatus === 'processing',
        <View style={{ position: 'absolute', bottom: 36, right: 0, left: 0 }}>
          <SnbProgress size={64} />
        </View>,
      )}
    </View>
  );
};

export default CameraWithOCRView;
