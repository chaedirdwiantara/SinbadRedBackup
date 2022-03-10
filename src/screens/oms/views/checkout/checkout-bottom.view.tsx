/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbText, color, SnbButton } from 'react-native-sinbad-ui';
import {
  usePaymentAction,
  handleTotalPrice,
  useCheckoutMaster,
  useExpiredTime,
} from '@screen/oms/functions';
import {
  useGetCartAction,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useRemoveCartProductAction,
  useCartBuyerAddressAction,
  useUpdateCartAction,
} from '../../functions';
import {
  totalPayment,
  totalPaymentWithoutCurrency,
} from '../../functions/checkout';
import { contexts } from '@contexts';
/** === TYPE === */
import * as models from '@models';
import ModalValidationLimit from './validation-limit-modal';
import { goToShoppingCart } from '@core/functions/product';

interface CheckoutBottomViewProps {
  data: models.IInvoiceCheckout[];
  // openTCModal: () => void;
  // openErrorWarning: () => void;
  // closeErrorWarning: () => void;
  // checkExpiredTime: any;
}
/** === COMPONENT === */
export const CheckoutBottomView: FC<CheckoutBottomViewProps> = ({
  data,
  // openErrorWarning,
  // closeErrorWarning,
  // checkExpiredTime,
}) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const removeCartProductAction = useRemoveCartProductAction();
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  const updateCartAction = useUpdateCartAction();
  const totalPaymentFull = totalPayment(data.sellers);
  const totalPaymentNumber = totalPaymentWithoutCurrency(data.sellers);

  const [reachLimit, setReachLimit] = useState(false);

  const handleBackToCart = () => {
    checkProductAction.reset(dispatchCart);
    checkSellerAction.reset(dispatchCart);
    checkStockAction.reset(dispatchCart);
    getCartAction.reset(dispatchCart);
    removeCartProductAction.reset(dispatchCart);
    cartMasterAction.reset();
    cartBuyerAddressAction.reset(dispatchCart);
    updateCartAction.reset(dispatchCart);
    setReachLimit(false);
    goToShoppingCart();
  };

  /** === HOOK === */
  // const paymentAction = usePaymentAction();
  // const { checkoutMaster } = useCheckoutMaster();
  // const expiredTime = useExpiredTime();
  // const { dispatchPayment, statePayment } = React.useContext(
  //   contexts.PaymentContext,
  // );
  // const { stateCheckout } = React.useContext(contexts.CheckoutContext);
  // const loadingTCCreate = statePayment.paymentTCCreate?.loading;
  // const loadingTCDetail = statePayment.paymentTCDetail?.loading;
  // const loadingCreateOrders = stateCheckout.create?.loading;

  // /** => main */
  // const dataPostTC = {
  //   data: {
  //     orderParcels: data.map((invoiceGroup) => {
  //       return {
  //         invoiceGroupId: invoiceGroup.invoiceGroupId,
  //         paymentTypeId: invoiceGroup.paymentType?.id ?? null,
  //         paymentChannelId: invoiceGroup.paymentChannel?.id ?? null,
  //       };
  //     }),
  //   },
  // };

  const pressButton = () => {
    if (totalPaymentNumber >= 999999999) {
      setReachLimit(true);
    }
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
      <SnbButton.Dynamic
        size="small"
        type={'primary'}
        onPress={pressButton}
        title={'Pilih Pembayaran'}
        // loading={loadingTCCreate || loadingTCDetail || loadingCreateOrders}
      />
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
