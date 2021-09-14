/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { OmsFunc } from '../functions';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Keranjang 1'}
        backAction={() => OmsFunc.goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>Shoping cart Page</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      <TouchableOpacity onPress={() => OmsFunc.goToVerificationOrder()}>
        <SnbText.B1>Go to cart 2</SnbText.B1>
      </TouchableOpacity>
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
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
