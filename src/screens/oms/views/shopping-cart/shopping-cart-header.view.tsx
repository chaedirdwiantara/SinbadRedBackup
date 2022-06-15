/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === COMPONENT ===  */
interface ShoppingCartHeaderProps {
  goBack: () => void;
}

export const ShoppingCartHeader: FC<ShoppingCartHeaderProps> = ({ goBack }) => (
  <SnbTopNav2.Type3
    title={'Keranjang'}
    color={'white'}
    backAction={() => goBack()}
  />
);
