/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === INTERFACE === */
interface VoucherCartListMoreHeaderProps {
  resetAction: () => void;
  title: string;
}
/** === COMPONENT ===  */
export const VoucherCartListMoreHeader: FC<VoucherCartListMoreHeaderProps> = ({
  resetAction,
  title,
}) => (
  <SnbTopNav.Type4
    type="red"
    title={title}
    backAction={() => goBack()}
    buttonTitle={'Reset'}
    buttonAction={resetAction}
  />
);
