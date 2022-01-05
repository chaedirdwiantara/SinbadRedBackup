/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
  SnbTextField,
  SnbIcon,
  SnbText,
  color,
} from '@sinbad/react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { HistoryStyle } from '../styles';
/** === TYPE === */
interface HistoryListFiltersProps {
  onSearch: () => void;
  keyword: string;
  onKeywordChange: (text: string) => void;
  onSearchClear: () => void;
  onFilterPress: () => void;
  isFiltered: boolean;
}
/** === COMPONENT === */
export const HistoryListFilters: FC<HistoryListFiltersProps> = ({
  onSearch,
  keyword,
  onKeywordChange,
  onSearchClear,
  onFilterPress,
  isFiltered,
}) => (
  <View style={HistoryStyle.filterContainer}>
    <View style={{ flex: 7 }}>
      <SnbTextField.Text
        boxIndicator={true}
        enter={onSearch}
        placeholder="Cari nomor pesanan"
        type="default"
        value={keyword}
        onChangeText={(text: string) => onKeywordChange(text)}
        clearText={onSearchClear}
        returnKeyType="search"
        keyboardType="default"
        prefixIconName="search"
      />
    </View>
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onFilterPress}>
      <View style={{ alignItems: 'center', paddingLeft: 12 }}>
        {isFiltered && <View style={HistoryStyle.filterDot} />}
        <SnbIcon name="filter_list" color={color.black60} size={32} />
        <SnbText.C3 color={color.black60}>Filter</SnbText.C3>
      </View>
    </TouchableWithoutFeedback>
  </View>
);
