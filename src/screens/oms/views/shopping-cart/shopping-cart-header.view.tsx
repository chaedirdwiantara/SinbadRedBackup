/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === COMPONENT ===  */

export const ShoppingCartHeader: FC = () => (
  <SnbTopNav.Type3 type="red" title={'Keranjang'} backAction={() => goBack()} />
);
