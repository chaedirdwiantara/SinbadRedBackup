/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import CategoryStyle from '../styles/category.style';
/** === COMPONENT === */
const CategoryHomeView: FC = () => {
  /** === HOOK === */
  /** => main */
  return (
    <View style={CategoryStyle.categoryHomeContainer}>
      <TouchableOpacity>
        <SnbText.B1>Category Here</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryHomeView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
