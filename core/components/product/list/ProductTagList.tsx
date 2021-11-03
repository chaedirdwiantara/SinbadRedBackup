/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbChipsSlider } from 'react-native-sinbad-ui';
/** === TYPE === */
interface ProductTagListProps {
  tags: Array<string>;
  onTagPress: (keywords: Array<string>) => void;
}
/** === COMPONENT === */
const ProductTagList: FC<ProductTagListProps> = ({ tags, onTagPress }) => (
  <View
    style={{
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 16,
    }}>
    <View style={{ flex: 1 }}>
      <SnbChipsSlider chipsList={tags} parentFunction={onTagPress} />
    </View>
  </View>
);

export default ProductTagList;