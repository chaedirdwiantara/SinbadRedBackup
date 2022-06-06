/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useMemo, useState } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT === */
import { AddToCartFooter } from './AddToCartFooter';
import { AddToCartQuantityModifier } from './AddToCartQuantityModifier';
import { AddToCartProductData } from './AddToCartProductData';
import BulkPricingList from '@core/components/product/BulkPricingList';
import ActionSheet from '@core/components/product/ActionSheet';
/** === IMPORT FUNCTION === */
import useAddToCart from './add-to-cart.function';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
  orderQty: number;
  onChangeQty: (val: number) => void;
  disabled: boolean;
  isFromProductDetail?: boolean;
  loading?: boolean;
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
  const [isBulkPriceExpand, setIsBulkPriceExpand] = useState(true);
  const {
    bulkPriceAterTax,
    isPriceGrosir,
    priceAfterTax,
    productDetail,
    dataStock,
    errorStock,
    loadingProduct,
  } = useAddToCart(orderQty, isFromProductDetail);

  const contentHeight = useMemo(() => {
    // size height tiap masing jumlah baris bulk pricing data
    const sizeHeight: { [id: number]: number } = {
      1: 420,
      2: 430,
      3: 460,
      4: 480,
      5: 500,
    };
    if (productDetail?.hasBulkPrice)
      return isBulkPriceExpand
        ? sizeHeight[productDetail.bulkPrices.length]
        : 320;
    return 300;
  }, [
    productDetail?.hasBulkPrice,
    isBulkPriceExpand,
    productDetail?.bulkPrices,
  ]);

  return (
    <ActionSheet
      contentHeight={contentHeight}
      open={open}
      name="modal-add-to-cart"
      onClose={closeAction}
      title="Masukkan Jumlah"
      footer={
        <AddToCartFooter
          errorStock={errorStock}
          disabled={disabled || isFocus}
          orderQty={orderQty}
          bulkPriceAterTax={bulkPriceAterTax}
          onAddToCartPress={onAddToCartPress}
        />
      }>
      {/* content */}
      <AddToCartProductData
        loading={loadingProduct}
        isFromProductDetail={isFromProductDetail}
        orderQty={orderQty}
        bulkPriceAterTax={bulkPriceAterTax}
        priceAfterTax={priceAfterTax}
        isPriceGrosir={isPriceGrosir}
        product={productDetail}
      />
      {productDetail?.hasBulkPrice ? (
        <BulkPricingList
          bulkPrices={productDetail?.bulkPrices}
          onExpand={setIsBulkPriceExpand}
        />
      ) : (
        <View />
      )}
      <AddToCartQuantityModifier
        orderQty={orderQty}
        onChangeQty={onChangeQty}
        setIsFocus={setIsFocus}
        isFocus={isFocus}
        dataStock={dataStock}
        product={productDetail}
      />
    </ActionSheet>
  );
};

export default memo(AddToCartModal);
