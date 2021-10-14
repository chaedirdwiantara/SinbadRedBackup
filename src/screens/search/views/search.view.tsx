/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import SearchHeaderView from './search-header.view';
import SearchRecentView from './search-recent.view';
/** === COMPONENT === */
const SearchView: FC = () => {
  /** === HOOK === */

  /** === EFFECT === */

  /** === VIEW === */
  /** => header */
  const header = () => {
    return <SearchHeaderView />;
  };

  /** => recent */
  const recent = () => {
    return (
      <SearchRecentView
        data={['susu', 'sgm', 'beras', 'minyak', 'Gula', 'sayur']}
      />
    );
  };

  /** => content */
  const content = () => {
    return <View style={{ flex: 1 }}>{recent()}</View>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default SearchView;
