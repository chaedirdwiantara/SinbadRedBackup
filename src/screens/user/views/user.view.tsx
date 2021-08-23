import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const UserView: FC = () => {
  /** this for main view */
  return (
    <SnbContainer>
      <SnbTopNav.Type1 type="red" title="Profil" />
    </SnbContainer>
  );
};

export default UserView;
