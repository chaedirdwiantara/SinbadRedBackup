/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CartMaster = {
  id: '',
  userId: 0,
  buyerId: 0,
  totalProducts: 0,
  sellers: [],
  unavailable: [],
  isCheckProductMerged: false,
  isCheckSellerMerged: false,
  isCheckStockMerged: false,
};

/** === FUNCTION === */
export const cartMaster = simplifyReducer(initialState, {
  /** => SET CART MASTER DATA AFTER FETCH SUCCESS */
  [types.SET_CART_MASTER](
    state = initialState,
    { payload }: models.SetCartMasterAction,
  ) {
    return {
      ...state,
      id: payload.id,
      userId: payload.userId,
      buyerId: payload.buyerId,
      totalProducts: payload.totalProducts,
      sellers: payload.sellers,
    };
  },
  /** => MERGE CHECK PRODUCT DATA */
  [types.MERGE_CHECK_PRODUCT](
    state = initialState,
    { payload }: models.MergeCheckProductAction,
  ) {
    const sellers: models.CartMasterSellers[] = [];
    const unavailable: models.CartMasterUnavailable[] = [];
    /** => replace all getCart product data with checkProduct data */
    for (let i = 0; i < state.sellers.length; i++) {
      const products: models.CartMasterSellersProducts[] = [];
      payload.map((item) => {
        if (item.sellerId === state.sellers[i].sellerId) {
          const thisProduct = state.sellers[i].products.find(
            (innerItem) =>
              innerItem.productId === item.productId &&
              innerItem.warehouseId === item.warehouseId,
          );
          if (thisProduct) {
            /** => processing rules:
             * 1. min qty dari 5 naik ke 10 dan cart qty masih 7 maka qty bakal ke force jadi 10 (ke uncheck)
             */
            let qty: number = item.qty;
            let selected: boolean = item.selected;
            if (item.minQty >= thisProduct.qty) {
              qty = item.minQty;
              selected = false;
            }
            const productData: models.CartMasterSellersProducts = {
              ...item,
              lastUsedPrice: thisProduct.lastUsedPrice,
              isLastPriceUsedRules: thisProduct.isLastPriceUsedRules,
              multipleQty: thisProduct.multipleQty,
              qty,
              selected,
              productStatus: item.status,
            };
            /** => move product data to unavailable if inactive */
            if (item.status === 'inactive') {
              unavailable.push({
                ...productData,
                unavailableMessage: 'Produk Tidak Tersedia',
                selected: false,
              });
            } else {
              products.push({ ...productData });
            }
          }
        }
      });
      sellers.push({
        ...state.sellers[i],
        products,
      });
    }
    return {
      ...state,
      sellers: sellers,
      unavailable: unavailable,
      isCheckProductMerged: true,
    };
  },
  /** => MERGE CHECK SELLER DATA */
  [types.MERGE_CHECK_SELLER](
    state = initialState,
    { payload }: models.MergeCheckSellerAction,
  ) {
    const sellers: models.CartMasterSellers[] = [];
    const unavailable: models.CartMasterUnavailable[] = [...state.unavailable];
    /** => replace all getCart product data with checkSeller data */
    for (let i = 0; i < state.sellers.length; i++) {
      const products: models.CartMasterSellersProducts[] = [];
      let sellerId: number = state.sellers[i].sellerId;
      let sellerName: string = state.sellers[i].sellerName;
      let status: string = '';
      payload.map((item) => {
        if (state.sellers[i].sellerId === item.sellerId) {
          sellerId = item.sellerId;
          sellerName = item.sellerName;
          status = item.status;
          /** => check if the seller status inactive, then all products data will moved to unavailable */
          if (item.status === 'inactive') {
            state.sellers[i].products.map((innerItem) => {
              unavailable.push({
                ...innerItem,
                unavailableMessage: 'Seller Tidak Tersedia',
                selected: false,
              });
            });
          } else {
            state.sellers[i].products.map((innerItem) => {
              products.push({ ...innerItem });
            });
          }
        }
      });
      sellers.push({
        sellerId,
        sellerName,
        products,
        status,
      });
    }
    return {
      ...state,
      sellers: sellers,
      unavailable: unavailable,
      isCheckSellerMerged: true,
    };
  },
  /** => MERGE CHECK STOCK DATA */
  [types.MERGE_CHECK_STOCK](
    state = initialState,
    { payload }: models.MergeCheckStockAction,
  ) {
    const sellers: models.CartMasterSellers[] = [];
    const unavailable: models.CartMasterUnavailable[] = [...state.unavailable];
    /** => replace all getCart product data with checkStock data */
    for (let i = 0; i < state.sellers.length; i++) {
      const products: models.CartMasterSellersProducts[] = [];
      payload.map((item) => {
        const thisProduct = state.sellers[i].products.find(
          (innerItem) =>
            innerItem.productId === item.productId &&
            innerItem.warehouseId === item.warehouseId,
        );
        if (thisProduct) {
          /** => processing rules:
           * 1. add cart ketika min qty 5 dengan qty add = 7, terus sisa stock menjadi 6, qty bakalan ke force 6 (ke uncheck)
           * 2. min qty < stock warehouse, maka product not available
           */
          let qty: number = thisProduct.qty;
          let selected: boolean = thisProduct.selected;
          let status: string = item.status;
          if (thisProduct.qty >= item.stock) {
            qty = item.stock;
            selected = false;
          }
          if (thisProduct.minQty > item.stock) {
            status = 'stock_not_enough';
          }
          const productData: models.CartMasterSellersProducts = {
            ...thisProduct,
            lastUsedPrice: thisProduct.lastUsedPrice,
            isLastPriceUsedRules: thisProduct.isLastPriceUsedRules,
            qty,
            selected,
            stock: item.stock,
            stockStatus: item.status,
          };
          /** => move product data to unavailable if not_available */
          if (status === 'not_available') {
            unavailable.push({
              ...productData,
              unavailableMessage: 'Stok Tidak Tersedia',
              selected: false,
            });
          } else if (status === 'stock_not_enough') {
            unavailable.push({
              ...productData,
              unavailableMessage: 'Stok Tidak Mencukupi',
              selected: false,
            });
          } else {
            products.push({ ...productData });
          }
        }
      });
      sellers.push({
        ...state.sellers[i],
        products,
      });
    }
    return {
      ...state,
      sellers: sellers,
      unavailable: unavailable,
      isCheckStockMerged: true,
    };
  },
  /** => MERGE CHECK PRODUCT DATA */
  [types.CART_MASTER_REMOVE_PRODUCT](
    state = initialState,
    { payload }: models.CartMasterRemoveProductAction,
  ) {
    const sellers: models.CartMasterSellers[] = [];
    const unavailable: models.CartMasterUnavailable[] = [];
    if (payload.source === 'available') {
      state.sellers.map((item) => {
        const filteredProducts = item.products.filter((innerItem) => {
          return (
            innerItem.productId !== payload.removedProducts[0].productId &&
            innerItem.warehouseId !== payload.removedProducts[0].warehouseId
          );
        });
        sellers.push({
          ...item,
          products: filteredProducts,
        });
      });
      return {
        ...state,
        sellers: sellers,
      };
    } else {
      state.unavailable.map((item) => {
        const isFound =
          payload.removedProducts.findIndex(
            (innerItem) =>
              innerItem.productId === item.productId &&
              innerItem.warehouseId === item.warehouseId,
          ) > -1;
        if (!isFound) {
          unavailable.push(item);
        }
      });
      return {
        ...state,
        unavailable: unavailable,
      };
    }
  },
  /** => RESET CARD MASTER INTO INITIAL STATE */
  [types.RESET_CART_MASTER]() {
    return initialState;
  },
});
