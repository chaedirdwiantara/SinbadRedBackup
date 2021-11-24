/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === TYPE === */
interface SectionTitleProps {
  title: string;
}
/** === COMPONENT === */
export const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <View
    style={{
      marginVertical: 12,
      paddingHorizontal: 16,
      width: '100%',
    }}>
    <View style={ProductBundleStyle.sectionTitleContainer}>
      <SnbText.B2>{title}</SnbText.B2>
    </View>
  </View>
);
