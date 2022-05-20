import { useDataAuth } from '@core/redux/Data';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark } from '@screen/account/functions';
import {
  SnbBottomSheet,
  SnbButton2,
  SnbText2,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  onStartCoachmark: () => void;
}

const ModalStartCoachmark: React.FC<Props> = ({ onStartCoachmark }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { coachmarkState } = useCoachmark();
  const { getCoachmark } = useCoachmark();
  const { me } = useDataAuth();
  const [mounted, setMounted] = React.useState(true);
  const { navigate } = useNavigation();

  React.useEffect(() => {
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
      closeAction={() => setOpen(false)}
      content={
        <View style={{ alignItems: 'center', padding: 12 }}>
          <Image
            resizeMode="contain"
            style={{ height: 180, width: 180 }}
            source={require('@image/onboard/onboard1.png')}
          />
          <View style={{ marginVertical: 16 }} />
          <SnbText2.Headline.Default>
            Stok aman, jualan nyaman
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: 8 }} />
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText2.Paragraph.Default align="center">
              Sinbad membantu Anda mendapatkan produk berkualitas dengan harga
              terbaik. Coba sekarang!
            </SnbText2.Paragraph.Default>
          </View>
          <View style={{ marginVertical: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
            }}>
            <View style={{ flex: 1 }}>
              <SnbButton2.Primary
                title="Mulai Jelajah"
                onPress={() => {
                  navigate('HomeView');
                  setOpen(false);
                  onStartCoachmark();
                }}
                size="medium"
                full
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

export default ModalStartCoachmark;
