/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIconHint, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { TagListStyle } from '../../styles';
/** === TYPE === */
interface TagListType1Props {
  tags: Array<string>;
  shadow?: boolean;
  onTagPress: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}
/** === COMPONENT === */
export const TagListType1: FC<TagListType1Props> = ({
  tags,
  shadow,
  onTagPress,
  onTagRemove,
}) => (
  <View>
    <View style={TagListStyle.itemContainer}>
      {tags.map((tag, tagIndex) => (
        <View
          key={tagIndex}
          style={shadow ? TagListStyle.boxChip1 : TagListStyle.boxChip2}>
          <TouchableOpacity onPress={() => onTagPress(tag)}>
            <SnbText.B3>{tag}</SnbText.B3>
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => onTagRemove(tag)}>
              <SnbIconHint
                iconName="highlight_off"
                size={20}
                iconColor={color.black40}
                badgeColor="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  </View>
);
