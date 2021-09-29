/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === IMPORT STYLE HERE === */
/** === INTERFACE === */
/** === COMPONENT === */
const ProductHeaderView: FC = () => {
  /** === VIEW === */
  /** => main */
  return (
    <View>
      <SnbTopNav.Type6
        title={'Product'}
        backAction={() => goBack()}
        type={'red'}
        icon1Name="search"
        icon1Action={() => console.log('this example for icon 1 action')}
        icon2Value={100}
        icon2Name="cart"
        icon2Action={() => console.log('go to shooping cart')}
      />
    </View>
  );
};

export default ProductHeaderView;

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
