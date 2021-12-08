/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { AddToCartFooter } from './AddToCartFooter';
import { AddToCartQuantityModifier } from './AddToCartQuantityModifier';
import { AddToCartProductData } from './AddToCartProductData';
/** === IMPORT STYLE ===  */
import { PromoSection } from '@core/components/product/list/PromoSection';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
  orderQty: number;
  increaseOrderQty: () => void;
  decreaseOrderQty: () => void;
  disabled: boolean;
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onAddToCartPress,
  orderQty,
  increaseOrderQty,
  decreaseOrderQty,
  disabled,
  isFromProductDetail,
}) => {
  /** => Content */
  const renderContent = () => (
    <View>
      <AddToCartProductData isFromProductDetail={isFromProductDetail} />
      <PromoSection />
      <AddToCartQuantityModifier
        orderQty={orderQty}
        increaseOrderQty={increaseOrderQty}
        decreaseOrderQty={decreaseOrderQty}
        isFromProductDetail={isFromProductDetail}
      />
      <AddToCartFooter
        disabled={disabled}
        orderQty={orderQty}
        onAddToCartPress={onAddToCartPress}
        isFromProductDetail={isFromProductDetail}
      />
    </View>
  );

  return (
    <SnbBottomSheet
      open={open}
      title="Masukan Jumlah"
      actionIcon="close"
      closeAction={closeAction}
      content={renderContent()}
    />
  );
};

export default AddToCartModal;
