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
interface RegisterSupplierModalProps {
  visible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}
/** === COMPONENT === */
const RegisterSupplierModal: FC<RegisterSupplierModalProps> = ({
  visible,
  onSubmit,
  onClose,
}) => (
  <SnbBottomSheet
    open={visible}
    title={' '}
    action={true}
    actionIcon="close"
    content={
      <View
        style={{
          backgroundColor: color.white,
        }}>
        <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
          <Image
            source={require('../../../../src/assets/images/no_gps.png')}
            style={{ width: 200, marginBottom: 16 }}
          />
          <SnbText.B2 color={color.black100}>
            Supplier butuh datamu nih
          </SnbText.B2>
          <View style={{ marginTop: 8 }}>
            <SnbText.C1 color={color.black100} align="center">
              Kirim data Anda ke supplier untuk dapat berbelanja produk supplier
              terkait sekarang yuk !
            </SnbText.C1>
          </View>
        </View>
        <View style={{ marginTop: 32, height: 72 }}>
          <SnbButton.Single
            type="primary"
            title="Kirim data ke Supplier"
            onPress={onSubmit}
            disabled={false}
          />
        </View>
      </View>
    }
    closeAction={onClose}
  />
);

export default RegisterSupplierModal;
