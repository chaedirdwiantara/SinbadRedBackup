/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { AddToCartFooter } from './AddToCartFooter';
import { AddToCartQuantityModifier } from './AddToCartQuantityModifier';
import { AddToCartProductData } from './AddToCartProductData';
import BulkPricingList from '@core/components/product/BulkPricingList';
/** === IMPORT FUNCTION === */
import useAddToCart from './add-to-cart.function';
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

  const { bulkPriceAterTax, isPriceGrosir, priceAfterTax, productDetail } =
    useAddToCart(orderQty, isFromProductDetail);

  const renderContent = () => (
    <View>
      <AddToCartProductData
        isFromProductDetail={isFromProductDetail}
        orderQty={orderQty}
        bulkPriceAterTax={bulkPriceAterTax}
        priceAfterTax={priceAfterTax}
        isPriceGrosir={isPriceGrosir}
      />
      <PromoSection isFromProductDetail={isFromProductDetail} />
      {productDetail?.hasBulkPrice ? (
        <BulkPricingList bulkPrices={productDetail?.bulkPrices} />
      ) : (
        <View />
      )}

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
        bulkPriceAterTax={bulkPriceAterTax}
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
