/** === IMPORT PACKAGES ===  */
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface SupplierSectionItemProps {
  name: string;
  value: string | number | ReactNode;
  bottomSpaces?: number;
}
/** === COMPONENT ===  */
export const SupplierSectionItem: FC<SupplierSectionItemProps> = ({
  name,
  value,
  bottomSpaces = 6,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: bottomSpaces,
    }}>
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <SnbText.B3>{name}</SnbText.B3>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      {typeof value === 'string' || typeof value === 'number' ? (
        <SnbText.B3>{value}</SnbText.B3>
      ) : (
        value
      )}
    </View>
  </View>
);
