/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import Svg from '@svg';
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
        <Svg name="penguin" size={64} color={'red'} />
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
