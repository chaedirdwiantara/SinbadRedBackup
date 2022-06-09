/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useMemo, useState, useCallback } from 'react';
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
  onBlur: () => void;
  onChangeQty: (val: number) => void;
  disabled: boolean;
  isFromProductDetail?: boolean;
  loading?: boolean;
}

/** === COMPONENT ===  */
const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onBlur,
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
  // variable
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
  // validasi stock habis
  const isStockEmpty = useMemo(() => {
    if (dataStock?.stock && productDetail?.minQty) {
      // ketika stock 0 atau jumlah stock lebih kecil dari minimal pembelian return produk habis
      if (dataStock?.stock <= 0 || dataStock?.stock < productDetail?.minQty)
        return true;
    }
    return false;
  }, [dataStock?.stock, productDetail?.minQty]);
  // function
  const onCloseModal = useCallback(() => {
    closeAction();
    onChangeQty(productDetail?.minQty || 0);
  }, [productDetail?.minQty]);

  // render
  return (
    <ActionSheet
      contentHeight={contentHeight}
      open={open}
      name="modal-add-to-cart"
      onClose={onCloseModal}
      onBlur={onBlur}
      title="Masukkan Jumlah"
      footer={
        <AddToCartFooter
          isStockEmpty={isStockEmpty}
          errorStock={errorStock}
          disabled={disabled || isFocus}
          orderQty={orderQty}
          bulkPriceAterTax={bulkPriceAterTax}
          onAddToCartPress={onAddToCartPress}
          loading={loadingProduct}
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
      {productDetail?.hasBulkPrice && !loadingProduct ? (
        <BulkPricingList
          bulkPrices={productDetail?.bulkPrices}
          onExpand={setIsBulkPriceExpand}
        />
      ) : (
        <View />
      )}
      <AddToCartQuantityModifier
        isStockEmpty={isStockEmpty}
        loading={loadingProduct}
        disabled={disabled}
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
