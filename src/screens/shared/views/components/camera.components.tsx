/** === IMPORT LIB HERE === */
import {
  borderV2,
  colorV2,
  SnbButton,
  SnbIcon,
  SnbProgress,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
/** === GLOBAL === */
const { width, height } = Dimensions.get('window');

const renderIf = (
  params: boolean | any,
  showComp: React.ReactNode,
  hiddenComp?: React.ReactNode | undefined,
) => {
  return params ? showComp : hiddenComp;
};

/** === INTERFACE === */
interface FocusPoint {
  focusPointWidth: number;
  focusPointHeight: number;
  marginBottom?: number;
}
interface Props {
  title: string;
  subtitle: string;
  onImageCaptured: (result: object, cameraResolution: string) => void;
  testID?: string;
  previewImage?: boolean;
  showFlipCameraButton?: boolean;
  showFlashCameraButton?: boolean;
  focusPoints: FocusPoint[];
  imageQuality?: number;
  includeBase64?: boolean;
  markerColor?: string;
  type: 'back' | 'front';
  topOffset?: number;
  retake?: boolean;
}

/** === COMPONENT === */
const Camera: React.FC<Props> = (props) => {
  const [result, setResult] = React.useState<any>(null);
  const [resolution, setResolution] = React.useState<string>('');
  const [type] = React.useState<'back' | 'front'>(props.type);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    title,
    subtitle,
    imageQuality,
    includeBase64,
    markerColor,
    focusPoints,
    previewImage,
    onImageCaptured,
    retake,
  } = props;
  let cameraRef: any = React.useRef(null);

  /* istanbul ignore next */
  React.useEffect(() => {
    if (!previewImage && result !== null) {
      onImageCaptured(result, resolution);
      resetState();
    }
  }, [previewImage, result, resolution, onImageCaptured]);

  React.useEffect(() => {
    if (retake === true && cameraRef) {
      cameraRef.current?.resumePreview();
    }
  }, [retake]);

  /* istanbul ignore next */
  const takePicture = async () => {
    const options = {
      quality: imageQuality,
      fixOrientation: true,
      base64: includeBase64,
      pauseAfterCapture: true,
      forceUpOrientation: true,
      orientation: RNCamera.Constants.Orientation.portrait,
    };
    try {
      if (cameraRef) {
        setLoading(true);
        const data = await cameraRef.current?.takePictureAsync(options);
        if (data) {
          const cameraResolution =
            ((data.height * data.width) / 1000000).toFixed(0) + 'MP';
          setResult(data);
          setResolution(cameraResolution);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  /* istanbul ignore next */
  const resetState = () => {
    setResult(null);
    setResolution('');
    setLoading(false);
  };

  function renderImagePreview() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: result?.uri }}
          resizeMode="contain"
          style={styles.imagePreview}
        />
        <View style={{ height: 72 }}>
          <SnbButton.Multiple
            leftType="tertiary"
            rightType="primary"
            leftTitle="Ulangi"
            rightTitle="Lanjutkan"
            onPressLeft={resetState}
            onPressRight={
              /* istanbul ignore next */
              () => {
                onImageCaptured(result, resolution);
                resetState();
              }
            }
          />
        </View>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={[
          styles.header,
          {
            top: props.topOffset ? props.topOffset : 56,
            paddingHorizontal: layout.spacing['3xl'],
          },
        ]}>
        <SnbText2.Headline.Large
          align="center"
          color={colorV2.textColor.defaultLight}>
          {title}
        </SnbText2.Headline.Large>
        <View style={{ marginVertical: layout.spacing.xxsm }} />
        <SnbText2.Paragraph.Default
          align="center"
          color={colorV2.textColor.defaultLight}>
          {subtitle}
        </SnbText2.Paragraph.Default>
      </View>
    );
  }
  /* istanbul ignore next */
  function renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.boxCircleCamera} onPress={takePicture}>
          <SnbIcon
            name={'camera_alt'}
            size={24}
            color={colorV2.iconColor.dark}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMasking() {
    return (
      <View style={styles.masking}>
        <View style={styles.partialMask} />
        {focusPoints.map((el: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  height: el.focusPointHeight * height,
                }}>
                <View style={styles.sideMask} />
                <View
                  style={{
                    backgroundColor: 'transparent',
                    width: el.focusPointWidth * width,
                  }}
                />
                <View style={styles.sideMask} />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  height: el.marginBottom,
                }}
              />
            </React.Fragment>
          );
        })}
        <View style={styles.partialMask} />
      </View>
    );
  }

  function renderMarker() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {focusPoints.map((el: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <View
                style={{
                  ...styles.marker,
                  width: (el.focusPointWidth + 0.01) * width,
                  height: (el.focusPointHeight + 0.0025) * height,
                  borderColor: markerColor,
                }}
              />
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  height: el.marginBottom,
                }}
              />
            </React.Fragment>
          );
        })}
      </View>
    );
  }

  function renderPreviewCamera() {
    return (
      <>
        <RNCamera
          ref={cameraRef}
          style={styles.cameraPreview}
          type={type}
          playSoundOnCapture
          captureAudio={false}>
          {renderMasking()}
          {renderMarker()}
          {renderHeader()}
          {renderFooter()}
        </RNCamera>
        {loading && (
          <View
            style={{
              position: 'absolute',
              bottom: 36,
              right: 0,
              left: 0,
            }}>
            <SnbProgress size={64} />
          </View>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {renderIf(
        previewImage && result !== null,
        renderImagePreview(),
        renderPreviewCamera(),
      )}
    </SafeAreaView>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: borderV2.radius.sm,
    borderColor: colorV2.bgColor.light,
  },
  boxCircleCamera: {
    backgroundColor: colorV2.bgColor.light,
    borderRadius: 40,
    padding: layout.spacing.lg,
    margin: layout.spacing.lg,
  },
  masking: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  partialMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  focusPointHeight: {
    height: 0.35 * height,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  focusPointWidth: {
    width: 0.9 * width,
    backgroundColor: 'transparent',
  },
  circleButton: {
    backgroundColor: colorV2.bgColor.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  imagePreview: {
    height: undefined,
    width: undefined,
    flex: 1,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.xl,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    right: 0,
    left: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
/** === DEFAULT PROPS === */
Camera.defaultProps = {
  testID: '',
  focusPoints: [{ focusPointWidth: 0.9, focusPointHeight: 0.35 }],
  imageQuality: 0.4,
  includeBase64: false,
  markerColor: colorV2.bgColor.light,
  retake: false,
};
/** === EXPORT COMPONENT === */
export default Camera;
