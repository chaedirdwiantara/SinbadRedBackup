/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { ThankYouPageStyle } from '../styles/thank-you-page/thank-you-page.style';
/** === TYPE === */
interface ThankYouPageCardItemProps {
  title: string;
  value: string | null;
  type?: 'normal' | 'bold' | 'green';
}
/** === COMPONENT === */
export const ThankYouPageCardItem: FC<ThankYouPageCardItemProps> = ({
  title,
  value,
  type = 'normal',
}) => {
  const notBoldColor = type === 'normal' ? colorV2.textColor.secondary : colorV2.textColor.success;

  return (
    <View key={`${title}-${value}`} style={ThankYouPageStyle.cardItem}>
      {type !== 'bold' ? (
        <>
          <View style={{ flex: 1 }}>
            <SnbText2.Paragraph.Default color={notBoldColor} align={'left'}>{title}</SnbText2.Paragraph.Default>
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <SnbText2.Paragraph.Default color={notBoldColor} align={"right"}>
              {value}
            </SnbText2.Paragraph.Default>
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <SnbText2.Headline.Small color={colorV2.textColor.default} align={'left'}>{title}</SnbText2.Headline.Small>
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <SnbText2.Headline.Small color={colorV2.textColor.default} align="right">
              {value}
            </SnbText2.Headline.Small>
          </View>
        </>
      )}
    </View>
  );
};

export default ThankYouPageCardItem;
