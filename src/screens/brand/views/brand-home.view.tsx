/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import BrandStyle from '../styles/brand.style';
/** === COMPONENT === */
const BrandHomeView: FC = () => {
  /** === HOOK === */
  /** => main */
  return (
    <View style={BrandStyle.brandHomeContainer}>
      <TouchableOpacity>
        <SnbText.B1>Brand Here</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default BrandHomeView;

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
