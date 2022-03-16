/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import { goToPaymentMethod } from '@screen/oms/functions';
import {
  useGetCartAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useRemoveCartProductAction,
  useCartBuyerAddressAction,
  useUpdateCartAction,
} from '../../functions';
import {
  callBackToCartFunction,
  totalPayment,
  totalPaymentWithoutCurrency,
  useCheckoutAction,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === TYPE === */
import * as models from '@models';
import ModalValidationLimit from './validation-limit-modal';
import { goToShoppingCart } from '@core/functions/product';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';

interface CheckoutBottomViewProps {
  data: any;
  abortTimeOut: () => void;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  abortTimeOut,
}) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = React.useContext(
    contexts.CheckoutContext,
  );
  const totalPaymentFull = totalPayment(data?.sellers);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data?.sellers);
  const checkoutAction = useCheckoutAction();
  const updateCartAction = useUpdateCartAction();

  const [reachLimit, setReachLimit] = useState(false);

  const handleBackToCart = () => {
    setReachLimit(false);
    abortTimeOut;
    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    goToShoppingCart();
  };

  // const dataToPaymentMethod = { totalPaymentNumber, expiredTime };

  const pressButton = () => {
    setReachLimit(true);
    // goToPaymentMethod(dataToPaymentMethod);
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
          onPress={abortTimeOut}
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
