/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIconHint, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { TagListStyle } from '../../styles';
/** === TYPE === */
interface TagListType1Props {
  data: any[];
  shadow?: boolean;
}

/** === COMPONENT === */
export const TagListType1: FC<TagListType1Props> = ({ data, shadow }) => {
  /** === DATA VIEW === */
  const renderData = () => {
    return (
      <View style={TagListStyle.itemContainer}>
        {data.map((item, i) => (
          <View
            key={i}
            style={shadow ? TagListStyle.boxChip1 : TagListStyle.boxChip2}>
            <TouchableOpacity onPress={() => console.log(`search tag ${item}`)}>
              <SnbText.B3>{item}</SnbText.B3>
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => console.log('remove tag')}>
                <SnbIconHint
                  iconName={'highlight_off'}
                  size={20}
                  iconColor={color.black40}
                  badgeColor={'red'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  /** === MAIN VIEW === */
  return <View>{renderData()}</View>;
};
