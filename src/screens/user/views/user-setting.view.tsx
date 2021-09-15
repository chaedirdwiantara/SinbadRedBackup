import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbListButtonType2,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';

const UserSettingView: FC = () => {
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
          onPress={() => null}
          shadow={true}
        />
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default UserSettingView;
