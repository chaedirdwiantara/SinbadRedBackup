import React from 'react';
import { View } from 'react-native';
import {
  Content,
  spacingV2 as layout,
  colorV2,
} from '@sinbad/react-native-sinbad-ui';

const benefits = [
  { icon: 'murah', name: 'Murah' },
  { icon: 'original', name: 'Original' },
  { icon: 'cepat', name: 'Cepat' },
  { icon: 'flexibel', name: 'Flexible' },
];

export const Benefits = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: layout.spacing.sm,
        backgroundColor: colorV2.bgColor.red,
        width: '100%',
      }}>
      {benefits.map((benefit, index) => (
        <View
          key={benefit.name}
          style={{
            marginRight: index < benefits.length - 1 ? layout.spacing.lg : 0,
          }}>
          <Content.Benefit {...benefit} />
        </View>
      ))}
    </View>
  );
};
