import { useMemo } from 'react';
import { useProductContext } from 'src/data/contexts/product/useProductContext';

const useAddToCart = (orderQty: number, isFromProductDetail?: boolean) => {
  const {
    stateProduct: {
      detail: { data: dataProductDetail },
      cart: { data: dataProductDetailCart },
    },
  } = useProductContext();
  // product data
  const productDetail = useMemo(
    () => (isFromProductDetail ? dataProductDetail : dataProductDetailCart),
    [isFromProductDetail, dataProductDetail, dataProductDetailCart],
  );
  // set harga produk harga normal dan harga grosir
  const bulkPriceAterTax = useMemo(() => {
    const bulkPriceDetailProduct =
      dataProductDetail?.bulkPrices.filter((i) => i.qty <= orderQty) || [];

    const bulkPriceDetailCart =
      dataProductDetailCart?.bulkPrices.filter((i) => i.qty <= orderQty) || [];

    const normalPrice = isFromProductDetail
      ? dataProductDetail?.priceAfterTax
      : dataProductDetailCart?.priceAfterTax;

    const bulkPrice = isFromProductDetail
      ? bulkPriceDetailProduct
      : bulkPriceDetailCart;

    const price =
      bulkPrice.length < 1
        ? normalPrice
        : bulkPrice[bulkPrice.length - 1]?.priceAfterTax;

    if (productDetail?.hasBulkPrice) {
      return price || 0;
    }

    return productDetail?.priceAfterTax || 0;
  }, [
    orderQty,
    dataProductDetail?.bulkPrices,
    dataProductDetailCart?.bulkPrices,
    dataProductDetail?.priceAfterTax,
    dataProductDetailCart?.priceAfterTax,
    isFromProductDetail,
    productDetail?.hasBulkPrice,
  ]);

  const priceAfterTax = useMemo(() => {
    return productDetail?.priceAfterTax || 0;
  }, [productDetail]);

  // cek apakah masuk harga grosir coret
  const isPriceGrosir = useMemo(() => {
    // if not get, default harus lebih tinggi
    const qtyMinBulk = productDetail?.bulkPrices[0]?.qty || 99999;
    return qtyMinBulk <= orderQty;
  }, [orderQty, productDetail]);

  return { bulkPriceAterTax, isPriceGrosir, priceAfterTax, productDetail };
};

export default useAddToCart;
