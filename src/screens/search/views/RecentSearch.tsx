/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText2, colorV2 } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { TagListType1 } from '@core/components/TagList/TagListType1';
/** === TYPE === */
interface RecentSearchProps {
  keywords: Array<string>;
  onKeywordDelete: (keyword: string) => void;
  onAllDelete: () => void;
  onKeywordPress: (keyword: string) => void;
}
/** => var */
const { textColor } = colorV2;
/** === COMPONENT === */
const RecentSearch: FC<RecentSearchProps> = ({
  keywords,
  onKeywordDelete,
  onAllDelete,
  onKeywordPress,
}) => (
  <View style={{ padding: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <SnbText2.Headline.Small>Pencarian Terakhir</SnbText2.Headline.Small>
      <TouchableOpacity onPress={onAllDelete}>
        <SnbText2.Headline.Small color={textColor.selected}>
          Hapus Semua
        </SnbText2.Headline.Small>
      </TouchableOpacity>
    </View>
    <TagListType1
      tags={keywords}
      onTagRemove={onKeywordDelete}
      onTagPress={(tag) => onKeywordPress(tag)}
    />
  </View>
);

export default RecentSearch;
