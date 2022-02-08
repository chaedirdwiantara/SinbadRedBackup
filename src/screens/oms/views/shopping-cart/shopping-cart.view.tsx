/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */

  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      <ShoppingCartAddress />
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: ryan
 * updatedDate: 07022022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
