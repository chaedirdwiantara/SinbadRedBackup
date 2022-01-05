/** === IMPORT PACKAGES ===  */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDataPermanent } from '@core/redux/Data';
import { setSearchKeywords } from '@core/data/actions';
/** === FUNCTIONS === */
const useInputText = () => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const clearText = () => {
    setInputText('');
  };

  return { inputText, handleTextChange, clearText };
};

const useRecentSearch = () => {
  const dispatch = useDispatch();
  const searchedKeywords = useDataPermanent().searchedKeywords;

  const addKeyword = (keyword: string) => {
    const hasBeenIncluded = searchedKeywords.includes(keyword);
    const searchKeywordsLength = searchedKeywords.length;

    if (!hasBeenIncluded && keyword !== '') {
      if (searchKeywordsLength >= 10) {
        dispatch(setSearchKeywords([...searchedKeywords.slice(1), keyword]));
      } else {
        dispatch(setSearchKeywords([...searchedKeywords, keyword]));
      }
    }
  };

  const deleteKeyword = (deletedKeyword: string) => {
    const newKeywords = searchedKeywords.filter(
      (keyword) => keyword !== deletedKeyword,
    );
    dispatch(setSearchKeywords(newKeywords));
  };

  const deleteAllKeywords = () => {
    dispatch(setSearchKeywords([]));
  };

  return {
    searchedKeywords,
    addKeyword,
    deleteKeyword,
    deleteAllKeywords,
  };
};

export { useInputText, useRecentSearch };
