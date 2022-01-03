/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState, Fragment, useEffect, useRef } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SnbContainer, SnbDialog, SnbToast } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartInvoiceGroup } from './shopping-cart-invoice-group.view';
import { ShoppingCartEmpty } from './shopping-cart-empty.view';
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShippingAddress } from './shipping-address.view';
import LoadingPage from '@core/components/LoadingPage';
import { ProductEmptyStockView } from './product-empty-stock.view';
import BottomSheetError from '@core/components/BottomSheetError';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useVerficationOrderAction } from '@screen/oms/functions/verification-order/verification-order-hook.function';
import { UserHookFunc } from '@screen/user/functions';
import {
  getSelectedVouchers,
  useVoucherLocalData,
} from '@screen/voucher/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  CartUpdatePayload,
  CartSelected,
  CartSelectedData,
  CartSelectedBrand,
  CartSelectedProduct,
  CartInvoiceGroup,
  CartBrand,
  CartProduct,
  IProductItemUpdateCart,
  ICartMasterProductNotAvailable,
  IProductRemoveSelected,
} from '@models';
import {
  goToVerificationOrder,
  getTotalProducts,
  useCartMasterActions,
  useCheckoutMaster,
  goBack,
} from '../../functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { usePromoContext } from 'src/data/contexts/promo/usePromoContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useReserveStockContext } from 'src/data/contexts/product';
import { useVerificationOrderContext } from 'src/data/contexts/oms/verification-order/useVerificationOrderContext';
import {
  useCartViewActions,
  useCartUpdateActions,
  useCartSelected,
  useCartTotalProductActions,
  useInitialCartUpdateActions,
  useProductMasterCartActions,
} from '@screen/oms/functions';
import {
  useReserveStockAction,
  useStockInformationAction,
} from '@screen/product/functions';
/** === COMPONENT === */
const OmsShoppingCartView: FC = ({ navigation }: any) => {
  /** === HOOKS === */
  const {
    cartMaster,
    setCartMaster,
    deleteProduct,
    setCartMasterData,
    updateRouteName,
    deleteProductEmptyStock,
    deleteProductNotFound,
  } = useCartMasterActions();
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const [productRemoveSelected, setProductRemoveSelected] =
    useState<IProductRemoveSelected | null>(null);
  const totalProducts = getTotalProducts(cartMaster.data);
  // const totalProducts = useMemo(
  //   () => getTotalProducts(cartMaster.data),
  //   [cartMaster.data.length, allProductsSelected],
  // );
  const [
    modalConfirmationCheckoutVisible,
    setModalConfirmationCheckoutVisible,
  ] = useState(false);
  const [
    modalConfirmationRemoveProductVisible,
    setModalConfirmationRemoveProductVisible,
  ] = useState(false);
  const [loadingRemoveProduct, setLoadingRemoveProduct] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [sassionQty, setSassionQty] = useState<number>(Math.random() * 100);
  const [isFocus, setIsFocus] = useState(false);
  const [modalFailedCheckout, setModalFailedCheckout] = useState(false);
  const [modalFailedGetCart, setModalFailedGetCart] = useState(false);

  /** === REF === */
  const toastSuccessRemoveProduct = useRef<any>();
  const toastFailedRemoveProduct = useRef<any>();

  const { dispatchUser } = React.useContext(contexts.UserContext);
  const { checkoutMaster } = useCheckoutMaster();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const cartViewActions = useCartViewActions();
  const cartUpdateActions = useCartUpdateActions();
  const cartTotalProductActions = useCartTotalProductActions();
  const initialCartUpdateActions = useInitialCartUpdateActions();
  const { dataProductMasterCart, setDataProductMasterCart } =
    useProductMasterCartActions();
  const {
    stateShopingCart: {
      cart: { data: cartViewData, error: cartViewError },
      update: {
        data: updateCartData,
        loading: updateCartLoading,
        error: updateCartError,
      },
    },
    dispatchShopingCart,
  } = useShopingCartContext();

  /** => handle verification cart */
  const { setCartSelected } = useCartSelected();

  /**
   * Verification Order
   */
  const {
    stateVerificationOrder: {
      create: {
        data: dataCreateVerificationOrder,
        loading: loadingCreateVerificationOrder,
        error: errorCreateVerificationOrder,
      },
    },
    dispatchVerificationOrder,
  } = useVerificationOrderContext();
  const {
    verificationOrderCreate,
    verificationOrderDetail,
    verificationReset,
  } = useVerficationOrderAction();

  /** Voucher Cart */
  const voucherLocalData = useVoucherLocalData();

  /**
   * Reserve Section
   * - Cancel Reserve Discount (Promo & Voucher)
   * - Cancel Reserve Stock
   */
  const { dispatchPromo } = usePromoContext();
  const {
    stateReserveStock: {
      delete: { data: cancelStockData },
    },
    dispatchReserveStock,
  } = useReserveStockContext();
  const {
    stateStock: {
      information: { data: stockInformationData },
    },
    dispatchStock,
  } = useStockContext();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();
  const stockInformationAction = useStockInformationAction();

  /** => action remove product and show comfirmation dialog */
  const onRemoveProduct = (productRemove: IProductRemoveSelected) => {
    setProductRemoveSelected(productRemove);
    setModalConfirmationRemoveProductVisible(true);
  };

  /** => action confirmation remove product */
  const onConfirmRemoveProduct = () => {
    if (!productRemoveSelected) {
      /** do something or show modal retry */
      return;
    }

    setLoadingRemoveProduct(true);
    const params = {
      action: 'submit',
      products: [productRemoveSelected],
    };
    cartUpdateActions.fetch(dispatchShopingCart, params);
  };

  /** => action cancel remove product */
  const onCancelRemoveProduct = () => {
    setProductRemoveSelected(null);
    setLoadingRemoveProduct(false);
    setModalConfirmationRemoveProductVisible(false);
  };

  const onCloseModalErrorCheckout = () => {
    cartUpdateActions.reset(dispatchShopingCart);
    setModalFailedCheckout(false);
  };

  /** => handle go back */
  const handleGoBackErrorGetCart = () => {
    setModalFailedGetCart(false);
    goBack();
  };

  /** => handle go back */
  const handleGoBackHeader = () => {
    onUpdateCart();
    setTimeout(() => {
      goBack();
    }, 500);
  };

  const onUpdateCart = () => {
    const params: CartUpdatePayload = {
      action: 'submit',
      products: dataProductMasterCart,
    };

    initialCartUpdateActions.fetch(dispatchShopingCart, params);
  };

  /** Confirmation checkout submit */
  const onSubmitCheckout = () => {
    if (cartViewData === null) {
      /** DO SOMETHING */
      /** Show modal error/retry */
      return;
    }
    const params: CartUpdatePayload = {
      action: 'submit',
      products: dataProductMasterCart,
    };

    const dataSelected: CartSelectedData[] = [];

    cartMaster.data.forEach((invoiceGroup) => {
      /** => initial brand selected */
      const brandsSelected: CartSelectedBrand[] = [];
      invoiceGroup.brands.forEach((brand) => {
        /** => initial product selected */
        const productsSelected: CartSelectedProduct[] = [];
        brand.products.forEach((product) => {
          params.products.push({
            productId: product.productId,
            qty: product.qty,
            selected: product.selected,
            stock: product.stock,
          });

          if (product.selected) {
            /** => insert product selected */
            productsSelected.push({
              productId: product.productId,
              qty: product.qty,
              displayPrice: product.displayPrice,
              priceBeforeTax: product.priceBeforeTax,
              priceAfterTax: product.priceAfterTax,
              warehouseId: product.warehouseId,
            });
          }
        });
        if (productsSelected.length > 0) {
          /** => insert brand selected */
          brandsSelected.push({
            brandId: brand.brandId,
            products: productsSelected,
          });
        }
      });
      if (brandsSelected.length > 0) {
        /** => insert data selected */
        dataSelected.push({
          invoiceGroupId: invoiceGroup.invoiceGroupId,
          portfolioId: invoiceGroup.portfolioId,
          brands: brandsSelected,
          sellerId: invoiceGroup.sellerId,
          channelId: invoiceGroup.channelId,
          groupId: invoiceGroup.groupId,
          typeId: invoiceGroup.typeId,
          clusterId: invoiceGroup.clusterId,
        });
      }
    });

    const paramsCartSelected: CartSelected = {
      id: cartViewData.cartId,
      data: dataSelected,
      isActiveStore: cartViewData.isActiveStore,
    };

    const paramsVerificationCreate: CartSelected = {
      id: cartViewData.cartId,
      data: dataSelected,
      isActiveStore: cartViewData.isActiveStore,
      voucherIds: getSelectedVouchers(voucherLocalData.selectedVoucher),
    };

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    setCartSelected(paramsCartSelected);
    /** => fetch post potential discount */
    verificationOrderCreate(
      dispatchVerificationOrder,
      paramsVerificationCreate,
    );
  };

  /** => did mounted and focus */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadingPage(true);
      cartViewActions.fetch(dispatchShopingCart);
      storeDetailAction.detail(dispatchUser);
      if (checkoutMaster.cartId) {
        reserveDiscountAction.del(dispatchPromo, checkoutMaster.cartId);
        reserveStockAction.del(dispatchReserveStock, checkoutMaster.cartId);
      } else {
        setLoadingPage(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  NavigationAction.useCustomBackHardware(() => {
    handleGoBackHeader();
  });

  /** => Listen data cancel reserve stock */
  useEffect(() => {
    if (checkoutMaster.cartId && cancelStockData !== null) {
      stockInformationAction.fetch(dispatchStock, checkoutMaster.cartId);
    }
  }, [cancelStockData]);

  /** => Listen create verification order and update cart navigating to order verification screen  */
  useEffect(() => {
    /** => below is the action if the update cart & potential discount fetch success */
    if (
      dataCreateVerificationOrder !== null &&
      updateCartData !== null &&
      productRemoveSelected === null
    ) {
      verificationOrderDetail(
        dispatchVerificationOrder,
        dataCreateVerificationOrder.id,
      );
      cartUpdateActions.reset(dispatchShopingCart);
      setModalConfirmationCheckoutVisible(false);
      goToVerificationOrder();
    }
  }, [dataCreateVerificationOrder, updateCartData]);

  useEffect(() => {
    if (errorCreateVerificationOrder !== null) {
      setModalConfirmationCheckoutVisible(false);
      setModalFailedCheckout(true);
    }
  }, [errorCreateVerificationOrder]);

  useEffect(() => {
    if (updateCartError !== null && productRemoveSelected === null) {
      setModalConfirmationCheckoutVisible(false);
      setModalFailedCheckout(true);
    }
  }, [updateCartError]);

  /** Listen changes cartState */
  useEffect(() => {
    /** => make sure data cart and data information stock is ready */
    if (cartViewData !== null && stockInformationData !== null) {
      let totalProductsSelected = 0;
      let initialTotalProduct = 0;

      const data: CartInvoiceGroup[] = []; //product available
      const dataEmptyStock: ICartMasterProductNotAvailable[] = []; //prodct empty stock
      const dataNotFound: ICartMasterProductNotAvailable[] = []; //product not available
      const productMasterCart: IProductItemUpdateCart[] = []; //product for update cart

      /** Looping cart data to mapping with information stock data */
      cartViewData.data.forEach((invoiceGroup) => {
        let isEmptyBrand = true; //flag if brand of invoice group is empty array
        const brands: CartBrand[] = [];

        /** Looping brand */
        invoiceGroup.brands.forEach((brand) => {
          let isEmptyProduct = true; //flag if product of brand is empty array
          let brandSelected = false;
          const products: CartProduct[] = [];

          /** Looping product */
          brand.products.forEach((product) => {
            const indexChange = stockInformationData.change.findIndex(
              (item) => item.productId === product.productId,
            );

            const indexEmptyStock = stockInformationData.emptyStock.findIndex(
              (item) => item.productId === product.productId,
            );

            const indexNotFound = stockInformationData.notFound.findIndex(
              (item) => item.productId === product.productId,
            );

            if (indexChange >= 0) {
              if (
                stockInformationData.change[indexChange].currentStock <
                product.minQty
              ) {
                /** => add to products to array empty stock */
                dataEmptyStock.push({
                  productId: product.productId,
                  productName: product.productName,
                  displayPrice: product.displayPrice,
                  urlImages: product.urlImages,
                  qty: product.qty,
                  stock: product.stock,
                });

                /** => add to data product for update cart */
                productMasterCart.push({
                  productId: product.productId,
                  selected: false,
                  qty: product.qty,
                  stock: product.stock,
                });

                /** => add to data product for update cart */
                productMasterCart.push({
                  productId: product.productId,
                  selected: false,
                  qty: product.qty,
                  stock: product.stock,
                });
              } else {
                /** => if status selected is true */
                if (product.selected) {
                  totalProductsSelected += 1;
                  brandSelected = true;
                }
                initialTotalProduct += 1;

                /** => add to products of brand */
                products.push({
                  ...product,
                  stock: stockInformationData.change[indexChange].currentStock,
                });

                /** => add to data product for update cart */
                productMasterCart.push({
                  productId: product.productId,
                  selected: product.selected,
                  qty: product.qty,
                  stock: stockInformationData.change[indexChange].currentStock,
                });

                /** => the brand has product */
                isEmptyProduct = false;
              }
            } else if (indexEmptyStock >= 0) {
              /** => add to products to array empty stock */
              dataEmptyStock.push({
                productId: product.productId,
                productName: product.productName,
                displayPrice: product.displayPrice,
                urlImages: product.urlImages,
                qty: product.qty,
                stock: product.stock,
              });

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: false,
                qty: product.qty,
                stock: product.stock,
              });

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: false,
                qty: product.qty,
                stock: product.stock,
              });
            } else if (indexNotFound >= 0) {
              /** => add to products of brand */
              dataNotFound.push({
                productId: product.productId,
                productName: product.productName,
                displayPrice: product.displayPrice,
                urlImages: product.urlImages,
                qty: product.qty,
                stock: product.stock,
              });

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: false,
                qty: product.qty,
                stock: product.stock,
              });

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: false,
                qty: product.qty,
                stock: product.stock,
              });
            } else if (product.qty >= product.stock) {
              if (product.selected) {
                totalProductsSelected += 1;
                brandSelected = true;
              }
              initialTotalProduct += 1;

              const maxQtyAfterMinimum = product.stock - product.minQty;
              const qty =
                Math.floor(maxQtyAfterMinimum / product.multipleQty) *
                  product.multipleQty +
                product.minQty;

              products.push({
                ...product,
                qty: qty,
              });

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: product.selected,
                qty: qty,
                stock: product.stock,
              });

              isEmptyProduct = false;
            } else {
              if (product.selected) {
                totalProductsSelected += 1;
                brandSelected = true;
              }
              initialTotalProduct += 1;
              products.push(product);

              /** => add to data product for update cart */
              productMasterCart.push({
                productId: product.productId,
                selected: product.selected,
                qty: product.qty,
                stock: product.stock,
              });

              isEmptyProduct = false;
            }
          });

          if (!isEmptyProduct) {
            brands.push({
              ...brand,
              selected: brandSelected,
              products: products,
            });
            isEmptyBrand = false;
          }
        });

        if (!isEmptyBrand) {
          data.push({ ...invoiceGroup, brands: brands });
        }
      });

      if (
        totalProductsSelected === initialTotalProduct &&
        totalProductsSelected > 0 &&
        initialTotalProduct > 0
      ) {
        setAllProductsSelected(true);
      }

      setDataProductMasterCart(productMasterCart);
      setCartMaster({
        ...cartViewData,
        data: data,
        dataEmptyStock: dataEmptyStock,
        dataNotFound: dataNotFound,
        others: [],
      });
      setProductSelectedCount(totalProductsSelected);
      setLoadingPage(false);
    }
  }, [cartViewData, stockInformationData]);

  /** Listen error get cart */
  useEffect(() => {
    if (cartViewError !== null) {
      setLoadingPage(false);
      setModalFailedGetCart(true);
    }
  }, [cartViewError]);

  /** Listen product will be removed */
  useEffect(() => {
    if (productRemoveSelected !== null && updateCartData !== null) {
      //call action remove product from redux
      if (productRemoveSelected.selected) {
        setProductSelectedCount(productSelectedCount - 1);
      }
      toastSuccessRemoveProduct.current.show();
      if (productRemoveSelected.type === 'data') {
        deleteProduct({ productId: productRemoveSelected.productId });
      } else if (productRemoveSelected.type === 'dataEmptyStock') {
        deleteProductEmptyStock({ productId: productRemoveSelected.productId });
      } else if (productRemoveSelected.type === 'dataNotFound') {
        deleteProductNotFound({ productId: productRemoveSelected.productId });
      }
      setLoadingRemoveProduct(false);
      setSassionQty(Math.random() * 10000000);
      setModalConfirmationRemoveProductVisible(false);
      cartTotalProductActions.fetch();
      setProductRemoveSelected(null);
      console.log({ productSelectedCount, totalProducts });
      if (productSelectedCount === totalProducts - 1) {
        setAllProductsSelected(true);
      }
      cartUpdateActions.reset(dispatchShopingCart);
    }
  }, [productRemoveSelected, updateCartData]);

  /** Listen error remove */
  useEffect(() => {
    if (productRemoveSelected !== null && updateCartError !== null) {
      toastFailedRemoveProduct.current.show();
      setLoadingRemoveProduct(false);
      cartUpdateActions.reset(dispatchShopingCart);
    }
  }, [productRemoveSelected, updateCartError]);

  /** did will unmound */
  useEffect(() => {
    return () => {
      voucherLocalData.reset();
      verificationReset(dispatchVerificationOrder);
      cartViewActions.reset(dispatchShopingCart);
      stockInformationAction.reset(dispatchStock);
      reserveDiscountAction.resetDelete(dispatchPromo);
      reserveStockAction.resetDelete(dispatchReserveStock);
      updateRouteName({
        previouseRouteName: '',
      });
    };
  }, []);

  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="white">
      <ShoppingCartHeader goBack={handleGoBackHeader} />
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          {(Array.isArray(cartMaster.data) && cartMaster.data.length > 0) ||
          (Array.isArray(cartMaster.dataEmptyStock) &&
            cartMaster.dataEmptyStock.length > 0) ||
          (Array.isArray(cartMaster.dataNotFound) &&
            cartMaster.dataNotFound.length > 0) ? (
            <Fragment>
              <ScrollView>
                <ShippingAddress />
                {/* Invoice Group List */}
                <Fragment>
                  {cartMaster.data.map((invoiceGroup, invoiceGroupIndex) => (
                    <ShoppingCartInvoiceGroup
                      key={invoiceGroup.invoiceGroupId.toString()}
                      invoiceGroup={invoiceGroup}
                      invoiceGroupIndex={invoiceGroupIndex}
                      invoiceGroups={cartMaster.data}
                      setInvoiceGroups={setCartMasterData}
                      productSelectedCount={productSelectedCount}
                      setProductSelectedCount={setProductSelectedCount}
                      setAllProductsSelected={setAllProductsSelected}
                      totalProducts={totalProducts}
                      sassionQty={sassionQty}
                      setSassionQty={setSassionQty}
                      onRemoveProduct={onRemoveProduct}
                      isFocus={isFocus}
                      setIsFocus={setIsFocus}
                      onUpdateCart={onUpdateCart}
                    />
                  ))}
                </Fragment>
                <Fragment>
                  {Array.isArray(cartMaster.dataNotFound) &&
                    cartMaster.dataNotFound.length > 0 && (
                      <ProductEmptyStockView
                        sectionName={'Product Tidak Tersedia'}
                        data={cartMaster.dataNotFound}
                        onRemoveProduct={onRemoveProduct}
                        type={'dataNotFound'}
                      />
                    )}
                </Fragment>
                <Fragment>
                  {Array.isArray(cartMaster.dataEmptyStock) &&
                    cartMaster.dataEmptyStock.length > 0 && (
                      <ProductEmptyStockView
                        sectionName={'Product Habis'}
                        data={cartMaster.dataEmptyStock}
                        onRemoveProduct={onRemoveProduct}
                        type={'dataEmptyStock'}
                      />
                    )}
                </Fragment>
              </ScrollView>
              <ShoppingCartFooter
                allProductsSelected={allProductsSelected}
                invoiceGroups={cartMaster.data}
                setInvoiceGroups={setCartMasterData}
                setProductSelectedCount={setProductSelectedCount}
                setAllProductsSelected={setAllProductsSelected}
                totalProducts={totalProducts}
                productSelectedCount={productSelectedCount}
                openModalCheckout={setModalConfirmationCheckoutVisible}
                onUpdateCart={onUpdateCart}
              />
            </Fragment>
          ) : (
            <ShoppingCartEmpty navigationParent={navigation} />
          )}
        </>
      )}
      {/* Confirmation Modal Checkout */}
      <SnbDialog
        open={modalConfirmationCheckoutVisible}
        title="Konfirmasi"
        content="Konfirmasi order dan lanjut ke Checkout?"
        okText={'Ya'}
        ok={onSubmitCheckout}
        cancelText={'Tidak'}
        cancel={() => setModalConfirmationCheckoutVisible(false)}
        loading={loadingCreateVerificationOrder || updateCartLoading}
      />
      <SnbDialog
        open={modalConfirmationRemoveProductVisible}
        title="Konfirmasi"
        content="Apakah Anda yakin untuk menghapus barang?"
        okText={'Tidak'}
        ok={onCancelRemoveProduct}
        cancelText={'Ya'}
        cancel={onConfirmRemoveProduct}
        loading={loadingRemoveProduct}
      />
      {/* Toast success add cart */}
      <SnbToast
        ref={toastSuccessRemoveProduct}
        message={'Produk berhasil dihapus dari keranjang'}
        position={'top'}
        duration={2000}
        positionValue={StatusBar.currentHeight || 0}
      />
      {/* Toast failed add cart */}
      <SnbToast
        ref={toastFailedRemoveProduct}
        message={'Produk gagal dihapus dari keranjang'}
        position={'top'}
        duration={2000}
        positionValue={StatusBar.currentHeight || 0}
      />
      {/* Modal Bottom Sheet Error Send data to supplier */}
      <BottomSheetError
        open={modalFailedCheckout}
        error={updateCartError || errorCreateVerificationOrder}
        closeAction={onCloseModalErrorCheckout}
        retryAction={onSubmitCheckout}
      />
      {/* Modal Bottom Sheet Error get cart */}
      <BottomSheetError
        open={modalFailedGetCart}
        error={cartViewError}
        closeAction={handleGoBackErrorGetCart}
      />
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: Maulana Ghozi
 * updatedDate: 11112021
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
