/** === IMPORT PACKAGES === */
import React, { FC, useMemo } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText2, colorV2, spacingV2 } from 'react-native-sinbad-ui';
/** === TYPE === */
interface TagListType1Props {
  tags: Array<string>;
  shadow?: boolean;
  onTagPress: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}
/** => var */
const { textColor } = colorV2;
const { spacing } = spacingV2;
/** === COMPONENT === */
export const TagListType1: FC<TagListType1Props> = ({
  tags,
  shadow,
  onTagPress,
  onTagRemove,
}) => {
  const tagList = useMemo(() => {
    const list = [...tags];
    list.reverse();
    return list;
  }, [tags]);
  return (
    <View>
      <FlatList
        data={tagList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onTagPress(item)}
            style={{ marginTop: spacing.md }}>
            <SnbText2.Paragraph.Small color={textColor.secondary}>
              {item}
            </SnbText2.Paragraph.Small>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
