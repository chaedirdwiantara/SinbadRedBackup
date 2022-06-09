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
import { useAuthAction } from '@screen/auth/functions';
import { useNavigation } from '@react-navigation/native';
import { contexts } from '@contexts';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalLogout: React.FC<Props> = ({ open, setOpen }) => {
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  const { stateUser } = React.useContext(contexts.UserContext);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  React.useEffect(() => {
    open ? bottomSheetRef.current?.open() : bottomSheetRef.current?.close();
  }, [open]);

  return (
    <SnbBottomSheet2
      ref={bottomSheetRef}
      close={() => setOpen(false)}
      contentHeight={contentHeight + 100}
      title={
        <SnbBottomSheetPart.Title
          title="Yakin Keluar dari Sinbad?"
          titleType="center"
          swipeIndicator
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
            Apakah anda yakin ingin keluar Aplikasi{' '}
            <SnbText2.Body.Default>SINBAD</SnbText2.Body.Default>?
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
                bottomSheetRef.current?.close();
                logout({
                  mobilePhone:
                    stateUser.detail.data?.ownerData?.profile?.mobilePhone,
                });
                reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
              }}
              title="Keluar Sinbad"
              disabled={false}
              size="medium"
              full
              outline
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => bottomSheetRef.current?.close()}
              title="Batalkan"
              disabled={false}
              size="medium"
              full
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalLogout;
