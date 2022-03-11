/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === INTERFACES === */
interface PaymentMethodHeaderProps {
  backAction: () => void;
}
/** === COMPONENT ===  */
export const PaymentMethodHeader: FC<PaymentMethodHeaderProps> = ({
  backAction,
}) => <SnbTopNav.Type3 type="red" title={'Checkout'} backAction={backAction} />;
