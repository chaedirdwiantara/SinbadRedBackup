import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const HelpView: FC = () => {
  /** this for main view */
  return (
    <SnbContainer>
      <SnbTopNav.Type1 type="red" title="Bantuan" />
    </SnbContainer>
  );
};

export default HelpView;
