/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../styles';
/** === TYPE === */
interface HistoryCardItemProps {
  title: string;
  value: string | null;
  type?: 'normal' | 'bold' | 'green';
}
/** === COMPONENT === */
export const HistoryCardItem: FC<HistoryCardItemProps> = ({
  title,
  value,
  type = 'normal',
}) => {
  const notBoldColor = type === 'normal' ? color.black60 : color.green50;

  return (
    <View key={`${title}-${value}`} style={HistoryDetailStyle.cardItem}>
      {type !== 'bold' ? (
        <>
          <View style={{ marginRight: 16 }}>
            <SnbText.B3 color={notBoldColor}>{title}</SnbText.B3>
          </View>
          <View style={{ maxWidth: '60%' }}>
            <SnbText.B3 color={notBoldColor} align="right">
              {value}
            </SnbText.B3>
          </View>
        </>
      ) : (
        <>
          <View style={{ marginRight: 16 }}>
            <SnbText.B4 color={color.black100}>{title}</SnbText.B4>
          </View>
          <View style={{ maxWidth: '60%' }}>
            <SnbText.B4 color={color.black100} align="right">
              {value}
            </SnbText.B4>
          </View>
        </>
      )}
    </View>
  );
};

export default HistoryCardItem;
