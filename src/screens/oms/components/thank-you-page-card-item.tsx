/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
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
  const notBoldColor = type === 'normal' ? color.black60 : color.green50;

  return (
    <View key={`${title}-${value}`} style={ThankYouPageStyle.cardItem}>
      {type !== 'bold' ? (
        <>
          <View style={{ flex: 1 }}>
            <SnbText.B3 color={notBoldColor}>{title}</SnbText.B3>
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <SnbText.B3 color={notBoldColor} align="right">
              {value}
            </SnbText.B3>
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <SnbText.B4 color={color.black100}>{title}</SnbText.B4>
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <SnbText.B4 color={color.black100} align="right">
              {value}
            </SnbText.B4>
          </View>
        </>
      )}
    </View>
  );
};

export default ThankYouPageCardItem;
