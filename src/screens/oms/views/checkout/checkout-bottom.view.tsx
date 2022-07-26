/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { FooterButton } from 'react-native-sinbad-ui';
import {
  totalPayment,
  totalPaymentWithoutCurrency,
} from '../../functions/checkout';
/** === TYPE === */
import * as models from '@models';

interface CheckoutBottomViewProps {
  data: models.CheckoutResponse;
  goToPaymentMethod: () => void;
  testID: string;
  handleOpenValidationLimitModal: () => void;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  goToPaymentMethod,
  testID,
  handleOpenValidationLimitModal,
}) => {
  const totalPaymentFull = totalPayment(data.sellers);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data.sellers);

  // const dataToPaymentMethod = { totalPaymentNumber, expiredTime };

  const pressButton = () => {
    handleOpenValidationLimitModal();
  };

  return (
    <React.Fragment>
      <FooterButton.Order
        testID={testID}
        titleButton="Pilih Pembayaran"
        value={totalPaymentFull}
        buttonPress={
          totalPaymentNumber > 999999999 ? pressButton : goToPaymentMethod
        }
        type={'checkout'}
      />
    </React.Fragment>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
