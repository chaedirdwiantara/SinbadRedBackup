/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbChipsSlider } from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import { ITag } from './product-list-core.type';
/** === TYPE === */
interface ProductTagListProps {
  tags: Array<ITag>;
  onTagPress: (index: number, tag: ITag) => void;
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
      <SnbChipsSlider chips={tags} onChipPress={onTagPress} />
    </View>
  </View>
);

export default ProductTagList;
