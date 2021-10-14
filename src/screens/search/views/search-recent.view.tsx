/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { TagListType1 } from '@core/components/TagList/TagListType1';
/** === IMPORT STYLE HERE === */
/** === INTERFACE === */
interface SearchRecentProps {
  data: any[];
}
/** === COMPONENT === */
const SearchRecentView: FC<SearchRecentProps> = ({ data }) => {
  /** === VIEW === */
  /** => main */
  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SnbText.B3>Pencarian Terakhir</SnbText.B3>
        <TouchableOpacity onPress={() => console.log('hapus semua')}>
          <SnbText.B3 color={color.red50}>Hapus Semua</SnbText.B3>
        </TouchableOpacity>
      </View>
      <TagListType1 data={data} />
    </View>
  );
};

export default SearchRecentView;
