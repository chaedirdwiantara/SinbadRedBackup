/** === IMPORT PACKAGES ===  */
import React, { FC, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav2 } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import RecentSearch from './RecentSearch';
/** === IMPORT FUNCTION === */
import { useDataAuth } from '@core/redux/Data';
import {
  goToHome,
  goToSearch,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { contexts } from '@contexts';
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
  const { stateCart } = useContext(contexts.CartContext);
  const { me } = useDataAuth();

  /** => FUNCTION */
  const validateCartVisit = useCallback(() => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  }, [me.data]);

  const onEnter = useCallback(() => {
    if (/^\s*$/.test(inputText)) return handleTextChange('');
    clearText();
    addKeyword(inputText);
    goToProduct(inputText);
  }, [inputText]);

  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type8
        icon1Name="cart"
        icon1Value={stateCart.total.data?.totalProducts}
        icon1Action={validateCartVisit}
        icon2Name="home"
        icon2Action={goToHome}
        color="white"
        placeholder="Cari di sinbad"
        inputValue={inputText}
        backAction={goBack}
        onChangeText={handleTextChange}
        onClearText={clearText}
        onEnter={onEnter}
      />
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
