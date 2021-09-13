/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '../../../data/contexts';
import { goToExampleList } from '../functions';
/** === IMPORT STYLE HERE === */
import ExampleStyle from '../styles/example.style';
/** === COMPONENT === */
const ExampleHomeView: React.FC = () => {
  /** === HOOK === */
  const { stateProduct } = React.useContext(contexts.ProductContext);
  const { stateExample } = React.useContext(contexts.ExampleContext);
  console.log('ini example 1', stateExample);
  console.log('ini product', stateProduct);
  /** === VIEW === */
  /** => main */
  return (
    <View style={ExampleStyle.exampleHomeContainer}>
      <TouchableOpacity onPress={() => goToExampleList()}>
        <SnbText.B1>Go To Example List</SnbText.B1>
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
