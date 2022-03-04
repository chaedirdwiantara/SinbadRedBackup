/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { color } from 'react-native-sinbad-ui';
/** === TYPE === */
interface ThankYouPageCardDividerProps {
  horizontalSpaces?: number;
  topSpaces?: number;
}
/** === COMPONENT === */
export const ThankYouPageCardDivider: FC<ThankYouPageCardDividerProps> = ({
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
