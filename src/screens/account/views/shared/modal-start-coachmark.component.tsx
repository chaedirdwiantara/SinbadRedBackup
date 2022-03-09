import { useDataAuth } from '@core/redux/Data';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark } from '@screen/account/functions';
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
  const [open, setOpen] = React.useState<boolean>(false);
  const { coachmarkState } = useCoachmark();
  const { getCoachmark, resetCoachmark } = useCoachmark();
  const { me } = useDataAuth();
  const [mounted, setMounted] = React.useState(true);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    resetCoachmark();
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    me.data && getCoachmark();
  }, [me.data]);

  React.useEffect(() => {
    if (typeof coachmarkState.data?.homeCoachmark === 'boolean' && mounted) {
      setOpen(!coachmarkState.data?.homeCoachmark);
    }
  }, [coachmarkState.data]);

  return (
    <SnbBottomSheet
      open={open}
      isSwipeable
      closeAction={() => setOpen(false)}
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
                navigate('HomeView');
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
