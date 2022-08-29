/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { FooterButton } from 'react-native-sinbad-ui';
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
  const pressButton = () => {
    handleOpenValidationLimitModal();
  };

  return (
    <React.Fragment>
      <FooterButton.Checkout
        testID={testID}
        titleButton="Pilih Pembayaran"
        value={data.totalOrderAfterSinbadVoucher}
        buttonPress={
          data.totalOrderAfterSinbadVoucher > 999999999
            ? pressButton
            : goToPaymentMethod
        }
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
