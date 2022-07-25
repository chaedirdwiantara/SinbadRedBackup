/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === COMPONENT ===  */
interface ShoppingCartHeaderProps {
  goBack: () => void;
  testID: string;
}

export const ShoppingCartHeader: FC<ShoppingCartHeaderProps> = ({
  goBack,
  testID,
}) => (
  <SnbTopNav2.Type3
    title={'Keranjang'}
    color={'white'}
    backAction={() => goBack()}
    testID={testID}
  />
);
