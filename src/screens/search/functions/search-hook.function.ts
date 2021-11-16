/** === IMPORT PACKAGES ===  */
import { useState } from 'react';
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
  const [searchedKeywords, setSearchKeywords] = useState<Array<string>>([]);

  const addKeyword = (keyword: string) => {
    const hasBeenIncluded = searchedKeywords.includes(keyword);

    if (!hasBeenIncluded) {
      setSearchKeywords((prev) => [...prev, keyword]);
    }
  };

  const deleteKeyword = (deletedKeyword: string) => {
    const newKeywords = searchedKeywords.filter(
      (keyword) => keyword !== deletedKeyword,
    );
    setSearchKeywords(newKeywords);
  };

  const deleteAllKeywords = () => {
    setSearchKeywords([]);
  };

  return { searchedKeywords, addKeyword, deleteKeyword, deleteAllKeywords };
};

export { useInputText, useRecentSearch };
