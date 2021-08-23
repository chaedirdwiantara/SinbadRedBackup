/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { CoreContext } from '@context';
import { goToExample2List } from '../functions';
/** === IMPORT STYLE HERE === */
import Example2Style from '../styles/example2.style';
/** === COMPONENT === */
const ExampleHomeView: React.FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => main */
  return (
    <View style={Example2Style.example2HomeContainer}>
      <TouchableOpacity onPress={() => goToExample2List()}>
        <SnbText.B1>Go To Example 2 List</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleHomeView;

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
