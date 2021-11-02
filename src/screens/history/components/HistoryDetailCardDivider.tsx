/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { color } from 'react-native-sinbad-ui';
/** === TYPES === */
interface HistoryDetailCardDividerProps {
  horizontalSpaces?: number;
  topSpaces?: number;
}
/** === COMPONENTS === */
export const HistoryDetailCardDivider: FC<HistoryDetailCardDividerProps> = ({
  horizontalSpaces = 0,
  topSpaces = 8,
}) => (
  <View
    style={{
      borderTopWidth: 1,
      borderColor: color.black10,
      marginTop: topSpaces,
      marginHorizontal: horizontalSpaces,
    }}
  />
);
