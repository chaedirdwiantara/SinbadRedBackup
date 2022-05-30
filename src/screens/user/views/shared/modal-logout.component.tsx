import React from 'react';
import Modal from 'react-native-modal';
import {
  colorV2,
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
  borderV2,
} from 'react-native-sinbad-ui';
import { View } from 'react-native';
import { useAuthAction } from '@screen/auth/functions';
import { useNavigation } from '@react-navigation/native';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalLogout: React.FC<Props> = ({ open, setOpen }) => {
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriver
      statusBarTranslucent
      isVisible={open}
      hasBackdrop={true}
      coverScreen={true}
      backdropOpacity={0.4}>
      <View
        style={{
          backgroundColor: colorV2.bgColor.light,
          margin: layout.spacing.xl,
          padding: layout.spacing.lg,
          paddingTop: layout.spacing.xl,
          borderRadius: borderV2.radius.sm,
        }}>
        <SnbText2.Headline.Default align="center">
          Yakin keluar Sinbad ?
        </SnbText2.Headline.Default>
        <View style={{ marginVertical: layout.spacing.xsm }} />
        <View
          style={{
            paddingHorizontal: layout.spacing.xl,
            paddingVertical: layout.spacing.sm,
          }}>
          <SnbText2.Paragraph.Default align="center">
            Apakah anda yakin ingin keluar Aplikasi{' '}
            <SnbText2.Body.Default>SINBAD</SnbText2.Body.Default>?
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{ marginVertical: layout.spacing.sm }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={'Tidak'}
              onPress={() => setOpen(false)}
              disabled={false}
              size="medium"
              full
              outline
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={'Ya'}
              onPress={() => {
                setOpen(false);
                logout();
                reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
              }}
              disabled={false}
              size="medium"
              full
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLogout;
