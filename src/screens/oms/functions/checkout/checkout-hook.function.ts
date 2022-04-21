/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useContext } from 'react';
/** === FUNCTION === */
/** => checkout action */
const useCheckoutAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartMaster: models.CartMaster,
    ) => {
      if (
        stateCart.postCheckProduct.data !== null &&
        stateCart.postCheckSeller.data !== null &&
        stateCart.postCheckStock.data !== null &&
        stateCart.buyerAddress.data !== null
      ) {
        const buyerAddress = (({
          /** typescript disabled for some line @here
           * because this just to separate the object. */
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          buyerId,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          buyerName,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          buyerCode,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          userFullName,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          userPhoneNumber,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ownerFullName,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ownerPhoneNumber,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ownerId,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          imageId,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          isImageIdOcrValidation,
          ...rest
        }) => rest)(stateCart.buyerAddress.data);

        const cartsTemp: models.CheckoutCartPayload[] = cartMaster.sellers.map(
          (seller) => {
            const products: models.CheckoutProductData[] = seller.products
              .filter((product) => product.selected)
              .map((product) => {
                let priceRules: models.ProductPriceRules | null = null;
                if (product.priceRules.length > 0) {
                  const priceRulesFirstItem = product.priceRules[0];
                  if (product.qty < priceRulesFirstItem.minQty) {
                    priceRules = null;
                  } else {
                    for (let x = 0; x < product.priceRules.length; x++) {
                      const isLast = x === product.priceRules.length - 1;
                      if (!isLast) {
                        if (
                          product.qty >= product.priceRules[x].minQty &&
                          product.qty < product.priceRules[x + 1].minQty
                        ) {
                          priceRules = product.priceRules[x];
                          break;
                        }
                      } else {
                        priceRules = product.priceRules[x];
                      }
                    }
                  }
                }

                const price =
                  priceRules !== null
                    ? priceRules.priceAfterTax
                    : product.priceAfterTax;
                const isLastPriceUsedRules = priceRules !== null ? true : false;

                return {
                  productId: product.productId,
                  externalProductCode: product.externalProductCode || '',
                  warehouseId: product.warehouseId,
                  warehouseName: product.warehouseName,
                  externalWarehouseCode: product.externalWarehouseCode || '',
                  categoryId: product.categoryId,
                  brandId: product.brandId,
                  brandName: product.brandName,
                  productName: product.productName,
                  productImageUrl: product.productImageUrl,
                  qty: product.qty,
                  minQty: product.minQty,
                  multipleQty: product.multipleQty,
                  qtyPerBox: product.qtyPerBox,
                  uomLabel: product.uomLabel,
                  taxPercentage: product.taxPercentage,
                  selected: product.selected,
                  lastUsedPrice: price,
                  isLastPriceUsedRules,
                  leadTime: product.leadTime || 0,
                  priceAfterTax: product.priceAfterTax,
                  priceBeforeTax: product.priceBeforeTax,
                  taxPrice: product.taxPrice,
                  priceRules,
                };
              });
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              sellerAdminId: seller.sellerAdminId,
              sellerAdminName: seller.sellerAdminName,
              sellerAdminEmail: seller.sellerAdminEmail,
              products,
            };
          },
        );

        const carts = cartsTemp.filter((cart) => {
          let isAnyItemSelectedInThisSeller = false;
          cart.products.some((productItem) => {
            if (productItem.selected) {
              isAnyItemSelectedInThisSeller = true;
            }
          });

          return isAnyItemSelectedInThisSeller;
        });

        dispatch(
          Actions.checkoutProcess(contextDispatch, {
            data: {
              buyerAddress,
              buyerName: stateCart.buyerAddress.data.buyerName,
              buyerCode: stateCart.buyerAddress.data.buyerCode,
              userFullName: stateCart.buyerAddress.data.userFullName,
              userPhoneNumber: stateCart.buyerAddress.data.userPhoneNumber,
              ownerFullName: stateCart.buyerAddress.data.ownerFullName,
              ownerPhoneNumber: stateCart.buyerAddress.data.ownerPhoneNumber,
              ownerId: stateCart.buyerAddress.data.ownerId,
              carts,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkoutReset(contextDispatch));
    },
  };
};

const useCheckoutMaster = () => {
  const dataCheckout: models.CheckoutDataMaster = useDataCheckout();
  const dispatch = useDispatch();
  return {
    checkoutMaster: dataCheckout,
    setInvoiceBrand: (data: models.CheckoutDataMaster) => {
      dispatch(Actions.mergeCheckoutInvoiceBrand(data));
    },
    setReserveDiscount: (data: models.ReserveDiscount[]) => {
      dispatch(Actions.mergeReserveDiscountCheckout(data));
    },
    setPaymentChannel: (data: models.PaymentTypeChannel[]) => {
      dispatch(Actions.updatePaymentChannelCheckout(data));
    },
    setPromoPayment: (data: models.PromoPayment[]) => {
      dispatch(Actions.updatePromoPaymentCheckout(data));
    },
    setCartId: (data: models.CartIdPayload) => {
      dispatch(Actions.updateCartIdCheckout(data));
    },
    resetCheckoutMasterData: () => {
      dispatch(Actions.resetCheckoutMasterData());
    },
  };
};
/** => checkout actions */
export const useCheckoutViewActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getCheckoutProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.getCheckoutReset(contextDispatch));
    },
  };
};
/** => master data payment channels modal  */
const usePaymentChannelsData = () => {
  const { paymentType, paymentChannels, invoiceGroupId, totalCartParcel } =
    useSelector((state: any) => state.paymentChannelsModal);
  const dataPaymentChannels: models.IPaymentChannelsModal =
    useDataPaymentChannels();
  const dispatch = useDispatch();

  return {
    getPaymentChannels: dataPaymentChannels,
    setSelectedPaymentType: (data: models.ISelectedPaymentType) => {
      dispatch(Actions.selectedPaymentType(data));
    },
    setPaymentChannels: (data: models.IPaymentChannels[]) => {
      dispatch(Actions.listPaymentChannel(data));
    },
    updateInvoiceGroupId: (id: string) => {
      dispatch(Actions.updataInvoiceGroupId(id));
    },
    updateTotalCartParcel: (value: number) => {
      dispatch(Actions.updataTotalCartParcel(value));
    },
    updatePromoPaymentChannel: (data: models.IPromoPaymentChannel[]) => {
      dispatch(Actions.updatePromoPaymentChannel(data));
    },
    resetPaymentModalMasterData: () => {
      dispatch(Actions.resetPaymentModalMasterData());
    },
    paymentType: paymentType,
    paymentChannels: paymentChannels,
    invoiceGroupId: invoiceGroupId,
    totalCartParcel: totalCartParcel,
  };
};
/** => payment detail accordion */
const usePaymentDetailAccorrdion = () => {
  const [active, setActive] = React.useState<number | null>(null);
  return {
    changeActive: (index: number) => {
      if (index === active) {
        setActive(null);
      } else {
        setActive(index);
      }
    },
    active,
  };
};
/** => terms and conditions modal */
const useTermsAndConditionsModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};
/** => parcel detail modal */
const useParcelDetailModal = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isDetailOpen, setDetailOpen] = React.useState(false);
  const [getParcelData, setParcelData] = React.useState({});
  return {
    isModalOpen,
    isDetailOpen,
    getParcelData,
    setModalOpen: (value: boolean) => setModalOpen(value),
    toggleDetail: () => {
      if (isDetailOpen) {
        setDetailOpen(false);
      } else {
        setDetailOpen(true);
      }
    },
    setParcel: (data: any) => setParcelData(data),
  };
};
/** => payment types modal */
const usePaymentTypeModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
};
/** => payment types modal */
const usePaymentChannelModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
};
const usePaymentAction = () => {
  const dispatch = useDispatch();

  const tCCreate = (
    contextDispatch: any,
    data: models.CreateProcessProps<{}>,
  ) => {
    dispatch(Actions.paymentTCCreateProcess(contextDispatch, data));
  };

  return {
    typeslist: (
      contextDispatch: (action: any) => any,
      invoiceGroupId: string,
      totalCartParcel: number,
      page: number,
    ) => {
      dispatch(
        Actions.paymentTypesListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
          invoiceGroupId,
          totalCartParcel,
          page,
        }),
      );
    },
    channelsList: (
      contextDispatch: (action: any) => any,
      invoiceGroupId: string,
      totalCartParcel: number,
      paymentTypeId: number,
    ) => {
      dispatch(
        Actions.paymentChannelsListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
          page: 1,
          invoiceGroupId,
          totalCartParcel,
          paymentTypeId,
        }),
      );
    },
    tCCreate: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => tCCreate(contextDispatch, data),
    tCDetail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.paymentTCDetailProcess(contextDispatch, { id }));
    },
    lastChannelCreate: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.paymentLastChannelCreateProcess(contextDispatch, data));
    },
    lastChannelDetail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(
        Actions.paymentLastChannelDetailProcess(contextDispatch, { id }),
      );
    },
    resetLastChannel: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentLastChannelCreateReset(contextDispatch));
      dispatch(Actions.paymentLastChannelDetailReset(contextDispatch));
    },
    resetChannelList: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentChannelsListReset(contextDispatch));
    },
    resetTypesList: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.resetPaymentTypesList(contextDispatch));
    },
    resetTCCreate: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentTCCreateReset(contextDispatch));
    },
    resetTCDetail: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentTCDetailReset(contextDispatch));
    },
    invoiceChannelList: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(
        Actions.paymentInvoiceChannelListProcess(contextDispatch, {
          id,
        }),
      );
    },
    resetInvoicChannelList: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.paymentInvoiceChannelListReset(contextDispatch));
    },
  };
};
/** => back to cart modal confirmation */
const useBackToCartModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};

/** => error fetch api */
const useErrorModalBottom = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};

/** => failed fetch state */
const useCheckoutFailedFetchState = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [errorAction, setErrorAction] = React.useState<Function>(() => {});
  const [errorText, setErrorText] = React.useState('');
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    setErrorAction: (value: () => void) => {
      setErrorAction(value);
    },
    setErrorText: (value: string) => {
      setErrorText(value);
    },
    isOpen,
    errorAction,
    errorText,
  };
};

/** => error warning */
const useErrorWarningModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    isOpen,
    setOpen: (value: boolean) => {
      setOpen(value);
    },
  };
};

/** => get TNC content */
const useGetTncContent = () => {
  const dispatch = useDispatch();
  return {
    tncContentGet: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.checkoutTNCProcess(contextDispatch, { id }));
    },
    tncContentReset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.checkoutTNCReset());
    },
  };
};
/** === EXPORT === */
export {
  useCheckoutAction,
  useCheckoutMaster,
  usePaymentDetailAccorrdion,
  useTermsAndConditionsModal,
  useParcelDetailModal,
  usePaymentTypeModal,
  usePaymentChannelModal,
  usePaymentAction,
  usePaymentChannelsData,
  useBackToCartModal,
  useErrorModalBottom,
  useCheckoutFailedFetchState,
  useErrorWarningModal,
  useGetTncContent,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: eryz (team)
 * createDate: 16022022
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
