/** === IMPORT PACKAGE HERE ===  */
import Html from '@core/components/Html';
import HtmlV2 from '@core/components/HtmlV2';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbDashedLine, SnbText2, styles } from 'react-native-sinbad-ui';
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
      <Html value={description} fontSize={12} />
      <SnbDashedLine dashGap={5} dashLength={8} />
    </View>
  );
};
