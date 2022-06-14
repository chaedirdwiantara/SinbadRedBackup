import { SnbBadge2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
// tag Exclusive
const ExclusiveTag: FC<ViewProps> = (props) => {
  return (
    <View style={props.style} testID="exclusive_tag">
      <SnbBadge2 title="Exclusive" type="warning" iconName="stars" />
    </View>
  );
};

export default ExclusiveTag;
