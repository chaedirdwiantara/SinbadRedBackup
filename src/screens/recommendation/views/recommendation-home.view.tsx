/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT STYLE HERE === */
import RecommendationStyle from '../styles/recommendation.style';
/** === COMPONENT === */
const RecommendationHomeView: FC = () => {
  /** === HOOK === */
  /** => main */
  return (
    <View style={RecommendationStyle.recommendationHomeContainer}>
      <TouchableOpacity>
        <SnbText.B1>Recommendation Here</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationHomeView;

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
