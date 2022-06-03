import { useMemo } from 'react';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';

const useAddToCart = (orderQty: number, isFromProductDetail?: boolean) => {
  const {
    stateProduct: {
      detail: { data: dataProductDetail, loading: loadingProductDetail },
      cart: { data: dataProductDetailCart, loading: loadingProductDetailCart },
    },
  } = useProductContext();
  const {
    stateStock: {
      validation: { data: dataStockValidation, error: errorStockValidation },
      detail: { data: dataStockDetail, error: errorStockDetail },
    },
  } = useStockContext();
  const loadingProduct = useMemo(
    () =>
      isFromProductDetail ? loadingProductDetail : loadingProductDetailCart,
    [isFromProductDetail, loadingProductDetail, loadingProductDetailCart],
  );
  // product data
  const productDetail = useMemo(
    () => (isFromProductDetail ? dataProductDetail : dataProductDetailCart),
    [isFromProductDetail, dataProductDetail, dataProductDetailCart],
  );
  // stock data
  const dataStock = useMemo(
    () => (isFromProductDetail ? dataStockDetail : dataStockValidation),
    [dataStockValidation, dataStockDetail, isFromProductDetail],
  );
  // stock error
  const errorStock = useMemo(
    () => (isFromProductDetail ? errorStockDetail : errorStockValidation),
    [errorStockValidation, errorStockDetail, isFromProductDetail],
  );
  // set harga produk harga normal dan harga grosir
  const bulkPriceAterTax = useMemo(() => {
    const normalPrice = productDetail?.priceAfterTax;
    // filter mendapatkan harga grosir sesuai qty
    const bulkPrice =
      productDetail?.bulkPrices.filter((i) => i.qty <= orderQty) || [];
    // mengambil harga grosir dari array terakhir
    const price =
      bulkPrice.length < 1
        ? normalPrice
        : bulkPrice[bulkPrice.length - 1]?.priceAfterTax;
    // jika ada bulk price,return harga grosir
    if (productDetail?.hasBulkPrice) {
      return price || 0;
    }
    // return harga normal
    return productDetail?.priceAfterTax || 0;
  }, [
    orderQty,
    productDetail?.priceAfterTax,
    productDetail?.bulkPrices,
    productDetail?.hasBulkPrice,
  ]);
  // harga normal
  const priceAfterTax = useMemo(() => {
    return productDetail?.priceAfterTax || 0;
  }, [productDetail?.priceAfterTax]);

  // cek apakah masuk harga grosir coret
  const isPriceGrosir = useMemo(() => {
    // if not get, default harus lebih tinggi
    const qtyMinBulk = productDetail?.bulkPrices[0]?.qty || 99999;
    return qtyMinBulk <= orderQty;
  }, [orderQty, productDetail?.bulkPrices]);

  return {
    bulkPriceAterTax,
    isPriceGrosir,
    priceAfterTax,
    productDetail,
    dataStock,
    errorStock,
    loadingProduct,
  };
};

export default useAddToCart;
