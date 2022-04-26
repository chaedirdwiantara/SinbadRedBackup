/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import { useUpdateCartAction } from '../../functions';
import {
  totalPayment,
  totalPaymentWithoutCurrency,
  useCheckoutAction,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === TYPE === */
import ModalValidationLimit from './validation-limit-modal';
import { goToShoppingCart } from '@core/functions/product';

interface CheckoutBottomViewProps {
  data: any;
  goToPaymentMethod: () => void;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  goToPaymentMethod,
}) => {
  const { dispatchCart } = React.useContext(contexts.CartContext);
  const { dispatchCheckout } = React.useContext(contexts.CheckoutContext);
  const totalPaymentFull = totalPayment(data?.sellers);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data?.sellers);
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

  const content = () => {
    return (
      <View style={CheckoutStyle.bottomContentContainer}>
        <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
        <SnbText.H4 color={color.red50}>{totalPaymentFull}</SnbText.H4>
      </View>
    );
  };

  return (
    <View style={CheckoutStyle.bottomContainer}>
      {content()}
      {totalPaymentNumber > 999999999 ? (
        <SnbButton.Dynamic
          size="small"
          type={'primary'}
          onPress={pressButton}
          title={'Pilih Pembayaran'}
          // loading={loadingTCCreate || loadingTCDetail || loadingCreateOrders}
        />
      ) : (
        <SnbButton.Dynamic
          size="small"
          type={'primary'}
          onPress={goToPaymentMethod}
          title={'Pilih Pembayaran'}
          // loading={loadingTCCreate || loadingTCDetail || loadingCreateOrders}
        />
      )}
      <ModalValidationLimit isOpen={reachLimit} close={handleBackToCart} />
    </View>
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
