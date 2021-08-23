/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { OmsFunc } from '../functions';
/** === COMPONENT === */
const OmsShoppingCart2View: FC = () => {
  /** === HOOK === */
  const { params } = NavigationAction.useGetNavParams();
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Keranjang 2'}
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
      <TouchableOpacity onPress={() => OmsFunc.goToCart3()}>
        <SnbText.B1>Go to cart 3 {params.name}</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default OmsShoppingCart2View;

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
