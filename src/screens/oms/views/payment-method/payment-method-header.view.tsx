/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === INTERFACES === */
interface PaymentMethodHeaderProps {
  backAction: () => void;
}
/** === COMPONENT ===  */
export const PaymentMethodHeader: FC<PaymentMethodHeaderProps> = ({
  backAction,
}) => (
  <SnbTopNav2.Type3
    title="Pilih Pembayaran"
    color="white"
    backAction={backAction}
  />
);
