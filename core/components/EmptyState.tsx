/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText2 } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { EmptyStateStyle } from '@core/styles';
/** === TYPE === */
interface EmptyStateProps {
  title: string;
  description?: string;
  testID?: string;
}
/** === COMPONENT === */
export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  testID,
}) => (
  <View style={EmptyStateStyle.container}>
    <Image
      testID={'img.cry_sinbad.' + testID}
      source={require('../../src/assets/images/cry_sinbad.png')}
      style={{ height: 192, aspectRatio: 1 }}
    />
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <SnbText2.Headline.Default testID={`empty-state.${title}.${testID}`}>
        {title}
      </SnbText2.Headline.Default>
    </View>
    {description && (
      <View style={{ alignItems: 'center' }}>
        <SnbText2.Paragraph.Default
          testID={`empty-state.${description}.${testID}`}>
          {description}
        </SnbText2.Paragraph.Default>
      </View>
    )}
  </View>
);
