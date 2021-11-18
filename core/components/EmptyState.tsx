/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { EmptyStateStyle } from '@core/styles';
/** === TYPE === */
interface EmptyStateProps {
  title: string;
  description?: string;
}
/** === COMPONENT === */
export const EmptyState: FC<EmptyStateProps> = ({ title, description }) => (
  <View style={EmptyStateStyle.container}>
    <Image
      source={require('../../src/assets/images/cry_sinbad.png')}
      style={{ height: 192, aspectRatio: 1 }}
    />
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <SnbText.H4>{title}</SnbText.H4>
    </View>
    {description && (
      <View style={{ alignItems: 'center' }}>
        <SnbText.B3>{description}</SnbText.B3>
      </View>
    )}
  </View>
);
