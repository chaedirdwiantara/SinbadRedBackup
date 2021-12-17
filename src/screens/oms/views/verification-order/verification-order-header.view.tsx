/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === INTERFACE === */
interface VerificationOrderHeaderProps {
  isLoading: boolean;
}
/** === COMPONENT ===  */
export const VerificationOrderHeader: FC<VerificationOrderHeaderProps> = ({
  isLoading,
}) => (
  <SnbTopNav.Type3
    type="red"
    title={'Verifikasi Order'}
    backAction={() => {
      if (!isLoading) {
        goBack();
      }
    }}
  />
);
