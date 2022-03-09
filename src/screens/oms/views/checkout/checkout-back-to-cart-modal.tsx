/** === IMPORT PACKAGE HERE ===  */
import BottomModalError from '@core/components/BottomModalError';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import {
  SnbDialog,
  SnbBottomSheet,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';
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

interface BackToCartModalProps {
  isOpen: boolean;
  handleOkAction: () => void;
  handleNoAction: () => void;
}
/** === COMPONENT === */
export const BackToCartModal: FC<BackToCartModalProps> = ({
  isOpen,
  handleOkAction,
  handleNoAction,
}) => {
  /** => ACTION */
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const removeCartProductAction = useRemoveCartProductAction();
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  const updateCartAction = useUpdateCartAction();

  /** handle back to cart */
  const handleBackToCart = () => {
    checkProductAction.reset(dispatchCart);
    checkSellerAction.reset(dispatchCart);
    checkStockAction.reset(dispatchCart);
    getCartAction.reset(dispatchCart);
    removeCartProductAction.reset(dispatchCart);
    cartMasterAction.reset();
    cartBuyerAddressAction.reset(dispatchCart);
    updateCartAction.reset(dispatchCart);
    handleOkAction;
  };

  const button = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <SnbButton.Multiple
          rightTitle={'Tidak'}
          leftTitle={'Ya'}
          leftType={'secondary'}
          rightType={'primary'}
          onPressLeft={handleBackToCart}
          onPressRight={handleNoAction}
        />
      </View>
    );
  };

  const content = () => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 60,
          }}>
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Image source={require('../../../../assets/images/cancel.png')} />
            <SnbText.H3>Batalkan Pesanan</SnbText.H3>
            <SnbText.B1>Apakah anda ingin membatalkan pesanan?</SnbText.B1>
          </View>
        </View>
        {button()}
      </>
    );
  };

  return (
    // <SnbDialog
    //   open={isOpen}
    //   title="Konfirmasi"
    //   content="Apakah anda ingin membatalkan pesanan?"
    //   ok={handleNoAction}
    //   cancel={handleOkAction}
    //   okText="Tidak"
    //   cancelText="Ya"
    // />
    <SnbBottomSheet open={isOpen} content={content()} size={'normal'} />
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Ryan (voyager)
 * createDate: 30112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
