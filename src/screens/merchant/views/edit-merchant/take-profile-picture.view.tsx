import React, { FC, useEffect } from 'react';
import { SnbContainer, color, SnbIcon } from 'react-native-sinbad-ui';
import { RNCamera } from 'react-native-camera';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
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
    if (stateUser.profileEdit.data) {
      editMerchantAction.reset(dispatchSupplier);
      storeDetailAction.detail(dispatchUser, { id: '3' });
      editProfileAction.reset(dispatchUser);
      NavigationAction.back();
      save(dispatchGlobal, '');
    }
  }, [stateUser]);
  //FUNCTION
  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 0.2,
        pauseAfterCapture: true,
        fixOrientation: true,
        orientation: 'portrait',
      };

      camera
        .takePictureAsync(options)
        .then((data: { uri: any }) => {
          console.log(data);
          save(dispatchGlobal, data.uri);
        })
        .catch(() => {});
    }
  };
  const cameraOpen = () => {
    return (
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        aspect={1}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        defaultTouchToFocus
        flashMode={RNCamera.Constants.FlashMode.on}
        clearWindowBackground={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={styles.overlayCamera} />
        <View style={{ position: 'absolute' }}>
          {/* {this.state.loading ? (
            <Image
              source={require('../../assets/gif/loading/load_triagle.gif')}
              style={{ height: 80, width: 80 }}
            />
          ) : (
            <View />
          )} */}
        </View>
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
            <SnbIcon size={32} name={'camera'} color={color.white} />
          </TouchableOpacity>
        </View>
      </RNCamera>
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
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    borderColor: color.white,
  },
});
export default TakeProfilePictureView;
