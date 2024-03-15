/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';
import {
  SnbDashedLine,
  SnbHtml2,
  SnbText2,
  styles,
} from 'react-native-sinbad-ui';
import { VoucherDetailStyles } from '../../styles';
/** === INTERFACE === */
interface VoucherDetailDescriptionProps {
  name: string;
  description: string;
}
/** === COMPONENT ===  */
export const VoucherDetailDescription: FC<VoucherDetailDescriptionProps> = ({
  name,
  description,
}) => {
  const contentWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        ...VoucherDetailStyles.sectionContainer,
        ...{ marginBottom: 8 },
        ...styles.shadowForBox5,
      }}>
      <SnbText2.Headline.Default>{name}</SnbText2.Headline.Default>
      <SnbDashedLine
        dashGap={5}
        dashLength={8}
        style={{ marginVertical: 10 }}
      />
      <SnbHtml2 contentWidth={contentWidth} value={description} />
      <SnbDashedLine dashGap={5} dashLength={8} />
    </View>
  );
};
