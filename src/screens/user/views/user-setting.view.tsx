import React, { FC, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbListButtonType2,
  SnbButton,
  SnbDialog,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT FUNCTION HERE === */
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
import { useNavigation } from '@react-navigation/core';

const UserSettingView: FC = () => {
  /** === HOOK === */
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);
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
  //modal confirmation
  const modalConfirmation = () => {
    return (
      <SnbDialog
        title="Yakin keluar Sinbad ?"
        open={showConfirmation}
        okText="Ya"
        cancelText="Tidak"
        cancel={() => {
          setShowConfirmation(false);
        }}
        ok={() => {
          setShowConfirmation(false);
          logout();
          reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
        }}
        content="Apakah anda yakin ingin keluar Aplikasi SINBAD ?"
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
          onPress={() => setShowConfirmation(true)}
        />
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
      {modalConfirmation()}
    </SnbContainer>
  );
};

export default UserSettingView;
