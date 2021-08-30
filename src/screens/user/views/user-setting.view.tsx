import React, { FC } from 'react';
import { SnbContainer, SnbText, SnbTopNav } from 'react-native-sinbad-ui';
import { ScrollView } from 'react-native';
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
        <SnbText.H1>Test</SnbText.H1>
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'grey'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default UserSettingView;
