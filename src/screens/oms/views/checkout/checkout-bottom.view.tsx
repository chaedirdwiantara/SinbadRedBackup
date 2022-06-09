/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState } from 'react';
import { FooterButton } from 'react-native-sinbad-ui';
import { useUpdateCartAction } from '../../functions';
import {
  totalPayment,
  totalPaymentWithoutCurrency,
  useCheckoutAction,
} from '../../functions/checkout';
import { contexts } from '@contexts';
import ModalValidationLimit from './validation-limit-modal';
import { goToShoppingCart } from '@core/functions/product';
/** === TYPE === */
import * as models from '@models';

interface CheckoutBottomViewProps {
  data: models.CheckoutResponse;
  goToPaymentMethod: () => void;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  goToPaymentMethod,
}) => {
  const { dispatchCart } = React.useContext(contexts.CartContext);
  const { dispatchCheckout } = React.useContext(contexts.CheckoutContext);
  const totalPaymentFull = totalPayment(data.sellers);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data.sellers);
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();

  const [reachLimit, setReachLimit] = useState(false);

  const handleBackToCart = () => {
    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    setReachLimit(false);
    goToShoppingCart();
  };

  // const dataToPaymentMethod = { totalPaymentNumber, expiredTime };

  const pressButton = () => {
    setReachLimit(true);
  };

  return (
    <React.Fragment>
      <FooterButton.Order
        titleButton="Pilih Pembayaran"
        value={totalPaymentFull}
        buttonPress={
          totalPaymentNumber > 999999999 ? pressButton : goToPaymentMethod
        }
      />
      <ModalValidationLimit isOpen={reachLimit} close={handleBackToCart} />
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
