/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === INTERFACE === */
interface VoucherCartListHeaderProps {
  resetAction: () => void;
}
/** === COMPONENT ===  */
export const VoucherCartListHeader: FC<VoucherCartListHeaderProps> = ({
  resetAction,
}) => (
  <SnbTopNav.Type4
    type="red"
    title="Pakai Voucher"
    backAction={() => goBack()}
    buttonTitle={'Reset'}
    buttonAction={resetAction}
  />
);
