import {
  color,
  SnbCardMultiButtonType1,
  SnbIconHint,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View } from 'react-native';

const SinbadEngage: React.FC = () => {
  return (
    <View style={{ marginVertical: 16 }}>
      <SnbCardMultiButtonType1
        buttonList={[
          {
            icon: (
              <SnbIconHint
                iconName={'photo_camera'}
                size={24}
                badgeColor="yellow"
                iconColor={color.red50}
              />
            ),
            title: 'Photo Survey',
            subtitle: null,
            onPress: () => {},
          },
          {
            icon: (
              <SnbIconHint
                iconName={'assignment_complete'}
                size={24}
                badgeColor="yellow"
                iconColor={color.red50}
              />
            ),
            title: 'Sinbad Quest',
            subtitle: null,
            onPress: () => {},
          },
          {
            icon: (
              <SnbIconHint
                iconName={'ticket_online'}
                size={24}
                badgeColor="yellow"
                iconColor={color.red50}
              />
            ),
            title: 'Voucher Untukmu',
            subtitle: null,
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
};

export default SinbadEngage;
