import React from 'react';
import {
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { View } from 'react-native';

interface Props {
  open: boolean;
}

const ModalCompletnessConfirmation: React.FC<Props> = (props) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    if (props.open) {
      bottomSheetRef.current?.open();
    }
  }, [bottomSheetRef.current, props.open]);

  return (
    <SnbBottomSheet2
      ref={bottomSheetRef}
      contentHeight={contentHeight + 100}
      title={
        <SnbBottomSheetPart.Title
          title="Silahkan Konfirmasi"
          titleType="center"
        />
      }
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={bottomSheetRef.current?.close}
        />
      }
      name="modal-logout"
      type="content"
      content={
        <View
          onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}
          style={{ padding: layout.spacing.lg }}>
          <SnbText2.Paragraph.Default align="center">
            Saya sudah melengkapi data-data yang dibutuhkan
          </SnbText2.Paragraph.Default>
        </View>
      }
      button={
        <View
          style={{
            flexDirection: 'row',
            padding: layout.spacing.lg,
          }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => {
                bottomSheetRef.current?.close;
              }}
              title="Konfirmasi"
              size="medium"
              full
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalCompletnessConfirmation;
