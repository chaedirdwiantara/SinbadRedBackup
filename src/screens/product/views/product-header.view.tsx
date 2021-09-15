/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
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
        backAction={() => console.log('alalal')}
        type={'red'}
        icon1Name="search"
        icon1Action={() => console.log('this example for icon 1 action')}
        icon2Value={100}
        icon2Name="cart"
        icon2Action={() => NavigationAction.navigate('OmsShoppingCartView')}
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
