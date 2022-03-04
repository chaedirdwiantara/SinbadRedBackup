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
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.UpdateCartPayload,
    ) => {
      dispatch(Actions.updateCartProcess(contextDispatch, { data }));
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
          }
        } else if (type === 'decrease') {
          if (thisProduct.qty - updateValue >= thisProduct.minQty) {
            thisProduct.qty -= updateValue;
          }
        } else {
          // if the user update qty using keyboard
          if (newQty && Number.isInteger(newQty)) {
            if (newQty <= stock && newQty >= thisProduct.minQty) {
              thisProduct.qty = newQty;
            } else if (newQty < thisProduct.minQty) {
              thisProduct.qty = thisProduct.minQty;
            } else if (newQty > stock) {
              thisProduct.qty = stock;
            }
          } else if (Number(newQty) === 0) {
            thisProduct.qty = thisProduct.minQty;
          }
        }

        // set the product to become selected
        thisProduct.selected = true;

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
  useCartBuyerAddressAction,
  useCartLocalData,
  useOmsGeneralFailedState,
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
