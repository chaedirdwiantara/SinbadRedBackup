/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  color,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

/** === TYPE === */
interface NeedLoginModalProps {
  visible: boolean;
  onClose: () => void;
  testID: string;
}
/** === COMPONENT === */
const NeedLoginModal: FC<NeedLoginModalProps> = ({
  visible,
  onClose,
  testID,
}) => (
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
            source={sinbadCry}
            style={{
              height: 148,
              width: '100%',
              resizeMode: 'contain',
              marginBottom: 16,
            }}
          />
          <SnbText.B2 color={color.black100}>
            Silahkan masuk dengan akun Anda
          </SnbText.B2>
        </View>
        <View style={{ marginTop: 32, height: 80 }}>
          <SnbButton.Single
            testID={'btn-need-login.' + testID}
            type="primary"
            title="Masuk dengan akun Anda"
            onPress={() => {
              onClose();
              NavigationAction.navigate('LoginPhoneView');
            }}
            disabled={false}
          />
        </View>
      </View>
    }
    closeAction={onClose}
  />
);

export default NeedLoginModal;
