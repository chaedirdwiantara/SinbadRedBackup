/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === COMPONENT ===  */
interface ShoppingCartHeaderProps {
  goBack: () => void;
}

export const ShoppingCartHeader: FC<ShoppingCartHeaderProps> = ({ goBack }) => (
  <SnbTopNav.Type3 type="red" title={'Keranjang'} backAction={() => goBack()} />
);
