/** === IMPORT PACKAGE HERE === */
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { manageRemoveProduct } from './cart.function';
/** === FUNCTION === */
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
      if (cartData.totalProducts !== 0) {
        const newCartData = cloneDeep(cartData);
        if (stateCart.buyerAddress.data !== null) {
          const carts: models.CartMasterSellers[] = [...newCartData.sellers];
          cartData.unavailable.map((product) => {
            const sellerFound = cartData.sellers.find(
              (seller) => seller.sellerId === product.sellerId,
            );

            if (sellerFound) {
              const indexCartFound = carts.findIndex(
                (cart) => cart.sellerId === sellerFound.sellerId,
              );

              if (indexCartFound !== -1) {
                const isProductAlreadyExist = carts[
                  indexCartFound
                ].products.some((prod) => prod.productId === product.productId);
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
            // deleting unused attributes for carts
            delete sellerItem.sellerAdminId;
            delete sellerItem.sellerAdminName;
            delete sellerItem.sellerAdminEmail;
            delete sellerItem.status;

            sellerItem.products.map((productItem) => {
              // deleting unused attributes for carts
              delete productItem.externalProductCode;
              delete productItem.externalWarehouseCode;
              delete productItem.stock;
              delete productItem.isStockAvailable;
              delete productItem.productStatus;
              delete productItem.warehouseName;
              delete productItem.brandId;
              delete productItem.brandName;
              delete productItem.leadTime;
              delete productItem.isQtyChanged;

              if (productItem.priceRules.length > 0) {
                const priceRulesFirstItem = productItem.priceRules[0];
                if (productItem.qty < priceRulesFirstItem.minQty) {
                  productItem.isLastPriceUsedRules = false;
                  productItem.lastUsedPrice = productItem.priceAfterTax;
                } else {
                  for (let x = 0; x < productItem.priceRules.length; x++) {
                    const isLast = x === productItem.priceRules.length - 1;
                    if (!isLast) {
                      if (
                        productItem.qty >= productItem.priceRules[x].minQty &&
                        productItem.qty < productItem.priceRules[x + 1].minQty
                      ) {
                        productItem.isLastPriceUsedRules = true;
                        productItem.lastUsedPrice =
                          productItem.priceRules[x].priceAfterTax;
                        break;
                      }
                    } else {
                      productItem.isLastPriceUsedRules = true;
                      productItem.lastUsedPrice =
                        productItem.priceRules[x].priceAfterTax;
                    }
                  }
                }
              } else {
                productItem.isLastPriceUsedRules = false;
                productItem.lastUsedPrice = productItem.priceAfterTax;
              }
            });
          });

          dispatch(
            Actions.updateCartProcess(contextDispatch, {
              data: {
                id: cartData.id,
                carts,
              },
            }),
          );
        }
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
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartData: models.CartMaster,
    ) => {
      if (cartData?.sellers !== null) {
        // format payload from redux master
        const data: models.CheckProductPayloadCarts[] = [];
        cartData.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            if (productItem.selected) {
              data.push({
                productId: productItem.productId,
                warehouseId: productItem.warehouseId,
              });
            }
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
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartData: models.CartMaster,
    ) => {
      if (cartData?.sellers !== null) {
        // format payload from redux master
        const data: number[] = [];
        cartData.sellers.map((sellerItem) => {
          let isAnyItemSelectedInThisSeller = false;
          sellerItem.products.map((productItem) => {
            if (productItem.selected) {
              isAnyItemSelectedInThisSeller = true;
            }
          });

          if (isAnyItemSelectedInThisSeller) {
            data.push(sellerItem.sellerId);
          }
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
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartData: models.CartMaster,
    ) => {
      if (cartData?.sellers !== null) {
        // format payload from redux master
        const data: models.CheckStockPayloadCarts[] = [];
        cartData.sellers.map((sellerItem) => {
          sellerItem.products.map((productItem) => {
            if (productItem.selected) {
              data.push({
                productId: productItem.productId,
                warehouseId: productItem.warehouseId,
                qty: productItem.qty,
              });
            }
          });
        });
        dispatch(
          Actions.postCheckStockProcess(contextDispatch, {
            data: {
              cartId: cartData.id,
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
  const [initialCartData, setInitialCartData] = useState<models.CartMaster>();
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

        thisProduct.isQtyChanged = true;

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
                const priceRulesFirstItem = productItem.priceRules[0];
                if (productItem.qty < priceRulesFirstItem.minQty) {
                  countTotalPrice +=
                    productItem.priceAfterTax * productItem.qty;
                } else {
                  for (let x = 0; x < productItem.priceRules.length; x++) {
                    const isLast = x === productItem.priceRules.length - 1;
                    if (!isLast) {
                      if (
                        productItem.qty >= productItem.priceRules[x].minQty &&
                        productItem.qty < productItem.priceRules[x + 1].minQty
                      ) {
                        countTotalPrice +=
                          productItem.priceRules[x].priceAfterTax *
                          productItem.qty;
                        break;
                      }
                    } else {
                      countTotalPrice +=
                        productItem.priceRules[x].priceAfterTax *
                        productItem.qty;
                    }
                  }
                }
              } else {
                countTotalPrice += productItem.priceAfterTax * productItem.qty;
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
                  isQtyChanged: false,
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
          let sellerAdminId,
            sellerAdminName,
            sellerAdminEmail,
            status = '';
          payload.map((item) => {
            if (resultAfterCheckProduct.sellers[i].sellerId === item.sellerId) {
              sellerId = item.sellerId;
              sellerName = item.sellerName;
              sellerAdminId = item.sellerAdminId;
              sellerAdminName = item.sellerAdminName;
              sellerAdminEmail = item.sellerAdminEmail;
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
            sellerAdminId,
            sellerAdminName,
            sellerAdminEmail,
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
              if (thisProduct.qty > item.stock) {
                qty = item.stock <= 0 ? thisProduct.qty : item.stock;
                selected = false;
              }

              let updatedQty: number = qty;

              if (thisProduct.multipleQty > 1) {
                const isStockValid =
                  (qty - thisProduct.minQty) % thisProduct.multipleQty === 0;
                if (isStockValid) {
                  updatedQty = qty;
                } else {
                  const modValue =
                    (qty - thisProduct.minQty) % thisProduct.multipleQty;
                  updatedQty = qty - modValue;
                }
              }

              const productData: models.CartMasterSellersProducts = {
                ...thisProduct,
                lastUsedPrice: thisProduct.lastUsedPrice,
                isLastPriceUsedRules: thisProduct.isLastPriceUsedRules,
                qty: updatedQty,
                selected,
                stock: item.stock,
                isStockAvailable: item.isAvailable,
                warehouseName: item.warehouseName,
                leadTime: item.leadTime,
                externalWarehouseCode: item.externalWarehouseCode,
              };
              /** => move product data to unavailable if not_available */
              if (thisProduct.minQty > item.stock) {
                unavailable.push({
                  ...productData,
                  unavailableMessage: 'Stok kosong',
                  selected: false,
                });
              } else if (!item.isAvailable) {
                unavailable.push({
                  ...productData,
                  unavailableMessage: 'Tidak tersedia di lokasi anda',
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
    setInitialLocalData: (params: models.CartMaster) => {
      setLocalCartMaster(params);
      setInitialCartData(params);
    },
    localCartMaster,
    initialCartData,
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
  useGetCartAction,
  useGetTotalCartAction,
  useAddToCartAction,
  useUpdateCartAction,
  useRemoveCartProductAction,
  useCheckProductAction,
  usePostCheckProductAction,
  useCheckSellerAction,
  usePostCheckSellerAction,
  useCheckStockAction,
  usePostCheckStockAction,
  useCancelStockAction,
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
