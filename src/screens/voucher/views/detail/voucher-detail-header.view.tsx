/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === COMPONENT ===  */
export const VoucherDetailHeader: FC = () => (
  <SnbTopNav2.Type3
    title={'Detail Voucher'}
    color={'white'}
    backAction={() => goBack()}
  />
);
