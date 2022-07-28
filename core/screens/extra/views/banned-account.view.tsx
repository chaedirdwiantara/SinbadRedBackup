/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import {
  Content,
  SnbButton2,
  SnbContainer,
  SnbTopNav2,
  spacingV2 as layout
} from '@sinbad/react-native-sinbad-ui';
import { ImagesSinbad } from '@image/sinbad_image/index';
import { Linking, View } from 'react-native';
import { useDataAuth } from '@core/redux/Data';
import { useAuthAction } from '@screen/auth/functions';
import { contexts } from '@contexts';
import { NavigationAction } from '@core/functions/navigation';

const BannedACcountView: React.FC = () => {
  const { me } = useDataAuth()
  const { logout } = useAuthAction();
  const { stateUser } = React.useContext(contexts.UserContext);

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
                NavigationAction.resetToIntroSinbad()
              }}
            />
          </View>
        </View>
      </View>
    </SnbContainer>
  )
};

export default BannedACcountView;
