/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { RNCamera } from 'react-native-camera';
import apiUploadImage from '@core/services/apiUploadImage';
import RNFetchBlob from 'rn-fetch-blob';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
/** === IMPORT STYLE HERE === */
import RecommendationStyle from '../styles/recommendation.style';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
let camera: any;
/** === COMPONENT === */
const RecommendationHomeView: React.FC = () => {
  const [filePath, setFilePath] = React.useState('');
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { save, upload } = useUploadImageAction();
  console.log(stateGlobal);
  /** === HOOK === */
  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 0.2,
        base64: true,
        pauseAfterCapture: true,
        fixOrientation: true,
        orientation: 'portrait',
      };

      camera
        .takePictureAsync(options)
        .then((data) => {
          save(dispatchGlobal, data.uri);
          setFilePath(data.uri);
          console.log(data);
        })
        .catch(() => {});
    }
  };
  /** => render camera button */
  const renderCameraButton = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}>
          <SnbText.B1>ambil photo</SnbText.B1>
        </TouchableOpacity>
      </View>
    );
  };
  /** => main */
  const cameraOpen = () => {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => {
            upload(dispatchGlobal, stateGlobal.uploadImage.image);
          }}>
          <SnbText.B1>upload</SnbText.B1>
        </TouchableOpacity>
        <View style={{ borderWidth: 1, height: '100%' }}>
          {renderCameraButton()}
          {stateGlobal.uploadImage.image !== '' ? (
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: stateGlobal.uploadImage.image }}
            />
          ) : (
            <View />
          )}

          <RNCamera
            ref={(ref) => {
              camera = ref;
            }}
            ratio={'1:1'}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ height: 500, width: '100%', borderWidth: 1 }}>
      {cameraOpen()}
    </View>
  );
};

export default RecommendationHomeView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
