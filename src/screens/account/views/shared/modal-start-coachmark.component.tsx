import {
  SnbBottomSheet,
  SnbButton,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  onStartCoachmark: () => void;
}

const ModalStartCoachmark: React.FC<Props> = ({ onStartCoachmark }) => {
  const [open, setOpen] = React.useState<boolean>(true);
  return (
    <SnbBottomSheet
      open={open}
      content={
        <View style={{ alignItems: 'center', padding: 12 }}>
          <Image
            resizeMode="center"
            style={{ height: 180, width: 180 }}
            source={require('@image/sinbad_image/verified_sinbad.png')}
          />
          <View style={{ marginVertical: 16 }} />
          <SnbText.H2>Stok aman, jualan nyaman</SnbText.H2>
          <View style={{ marginVertical: 8 }} />
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText.B1 align="center">
              Sinbad membantu Anda mendapatkan produk berkualitas dengan harga
              terbaik. Coba sekarang!
            </SnbText.B1>
          </View>
          <View style={{ marginVertical: 16 }} />
          <View style={{ height: 72 }}>
            <SnbButton.Single
              title="Mulai Jelajah"
              onPress={() => {
                setOpen(false);
                onStartCoachmark();
              }}
              type="primary"
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalStartCoachmark;
