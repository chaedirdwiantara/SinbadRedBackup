/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import { goBack, goToShoppingCart } from '../functions';
/** === COMPONENT === */
const ProductHeaderView: FC = () => {
  /** === VIEW === */
  /** => Main */
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
        icon2Action={goToShoppingCart}
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
