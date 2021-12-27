/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  color,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === TYPE === */
interface RejectApprovalModalProps {
  visible: boolean;
  onClose: () => void;
  isCallCS?: boolean;
}
/** === COMPONENT === */
const RejectApprovalModal: FC<RejectApprovalModalProps> = ({
  visible,
  onClose,
  // isCallCS,
}) => {
  return (
    <SnbBottomSheet
      open={visible}
      title={' '}
      actionIcon="close"
      content={
        <View
          style={{
            backgroundColor: color.white,
          }}>
          <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
            <Image
              source={require('../../../../src/assets/images/sinbad_image/failed_error.png')}
              style={{
                height: 148,
                width: '100%',
                resizeMode: 'contain',
                marginBottom: 16,
              }}
            />
            <SnbText.B2 color={color.black100}>
              Akun kamu gagal terverifikasi
            </SnbText.B2>
            <View style={{ marginTop: 8 }}>
              <SnbText.C1 color={color.black100} align="center">
                Data pada akun kamu gagal terverifikasi nih. Yuk, periksa
                halaman profile dan lengkapi data Anda!
              </SnbText.C1>
            </View>
          </View>
          <View style={{ marginTop: 32, height: 72 }}>
            <SnbButton.Single
              type="primary"
              title="Lengkapi Data Diri"
              onPress={() => {
                // goToMenu('UserView');
                NavigationAction.navigate('UserView');
                onClose();
              }}
              disabled={false}
            />
          </View>
          {/* {isCallCS && (
            <View style={{ height: 72 }}>
              <SnbButton.Single
                type="primary"
                title="Hubungi CS"
                onPress={() => {
                  Platform.OS === 'android'
                    ? Linking.openURL('tel:+6282260106010')
                    : Linking.openURL('telprompt:+6282260106010');
                  onClose();
                }}
                disabled={false}
              />
            </View>
          )} */}
        </View>
      }
      closeAction={onClose}
    />
  );
};

export default RejectApprovalModal;
