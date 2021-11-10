/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  color,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
/** === TYPE === */
interface RejectApprovalModalProps {
  visible: boolean;
  onSubmit: () => void;
  onClose: () => void;
  isCallCS?: boolean;
}
/** === COMPONENT === */
const RejectApprovalModal: FC<RejectApprovalModalProps> = ({
  visible,
  onSubmit,
  onClose,
  isCallCS,
}) => {
  const onHanldeCallCS = () => {
    //Call CS
  };
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
              style={{ width: 200, marginBottom: 16 }}
            />
            <SnbText.B2 color={color.black100}>
              Akun kamu gagal verifikasi nih
            </SnbText.B2>
            <View style={{ marginTop: 8 }}>
              <SnbText.C1 color={color.black100} align="center">
                Maaf ya, akun kamu gagal diverifikasi oleh kami. Kirim data
                ulang atau jika ada pertanyaan telfon CS kami ya !
              </SnbText.C1>
            </View>
          </View>
          <View style={{ marginTop: 32, height: 72 }}>
            <SnbButton.Single
              type="primary"
              title="Lengkapi Data Diri"
              onPress={onSubmit}
              disabled={false}
            />
            {isCallCS && (
              <SnbButton.Single
                type="primary"
                title="Hubungi CS"
                onPress={onHanldeCallCS}
                disabled={false}
              />
            )}
          </View>
        </View>
      }
      closeAction={onClose}
    />
  );
};

export default RejectApprovalModal;
