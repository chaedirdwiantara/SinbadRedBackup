import React from 'react';
import { View } from 'react-native';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
import { HistoryDetailStyle } from '../styles';
export const HistoryCardItem = (
  key: string,
  value: string | null,
  type: 'normal' | 'bold' | 'green' = 'normal',
) => {
  const notBoldColor = type === 'normal' ? color.black60 : color.green50;

  return (
    <View key={`${key}-${value}`} style={HistoryDetailStyle.cardItem}>
      {type !== 'bold' ? (
        <>
          <View style={{ marginRight: 16 }}>
            <SnbText.B3 color={notBoldColor}>{key}</SnbText.B3>
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
            <SnbText.B4 color={color.black100}>{key}</SnbText.B4>
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
