/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === COMPONENT ===  */
export const PromoPaymentListHeader: FC = () => (
  <SnbTopNav.Type3
    type="red"
    title="Promo Pembayaran"
    backAction={() => goBack()}
  />
);
