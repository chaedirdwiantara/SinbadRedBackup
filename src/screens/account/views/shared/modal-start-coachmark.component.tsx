import { useDataAuth } from '@core/redux/Data';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark } from '@screen/account/functions';
import {
  Content,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbButton2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View } from 'react-native';

interface Props {
  onStartCoachmark: () => void;
}

const ModalStartCoachmark: React.FC<Props> = ({ onStartCoachmark }) => {
  const { coachmarkState } = useCoachmark();
  const { getCoachmark } = useCoachmark();
  const { me } = useDataAuth();
  const [mounted, setMounted] = React.useState(true);
  const { navigate } = useNavigation();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    me.data && getCoachmark();
  }, [me.data]);

  React.useEffect(() => {
    if (
      typeof coachmarkState.data?.homeCoachmark === 'boolean' &&
      !coachmarkState.data?.homeCoachmark &&
      mounted
    ) {
      bottomSheetRef.current?.open();
    }
  }, [coachmarkState.data]);

  return (
    <SnbBottomSheet2
      title={<SnbBottomSheetPart.Title title="" />}
      name="modal-start-coachmark"
      type="content"
      ref={bottomSheetRef}
      contentHeight={contentHeight + 100}
      button={
        <View
          style={{
            flexDirection: 'row',
            padding: layout.spacing.lg,
          }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title="Mulai Jelajah"
              onPress={() => {
                navigate('HomeView');
                onStartCoachmark();
                bottomSheetRef.current?.close();
              }}
              size="medium"
              full
            />
          </View>
        </View>
      }
      content={
        <View onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
          <Content.Illustration
            image={require('@image/onboard/onboard1.png')}
            imageStyle={{ height: 180, width: 180, resizeMode: 'contain' }}
            title="Stok aman, jualan nyaman"
            description="Sinbad membantu Anda mendapatkan produk berkualitas dengan harga
            terbaik. Coba sekarang!"
          />
        </View>
      }
    />
  );
};

export default ModalStartCoachmark;
