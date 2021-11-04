/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { TagListType1 } from '@core/components/TagList/TagListType1';
/** === TYPE === */
interface RecentSearchProps {
  keywords: Array<string>;
  onKeywordDelete: (keyword: string) => void;
  onAllDelete: () => void;
  onKeywordPress: (keyword: string) => void;
}
/** === COMPONENT === */
const RecentSearch: FC<RecentSearchProps> = ({
  keywords,
  onKeywordDelete,
  onAllDelete,
  onKeywordPress,
}) => (
  <View style={{ padding: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <SnbText.B3>Pencarian Terakhir</SnbText.B3>
      <TouchableOpacity onPress={onAllDelete}>
        <SnbText.B3 color={color.red50}>Hapus Semua</SnbText.B3>
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
