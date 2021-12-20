import React, { FC, useEffect } from 'react';
import { SnbContainer, color, SnbProgress } from 'react-native-sinbad-ui';
import { RNCamera } from 'react-native-camera';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { MerchantHookFunc } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { NavigationAction } from '@navigation';

let camera: any;
const { width } = Dimensions.get('window');

const TakeProfilePictureView: FC = () => {
  //HOOK
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { dispatchSupplier } = React.useContext(contexts.MerchantContext);
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const editProfileAction = MerchantHookFunc.useEditProfile();
  const { save, upload } = useUploadImageAction();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (stateGlobal.uploadImage.image) {
      upload(dispatchGlobal, stateGlobal.uploadImage.image);

      save(dispatchGlobal, '');
    }
  }, [stateGlobal.uploadImage.image]);
  useEffect(() => {
    if (stateGlobal.uploadImage.data) {
      const data = {
        imageUrl: stateGlobal.uploadImage.data.url,
      };
      editProfileAction.editProfile(dispatchUser, {
        data,
      });
    }
  }, [stateGlobal.uploadImage.data]);
  useEffect(() => {
    if (stateUser.profileEdit.data !== null) {
      editMerchantAction.reset(dispatchSupplier);
      storeDetailAction.detail(dispatchUser);
      editProfileAction.reset(dispatchUser);
      NavigationAction.back();
      save(dispatchGlobal, '');
    }
  }, [stateUser.profileEdit]);

  useEffect(() => {
    if (stateGlobal.uploadImage.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `${stateGlobal.uploadImage.error.message}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      NavigationAction.back();
    }
  });
  //FUNCTION
  const takePicture = async () => {
    try {
      if (camera) {
        setLoading(true);
        const options = {
          quality: 0.2,
          pauseAfterCapture: true,
          fixOrientation: true,
          orientation: 'portrait',
        };

        camera
          .takePictureAsync(options)
          .then((data: { uri: any }) => {
            save(dispatchGlobal, data.uri);
          })
          .catch(() => {});
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const cameraOpen = () => {
    return (
      <>
        <RNCamera
          ref={(ref) => {
            camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View style={styles.overlayCamera} />
          <View>
            <Image
              source={require('../../../../assets/background/take_profile_marker.png')}
              style={{
                width: '100%',
                resizeMode: 'cover',
                height: undefined,
                aspectRatio: 1 / 1,
              }}
            />
          </View>
          <View style={styles.overlayCamera}>
            <TouchableOpacity
              style={styles.boxCircleCamera}
              onPress={() => takePicture()}>
              <View style={styles.cirleButton} />
            </TouchableOpacity>
          </View>
        </RNCamera>
        {loading && (
          <View style={{ position: 'absolute', bottom: 38, right: 0, left: 0 }}>
            <SnbProgress size={60} />
          </View>
        )}
      </>
    );
  };
  return (
    <SnbContainer color={'white'}>
      <View style={styles.mainContainer}>{cameraOpen()}</View>
    </SnbContainer>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayCamera: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  boxCircleCamera: {
    borderColor: color.white,
    borderWidth: 2,
    borderRadius: 40,
    padding: 4,
    margin: 16,
  },
  cirleButton: {
    backgroundColor: color.white,
    borderRadius: 100,
    width: 40,
    height: 40,
  },
});
export default TakeProfilePictureView;
