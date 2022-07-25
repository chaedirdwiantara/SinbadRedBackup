/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === INTERFACES === */
interface CheckoutHeaderProps {
  backAction: () => void;
  testID: string;
}
/** === COMPONENT ===  */
export const CheckoutHeader: FC<CheckoutHeaderProps> = ({
  backAction,
  testID,
}) => (
  <SnbTopNav2.Type3
    title={'Checkout'}
    color={'white'}
    backAction={backAction}
    testID={testID}
  />
);
