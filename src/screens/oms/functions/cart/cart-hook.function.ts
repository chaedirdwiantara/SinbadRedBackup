/** === IMPORT PACKAGE HERE === */
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useDataCartMaster } from '@core/redux/Data';
import { CartMaster, HandleRemoveProduct } from '@models';
import { manageRemoveProduct } from './cart.function';
/** === FUNCTION === */
/** => cart example action */
const useCartExampleAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartExampleProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartExampleReset(contextDispatch));
    },
  };
};
/** => get cart action */
const useGetCartAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getCartProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getCartReset(contextDispatch));
    },
  };
};

const useGetTotalCartAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getTotalCartProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getTotalCartReset(contextDispatch));
    },
  };
};
/** => add to cart action */
const useAddToCartAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.AddToCartPayload,
    ) => {
      dispatch(Actions.addToCartProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.addToCartReset(contextDispatch));
    },
  };
};
/** => update cart action */
const useUpdateCartAction = () => {
  const dispatch = useDispatch();
  const { stateCart } = useContext(contexts.CartContext);
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartData: models.CartMaster,
    ) => {
      if (stateCart.buyerAddress.data !== null) {
        const carts: models.CartMasterSellers[] = [...cartData.sellers];
        cartData.unavailable.map((product) => {
          const sellerFound = cartData.sellers.find(
            (seller) => seller.sellerId === product.sellerId,
          );

          if (sellerFound) {
            const indexCartFound = carts.findIndex(
              (cart) => cart.sellerId === sellerFound.sellerId,
            );

            if (indexCartFound !== -1) {
              const isProductAlreadyExist = carts[indexCartFound].products.some(
                (prod) => prod.productId === product.productId,
              );
              if (!isProductAlreadyExist) {
                carts[indexCartFound].products.push(product);
              }
            } else {
              carts.push({
                ...sellerFound,
                products: [...sellerFound?.products, product],
              });
            }
          }
        });

        // rewrite lastUsedPrice
        carts.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            productItem.lastUsedPrice = productItem.price;
          });
        });

        dispatch(
          Actions.updateCartProcess(contextDispatch, {
            data: {
              buyerName: stateCart.buyerAddress.data.buyerName,
              id: cartData.id,
              carts,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.updateCartReset(contextDispatch));
    },
  };
};
/** => remove cart product action */
const useRemoveCartProductAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.RemoveCartProductPayload,
    ) => {
      dispatch(Actions.removeCartProductProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.removeCartProductReset(contextDispatch));
    },
  };
};
/** => cart master action */
const useCartMasterAction = () => {
  const cartMaster: models.CartMaster = useDataCartMaster();
  const dispatch = useDispatch();
  return {
    cartMaster,
    setCartMaster: (data: models.SetCartMaster) => {
      dispatch(Actions.setCartMaster(data));
    },
    mergeCheckProduct: (data: models.CheckProductResponse[]) => {
      dispatch(Actions.mergeCheckProduct(data));
    },
    mergeCheckSeller: (data: models.CheckSellerResponse[]) => {
      dispatch(Actions.mergeCheckSeller(data));
    },
    mergeCheckStock: (data: models.CheckStockResponse[]) => {
      dispatch(Actions.mergeCheckStock(data));
    },
    removeProduct: (data: HandleRemoveProduct) => {
      dispatch(Actions.CartMasterRemoveProduct(data));
    },
    replaceFromLocal: (data: CartMaster) => {
      dispatch(Actions.replaceCartMasterFromLocal(data));
    },
    reset: () => {
      dispatch(Actions.resetCartMaster());
    },
  };
};
/** => check product action */
const useCheckProductAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: models.CheckProductPayloadCarts[] = [];
        stateCart.get.data.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            data.push({
              productId: productItem.productId,
              warehouseId: productItem.warehouseId,
            });
          });
        });
        dispatch(
          Actions.checkProductProcess(contextDispatch, {
            data: { carts: data },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkProductReset(contextDispatch));
    },
  };
};
/** => post check product action */
const usePostCheckProductAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: models.CheckProductPayloadCarts[] = [];
        stateCart.get.data.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            data.push({
              productId: productItem.productId,
              warehouseId: productItem.warehouseId,
            });
          });
        });
        dispatch(
          Actions.postCheckProductProcess(contextDispatch, {
            data: { carts: data },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckProductReset(contextDispatch));
    },
  };
};
/** => check seller action */
const useCheckSellerAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: number[] = [];
        stateCart.get.data.sellers.map((sellerItem) => {
          data.push(sellerItem.sellerId);
        });
        dispatch(
          Actions.checkSellerProcess(contextDispatch, {
            data: {
              sellerIds: data,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkSellerReset(contextDispatch));
    },
  };
};
/** => post check seller action */
const usePostCheckSellerAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: number[] = [];
        stateCart.get.data.sellers.map((sellerItem) => {
          data.push(sellerItem.sellerId);
        });
        dispatch(
          Actions.postCheckSellerProcess(contextDispatch, {
            data: { sellerIds: data },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckSellerReset(contextDispatch));
    },
  };
};
/** => check stock action */
const useCheckStockAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any, isReserved: boolean) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: models.CheckStockPayloadCarts[] = [];
        stateCart.get.data?.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            data.push({
              productId: productItem.productId,
              warehouseId: productItem.warehouseId,
              qty: productItem.qty,
            });
          });
        });
        dispatch(
          Actions.checkStockProcess(contextDispatch, {
            data: {
              cartId: stateCart.get.data.id,
              reserved: isReserved,
              carts: data,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkStockReset(contextDispatch));
    },
  };
};
/** => post check stock action */
const usePostCheckStockAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (stateCart.get.data !== null) {
        // format payload from redux master
        const data: models.CheckStockPayloadCarts[] = [];
        stateCart.get.data?.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            data.push({
              productId: productItem.productId,
              warehouseId: productItem.warehouseId,
              qty: productItem.qty,
            });
          });
        });
        dispatch(
          Actions.postCheckStockProcess(contextDispatch, {
            data: {
              cartId: stateCart.get.data.id,
              reserved: true,
              carts: data,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckStockReset(contextDispatch));
    },
  };
};
/** => cancel stock action */
const useCancelStockAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelStockProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelStockReset(contextDispatch));
    },
  };
};
/** => post cancel stock action */
const usePostCancelStockAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCancelStockProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCancelStockReset(contextDispatch));
    },
  };
};
/** => cart buyer address action */
const useCartBuyerAddressAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartBuyerAddressProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartBuyerAddressReset(contextDispatch));
    },
  };
};
/** => cart local data */
const useCartLocalData = () => {
  const [localCartMaster, setLocalCartMaster] = useState<models.CartMaster>();
  return {
    updateQty: ({
      productId,
      sellerId,
      warehouseId,
      type,
      newQty,
    }: models.UpdateCartQty) => {
      if (localCartMaster) {
        // write the data to new constant, so the data refer
        const newLocalCartMaster = cloneDeep(localCartMaster);
        // find the updated product seller index
        const sellerIndex = newLocalCartMaster.sellers.findIndex(
          (sellerItem) => {
            return sellerItem.sellerId === sellerId;
          },
        );

        // find the updated product index
        const productIndex = newLocalCartMaster.sellers[
          sellerIndex
        ].products.findIndex((productItem) => {
          return (
            productItem.productId === productId &&
            productItem.warehouseId === warehouseId
          );
        });

        const thisProduct =
          newLocalCartMaster.sellers[sellerIndex].products[productIndex];

        // define stock variable
        const stock = thisProduct.stock ?? 0;

        // determine the increment / decrement value
        let updateValue = thisProduct.multipleQty ?? 1;

        // manage logic increase or decrease
        if (type === 'increase') {
          if (thisProduct.qty + updateValue <= stock) {
            thisProduct.qty += updateValue;
            // set the product to become selected
            thisProduct.selected = true;
          }
        } else if (type === 'decrease') {
          if (thisProduct.qty - updateValue >= thisProduct.minQty) {
            thisProduct.qty -= updateValue;
            // set the product to become selected
            thisProduct.selected = true;
          }
        } else if (type === 'onChange') {
          thisProduct.qty = newQty ?? 1;
          thisProduct.selected = true;
        } else {
          thisProduct.qty = newQty ?? thisProduct.minQty;
        }

        // save data to local state
        setLocalCartMaster(newLocalCartMaster);
      }
    },
    updateSelected: ({
      productId,
      sellerId,
      warehouseId,
    }: models.ProductKeyObject) => {
      if (localCartMaster) {
        // write the data to new constant, so the data refer
        const newLocalCartMaster = cloneDeep(localCartMaster);
        // find the updated product seller index
        const sellerIndex = newLocalCartMaster.sellers.findIndex(
          (sellerItem) => {
            return sellerItem.sellerId === sellerId;
          },
        );

        // find the updated product index
        const productIndex = newLocalCartMaster.sellers[
          sellerIndex
        ].products.findIndex((productItem) => {
          return (
            productItem.productId === productId &&
            productItem.warehouseId === warehouseId
          );
        });

        const thisProduct =
          newLocalCartMaster.sellers[sellerIndex].products[productIndex];

        // invert the selected property
        thisProduct.selected = !thisProduct.selected;

        // save data to local state
        setLocalCartMaster(newLocalCartMaster);
      }
    },
    isAnyActiveProduct: () => {
      let result = false;
      if (localCartMaster) {
        for (let i = 0; i < localCartMaster.sellers.length; i++) {
          if (localCartMaster.sellers[i].products.length > 0) {
            result = true;
            break;
          }
        }
      }
      return result;
    },
    manageCheckboxStatus: ({ sellerId }: models.ManageCheckbox) => {
      let result: ICheckbox = 'unselect';
      if (localCartMaster) {
        let countSelected: number = 0;
        let countUnselected: number = 0;
        if (sellerId) {
          // if with seller id, then check the specific seller id only
          const sellerIndex = localCartMaster.sellers.findIndex((item) => {
            return item.sellerId === sellerId;
          });
          localCartMaster.sellers[sellerIndex].products.map((productItem) => {
            if (productItem.selected) {
              countSelected++;
            } else {
              countUnselected++;
            }
          });
        } else {
          // if not with seller id, then check all product in all seller array data
          localCartMaster.sellers.map((sellerItem) => {
            sellerItem.products.map((productItem) => {
              if (productItem.selected) {
                countSelected++;
              } else {
                countUnselected++;
              }
            });
          });
        }
        // determine the return
        if (countSelected !== 0 && countUnselected !== 0) {
          result = 'indeterminate';
        } else if (countSelected === 0) {
          result = 'unselect';
        } else {
          result = 'selected';
        }
      }
      return result;
    },
    manageCheckboxOnPress: ({
      sellerId,
      currentStatus,
    }: models.ManageCheckbox) => {
      const nextStatus = currentStatus === 'selected' ? false : true;
      if (localCartMaster) {
        const newLocalCartMaster = cloneDeep(localCartMaster);
        if (sellerId) {
          // if with seller id, then check the specific seller id only
          const sellerIndex = newLocalCartMaster.sellers.findIndex((item) => {
            return item.sellerId === sellerId;
          });
          newLocalCartMaster.sellers[sellerIndex].products.map(
            (productItem) => {
              productItem.selected = nextStatus;
            },
          );
        } else {
          // if not with seller id, then check all product in all seller array data
          newLocalCartMaster.sellers.map((sellerItem) => {
            sellerItem.products.map((productItem) => {
              productItem.selected = nextStatus;
            });
          });
        }

        // save data to local state
        setLocalCartMaster(newLocalCartMaster);
      }
    },
    calculateProductTotalPrice: () => {
      let countTotalProduct: number = 0;
      let countTotalPrice: number = 0;
      if (localCartMaster) {
        localCartMaster.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            if (productItem.selected) {
              countTotalProduct++;
              // if the product using price rules
              if (productItem.priceRules.length > 0) {
                const priceRulesLastItem =
                  productItem.priceRules[productItem.priceRules.length - 1];
                if (priceRulesLastItem.maxQty <= productItem.qty) {
                  countTotalPrice += priceRulesLastItem.price * productItem.qty;
                } else {
                  productItem.priceRules.map((priceRulesItem) => {
                    if (
                      productItem.qty >= priceRulesItem.minQty &&
                      productItem.qty <= priceRulesItem.maxQty
                    ) {
                      countTotalPrice += priceRulesItem.price * productItem.qty;
                    }
                  });
                }
              } else {
                countTotalPrice += productItem.price * productItem.qty;
              }
            }
          });
        });
      }

      return { countTotalPrice, countTotalProduct };
    },
    removeProduct: ({
      removedProducts,
      source,
    }: models.HandleRemoveProduct) => {
      if (localCartMaster) {
        const updatedData = manageRemoveProduct({
          source,
          removedProducts,
          stateData: localCartMaster,
        });
        // save data to local state
        setLocalCartMaster(updatedData);
      }
    },
    setLocalCartMaster: (newData: models.CartMaster) => {
      setLocalCartMaster(newData);
    },
    mergeCheckProduct: (payload: models.CheckProductResponse[]) => {
      if (localCartMaster) {
        const sellers: models.CartMasterSellers[] = [];
        const unavailable: models.CartMasterUnavailable[] = [];
        /** => replace all getCart product data with checkProduct data */
        for (let i = 0; i < localCartMaster.sellers.length; i++) {
          const products: models.CartMasterSellersProducts[] = [];
          payload.map((item) => {
            if (item.sellerId === localCartMaster.sellers[i].sellerId) {
              const thisProduct = localCartMaster.sellers[i].products.find(
                (innerItem) =>
                  innerItem.productId === item.productId &&
                  innerItem.warehouseId === item.warehouseId,
              );
              if (thisProduct) {
                /** => processing rules:
                 * 1. min qty dari 5 naik ke 10 dan cart qty masih 7 maka qty bakal ke force jadi 10 (ke uncheck)
                 */
                let qty: number = thisProduct.qty;
                let selected: boolean = thisProduct.selected;
                if (item.minQty > thisProduct.qty) {
                  qty = item.minQty;
                  selected = false;
                }

                const productData: models.CartMasterSellersProducts = {
                  ...item,
                  lastUsedPrice: thisProduct.lastUsedPrice,
                  isLastPriceUsedRules: thisProduct.isLastPriceUsedRules,
                  qty,
                  selected,
                  productStatus: item.status,
                  leadTime: thisProduct.leadTime,
                  price: item.finalPrice,
                };
                /** => move product data to unavailable if inactive */
                if (item.status === 'inactive') {
                  unavailable.push({
                    ...productData,
                    unavailableMessage: 'Tidak tersedia di lokasi anda',
                    selected: false,
                  });
                } else {
                  products.push({ ...productData });
                }
              }
            }
          });
          sellers.push({
            ...localCartMaster.sellers[i],
            products,
          });
        }
        return {
          ...localCartMaster,
          sellers: sellers,
          unavailable: unavailable,
        };
      }
    },
    mergeCheckSeller: (
      payload: models.CheckSellerResponse[],
      resultAfterCheckProduct: models.CartMaster | undefined,
    ) => {
      if (resultAfterCheckProduct) {
        const sellers: models.CartMasterSellers[] = [];
        const unavailable: models.CartMasterUnavailable[] = [
          ...resultAfterCheckProduct.unavailable,
        ];
        /** => replace all getCart product data with checkSeller data */
        for (let i = 0; i < resultAfterCheckProduct.sellers.length; i++) {
          const products: models.CartMasterSellersProducts[] = [];
          let sellerId: number = resultAfterCheckProduct.sellers[i].sellerId;
          let sellerName: string =
            resultAfterCheckProduct.sellers[i].sellerName;
          let status: string = '';
          payload.map((item) => {
            if (resultAfterCheckProduct.sellers[i].sellerId === item.sellerId) {
              sellerId = item.sellerId;
              sellerName = item.sellerName;
              status = item.status;
              /** => check if the seller status inactive, then all products data will moved to unavailable */
              if (item.status === 'inactive') {
                resultAfterCheckProduct.sellers[i].products.map((innerItem) => {
                  unavailable.push({
                    ...innerItem,
                    unavailableMessage: 'Supplier nonaktif',
                    selected: false,
                  });
                });
              } else {
                resultAfterCheckProduct.sellers[i].products.map((innerItem) => {
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
          ...resultAfterCheckProduct,
          sellers: sellers,
          unavailable: unavailable,
        };
      }
    },
    mergeCheckStock: (
      payload: models.CheckStockResponse[],
      resultAfterCheckSeller: models.CartMaster | undefined,
    ) => {
      if (resultAfterCheckSeller) {
        const sellers: models.CartMasterSellers[] = [];
        const unavailable: models.CartMasterUnavailable[] = [
          ...resultAfterCheckSeller.unavailable,
        ];
        /** => replace all getCart product data with checkStock data */
        for (let i = 0; i < resultAfterCheckSeller.sellers.length; i++) {
          const products: models.CartMasterSellersProducts[] = [];
          payload.map((item) => {
            const thisProduct = resultAfterCheckSeller.sellers[i].products.find(
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
              if (thisProduct.qty > item.stock) {
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
                  unavailableMessage: 'Tidak tersedia di lokasi anda',
                  selected: false,
                });
              } else if (status === 'stock_not_enough') {
                unavailable.push({
                  ...productData,
                  unavailableMessage: 'Stok kosong',
                  selected: false,
                });
              } else {
                products.push({ ...productData });
              }
            }
          });
          sellers.push({
            ...resultAfterCheckSeller.sellers[i],
            products,
          });
        }
        return {
          ...resultAfterCheckSeller,
          sellers: sellers,
          unavailable: unavailable,
        };
      }
    },
    localCartMaster,
  };
};
/** => oms general failed state */
const useOmsGeneralFailedState = () => {
  const [isOpen, setOpen] = useState(false);
  const [retryAction, setRetryAction] = useState<Function>(() => {});
  const [closeAction, setCloseAction] = useState<Function>(() => {});
  const [errorData, setErrorData] = useState<models.ErrorProps | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    setRetryAction: (value: () => void) => {
      setRetryAction(value);
    },
    setCloseAction: (value: () => void) => {
      setCloseAction(value);
    },
    setErrorData: (value: models.ErrorProps | null) => {
      setErrorData(value);
    },
    setRetryCount: (value: number) => {
      setRetryCount(value);
    },
    isOpen,
    retryAction,
    closeAction,
    errorData,
    retryCount,
  };
};
/** => keyboard focus */
const useKeyboardFocus = () => {
  const [isFocus, setFocus] = useState(false);

  return {
    setFocus: (newValue: boolean) => {
      setFocus(newValue);
    },
    isFocus,
  };
};
/** === EXPORT === */
export {
  useCartExampleAction,
  useGetCartAction,
  useGetTotalCartAction,
  useAddToCartAction,
  useUpdateCartAction,
  useRemoveCartProductAction,
  useCartMasterAction,
  useCheckProductAction,
  usePostCheckProductAction,
  useCheckSellerAction,
  usePostCheckSellerAction,
  useCheckStockAction,
  usePostCheckStockAction,
  useCancelStockAction,
  usePostCancelStockAction,
  useCartBuyerAddressAction,
  useCartLocalData,
  useOmsGeneralFailedState,
  useKeyboardFocus,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 15092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
