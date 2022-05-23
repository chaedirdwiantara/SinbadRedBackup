import { SnbBadge } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
// tag Exclusive
const ExclusiveTag: FC<ViewProps> = (props) => {
  return (
    <View style={props.style} testID="exclusive_tag">
      <SnbBadge.Label
        iconName="stars"
        type="warning"
        value="Exclusive"
        testID="exclusive_tag_label"
      />
    </View>
  );
};

export default ExclusiveTag;
