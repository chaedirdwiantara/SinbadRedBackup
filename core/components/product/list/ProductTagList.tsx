/** === IMPORT PACKAGES ===  */
import React, { FC, memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SnbChips2, spacingV2 } from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import { ITag } from './product-list-core.type';
/** === TYPE === */
interface ProductTagListProps {
  tags: Array<ITag>;
  onTagPress: (index: number, tag: ITag) => void;
  onFilterPress: () => void;
}
// var
const { spacing } = spacingV2;
/** === COMPONENT === */
const ProductTagList: FC<ProductTagListProps> = ({
  tags,
  onTagPress,
  onFilterPress,
}) => (
  <View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.gap}>
        <SnbChips2.Action
          icon="filter_list"
          text="Filter"
          onPress={onFilterPress}
        />
      </View>
      {tags.map((item, index) => (
        <View key={item.value} style={styles.gap}>
          <SnbChips2.Choice
            text={item.value}
            active={item.selected}
            onPress={() => onTagPress(index, item)}
          />
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingLeft: spacing.lg,
  },
  gap: {
    paddingRight: spacing.sm,
  },
});

export default memo(ProductTagList);
