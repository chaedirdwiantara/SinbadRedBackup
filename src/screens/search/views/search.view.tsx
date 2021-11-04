/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import RecentSearch from './RecentSearch';
/** === IMPORT FUNCTION === */
import {
  goBack,
  goToProduct,
  useInputText,
  useRecentSearch,
} from '../functions';
/** === COMPONENT === */
const SearchView: FC = () => {
  /** === HOOKS === */
  const { inputText, handleTextChange, clearText } = useInputText();
  const { searchedKeywords, addKeyword, deleteKeyword, deleteAllKeywords } =
    useRecentSearch();
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View>
        <SnbTopNav.Type7
          type="red"
          placeholder="Cari disini"
          value={inputText}
          backAction={goBack}
          onChangeText={handleTextChange}
          clearText={clearText}
          enter={() => {
            clearText();
            addKeyword(inputText);
            goToProduct(inputText);
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <RecentSearch
          keywords={searchedKeywords}
          onKeywordDelete={deleteKeyword}
          onAllDelete={deleteAllKeywords}
          onKeywordPress={(keyword) => {
            clearText();
            goToProduct(keyword);
          }}
        />
      </View>
    </SnbContainer>
  );
};

export default SearchView;
