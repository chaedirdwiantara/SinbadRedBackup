/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === STYLE === */
import CategoryHomeStyle from '../styles/category-home.style';
/** === TYPE === */
interface CategoryHomeItemProps {
  name: string;
  icon: string;
  onPress: () => void;
}
/** === COMPONENT === */
export const CategoryHomeItem: FC<CategoryHomeItemProps> = (props) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={props.onPress}>
    <View style={CategoryHomeStyle.itemContainer}>
      <Image
        source={{ uri: props.icon }}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
    <View style={CategoryHomeStyle.itemName}>
      <SnbText.C1 align="center">{props.name}</SnbText.C1>
    </View>
  </TouchableOpacity>
);
