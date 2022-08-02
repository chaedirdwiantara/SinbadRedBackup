/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Linking, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
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
      <RenderHTML
        renderersProps={{
          a: {
            onPress: (event, href) => {
              Linking.openURL(href);
            },
          },
        }}
        source={{
          html: description,
        }}
      />
      <SnbDashedLine dashGap={5} dashLength={8} />
    </View>
  );
};
