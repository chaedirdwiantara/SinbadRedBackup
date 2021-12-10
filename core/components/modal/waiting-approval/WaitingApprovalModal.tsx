/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  color,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

/** === TYPE === */
interface WaitingApprovalModalProps {
  visible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}
/** === COMPONENT === */
const WaitingApprovalModal: FC<WaitingApprovalModalProps> = ({
  visible,
  onSubmit,
  onClose,
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
            Sedang Menunggu Verifikasi..
          </SnbText.B2>
          <View style={{ marginTop: 8 }}>
            <SnbText.C1 color={color.black100} align="center">
              Maaf, Akun Anda sedang dalam proses verifikasi dari Sinbad,
              Silahkan kembali lagi nanti
            </SnbText.C1>
          </View>
        </View>
        <View style={{ marginTop: 32, height: 72 }}>
          <SnbButton.Single
            type="primary"
            title="Ok"
            onPress={onSubmit}
            disabled={false}
          />
        </View>
      </View>
    }
    closeAction={onClose}
  />
);

export default WaitingApprovalModal;
