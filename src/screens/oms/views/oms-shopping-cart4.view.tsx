/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { OmsFunc, OmsHookFunc } from '../functions';
/** === COMPONENT === */
const OmsShoppingCart4View: FC = () => {
  /** === HOOK === */
  const { state, action } = OmsHookFunc.useModalConfirmation();
  NavigationAction.useCustomBackHardware(() => {
    action(true);
  });
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Keranjang 4'}
        backAction={() => action(true)}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>Shoping cart Page</SnbText.B1>;
  };
  /** => modal */
  const modal = () => {
    if (state) {
      return (
        <>
          <SnbText.B1>Modal Buka</SnbText.B1>
          <TouchableOpacity onPress={() => action(false)}>
            <SnbText.B1>Tidak</SnbText.B1>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              action(false);
              OmsFunc.backToCart();
            }}>
            <SnbText.B1>ya</SnbText.B1>
          </TouchableOpacity>
        </>
      );
    }
    return <SnbText.B1>Modal Tutup</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {modal()}
      <TouchableOpacity onPress={() => OmsFunc.goToCart2()}>
        <SnbText.B1>Go to cart 1</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default OmsShoppingCart4View;

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
