import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbListButtonType2,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT FUNCTION HERE === */
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
import { useNavigation } from '@react-navigation/core';
import { contexts } from '@contexts';

const UserSettingView: FC = () => {
  /** === HOOK === */
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  const { stateUser } = React.useContext(contexts.UserContext);
  const toast = React.useRef<any>();

  React.useEffect(() => {
    if (stateUser.update.data !== null) {
      toast.current?.show('Kata Sandi berhasil diperbaharui');
    }
  }, [stateUser.update]);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Pengaturan"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View>
          <SnbListButtonType2
            title={'Ganti Kata Sandi'}
            onPress={() => NavigationAction.navigate('UserChangePasswordView')}
          />
        </View>
        <SnbButton.Single
          type="secondary"
          title="Log Out"
          disabled={false}
          onPress={() => {
            logout();
            reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
          }}
        />
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
      <SnbToast
        ref={toast}
        fadeInDuration={1000}
        fadeOutDuration={500}
        duration={2500}
        position="bottom"
      />
    </SnbContainer>
  );
};

export default UserSettingView;
