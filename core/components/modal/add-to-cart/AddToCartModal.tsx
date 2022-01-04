/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { AddToCartFooter } from './AddToCartFooter';
import { AddToCartQuantityModifier } from './AddToCartQuantityModifier';
import { AddToCartProductData } from './AddToCartProductData';
/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE ===  */
import { PromoSection } from '@core/components/product/list/PromoSection';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
  orderQty: number;
  onChangeQty: (val: number) => void;
  disabled: boolean;
  isFromProductDetail?: boolean;
}
/** === COMPONENT ===  */
const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onAddToCartPress,
  orderQty,
  onChangeQty,
  disabled,
  isFromProductDetail,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  NavigationAction.useCustomBackHardware(() => {
    setIsFocus(false);
  });

  const renderContent = () => (
    <View>
      <AddToCartProductData isFromProductDetail={isFromProductDetail} />
      <PromoSection />
      <AddToCartQuantityModifier
        orderQty={orderQty}
        onChangeQty={onChangeQty}
        isFromProductDetail={isFromProductDetail}
        setIsFocus={setIsFocus}
        isFocus={isFocus}
      />
      <AddToCartFooter
        disabled={disabled || isFocus}
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
