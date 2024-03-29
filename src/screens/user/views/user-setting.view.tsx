import React, { FC, useState } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbDialog,
  SnbToast,
} from 'react-native-sinbad-ui';
import { ScrollView } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT FUNCTION HERE === */
import { useNavigation } from '@react-navigation/core';
import { contexts } from '@contexts';

const UserSettingView: FC = () => {
  /** === HOOK === */
  const { reset } = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { stateUser } = React.useContext(contexts.UserContext);
  const [isMounted, setIsmounted] = useState(true);

  React.useEffect(() => {
    return () => {
      setIsmounted(false);
      setShowConfirmation(false);
    };
  }, []);

  React.useEffect(() => {
    if (stateUser.update.data !== null) {
      SnbToast.show('Kata Sandi berhasil diperbaharui', 2500, {
        positionValue: 72,
      });
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
  //modal confirmation
  const modalConfirmation = () => {
    return (
      <SnbDialog
        title="Yakin keluar Sinbad ?"
        open={showConfirmation}
        okText="Tidak"
        cancelText="Ya"
        cancel={() => {
          setShowConfirmation(false);
          reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
        }}
        ok={() => {
          setShowConfirmation(false);
        }}
        content="Apakah anda yakin ingin keluar Aplikasi SINBAD ?"
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <SnbButton.Single
          type="secondary"
          title="Log Out"
          disabled={false}
          onPress={() => {
            setTimeout(() => {
              isMounted && setShowConfirmation(true);
            }, 50);
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
      {modalConfirmation()}
    </SnbContainer>
  );
};

export default UserSettingView;
