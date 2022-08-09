import React, { useContext } from 'react';
import {
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
  SnbToast,
} from 'react-native-sinbad-ui';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { contexts } from '@contexts';
import { useDataAuth } from '@core/redux/Data';
import { useAuthCoreAction } from '@core/functions/auth';
import { useCoachmark } from '@screen/account/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
import { useGetTotalCartAction } from '@screen/oms/functions';

interface Props {
  ref: any
}

const ModalLogout: React.FC<Props> = React.forwardRef((_, ref: any) => {
  const { logout, resetLogout, meReset, meV2Reset } = useAuthCoreAction();
  const { reset } = useNavigation();
  const { stateUser } = React.useContext(contexts.UserContext);
  const [contentHeight, setContentHeight] = React.useState(0);
  const { logout: logoutState } = useDataAuth()
  const { resetCoachmark } = useCoachmark()
  const notificationActions = useNotificationTotalActions()
  const totalCartAction = useGetTotalCartAction();
  const { dispatchCart } = useContext(contexts.CartContext);

  React.useEffect(() => {
    return resetLogout
  }, [])

  React.useEffect(() => {
    if (logoutState.data) {
      meReset()
      meV2Reset()
      totalCartAction.reset(dispatchCart)
      notificationActions.reset()
      resetCoachmark()
      ref.current?.close();
      reset({ index: 0, routes: [{ name: 'OnBoardingView' }] });
      resetLogout()
    }
    if (logoutState.error) {
      ref.current?.close()
      SnbToast.show(logoutState.error.message, 2500)
    }
  }, [logoutState])

  return (
    <SnbBottomSheet2
      ref={ref}
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
          onRight1Action={ref.current?.close}
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
                resetLogout()
                logout({
                  mobilePhone:
                    stateUser.detail.data?.ownerData?.profile?.mobilePhone,
                });
              }}
              title="Keluar Sinbad"
              disabled={logoutState.loading}
              size="medium"
              full
              outline
              loading={logoutState.loading}
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => ref.current?.close()}
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
});

export default ModalLogout;
