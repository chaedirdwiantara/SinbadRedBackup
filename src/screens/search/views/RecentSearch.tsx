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
  testID: string;
}
/** => var */
const { textColor } = colorV2;
/** === COMPONENT === */
const RecentSearch: FC<RecentSearchProps> = ({
  keywords,
  onKeywordDelete,
  onAllDelete,
  onKeywordPress,
  testID,
}) => (
  <View style={{ padding: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <SnbText2.Headline.Small testID={'label-pencarian-terakhir.' + testID}>
        Pencarian Terakhir
      </SnbText2.Headline.Small>
      <TouchableOpacity
        onPress={onAllDelete}
        testID={'btn.clear-search-history.' + testID}>
        <SnbText2.Body.Small color={textColor.link}>
          Hapus Semua
        </SnbText2.Body.Small>
      </TouchableOpacity>
    </View>
    <TagListType1
      testID={testID}
      tags={keywords}
      onTagRemove={onKeywordDelete}
      onTagPress={(tag) => onKeywordPress(tag)}
    />
  </View>
);

export default RecentSearch;
