/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface VoucherDetailListItemProps {
  listItem: Array<string>;
  isFull?: boolean;
}
/** === COMPONENT ===  */
export const VoucherDetailListItem: FC<VoucherDetailListItemProps> = ({
  listItem,
  isFull,
}) => {
  return (
    <View style={{ marginRight: 20 }}>
      {listItem.map((item, index) => {
        if (isFull) {
          return (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ marginRight: 8, width: 20 }}>
                <SnbText.B1>{index + 1}.</SnbText.B1>
              </View>
              <SnbText.B1>{item}</SnbText.B1>
            </View>
          );
        } else {
          return (
            index < 3 && (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: 4 }}>
                <View style={{ marginRight: 8, width: 20 }}>
                  <SnbText.B1>{index + 1}.</SnbText.B1>
                </View>
                <SnbText.B1>{item}</SnbText.B1>
              </View>
            )
          );
        }
      })}
    </View>
  );
};
