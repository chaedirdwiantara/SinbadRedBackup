/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === INTERFACES === */
interface CheckoutHeaderProps {
  backAction: () => void;
}
/** === COMPONENT ===  */
export const CheckoutHeader: FC<CheckoutHeaderProps> = ({ backAction }) => (
  <SnbTopNav.Type3 type="white" title={'Checkout'} backAction={backAction} />
);
