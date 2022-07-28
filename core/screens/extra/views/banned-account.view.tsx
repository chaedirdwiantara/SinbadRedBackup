/** === IMPORT PACKAGE HERE ===  */
import React, { useContext } from 'react';
import {
  Content,
  SnbButton2,
  SnbContainer,
  SnbToast2,
  SnbTopNav2,
  spacingV2 as layout
} from '@sinbad/react-native-sinbad-ui';
import { ImagesSinbad } from '@image/sinbad_image/index';
import { Linking, View } from 'react-native';
import { useDataAuth } from '@core/redux/Data';
import { contexts } from '@contexts';
import { NavigationAction } from '@core/functions/navigation';
import { useAuthCoreAction } from '@core/functions/auth';
import { useCoachmark } from '@screen/account/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
import { useGetTotalCartAction } from '@screen/oms/functions';

const BannedACcountView: React.FC = () => {
  const { logout, resetLogout, meReset, meV2Reset } = useAuthCoreAction();
  const { stateUser } = React.useContext(contexts.UserContext);
  const { logout: logoutState, me } = useDataAuth()
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
      NavigationAction.resetToIntroSinbad()
      resetLogout()
    }
    if (logoutState.error) {
      SnbToast2.show(logoutState.error.message, 2500)
    }
  }, [logoutState])

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type1 title='Terjadi Kendala' color='white' />
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: layout.spacing['3xl'], flex: 1 }}>
          <Content.Illustration
            image={ImagesSinbad.forceRegister}
            title="Akun Terblokir"
            description="Maaf, akun Anda terdeteksi melakukan pelanggaran. Jika ada kendala, silahkan hubungi team CS kami"
            imageStyle={{ height: 240, width: 240, resizeMode: 'contain' }}
          />
        </View>
        <View style={{ flexDirection: 'row', padding: layout.spacing.lg, paddingBottom: layout.spacing.xl }}>
          <SnbButton2.Primary
            outline
            title=''
            iconName='chat'
            size='medium'
            onPress={() => {
              Linking.openURL("whatsapp://send?phone=+6282260106010")
                .catch(err => {
                  if (err) {
                    Linking.openURL('market://details?id=com.whatsapp');
                  }
                });
            }}
          />
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              full
              title='Saya Mengerti'
              size='medium'
              onPress={() => {
                if (me.data) {
                  logout({
                    mobilePhone:
                      stateUser.detail.data?.ownerData?.profile?.mobilePhone,
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    </SnbContainer>
  )
};

export default BannedACcountView;
