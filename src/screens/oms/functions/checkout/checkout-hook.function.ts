/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataCheckout, useDataPaymentChannels } from '@core/redux/Data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => master data checkout */
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
      contextDispatch(Actions.getCheckoutReset);
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
    paymentType: paymentType,
    paymentChannels: paymentChannels,
    invoiceGroupId: invoiceGroupId,
    totalCartParcel: totalCartParcel,
  };
};
/** => promo general action */
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
  return {
    setModalOpen: (value: boolean) => {
      setModalOpen(value);
    },
    toggleDetail: () => {
      if (isDetailOpen) {
        setDetailOpen(false);
      } else {
        setDetailOpen(true);
      }
    },
    isModalOpen,
    isDetailOpen,
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
    ) => {
      dispatch(Actions.paymentTCCreateProcess(contextDispatch, data));
    },
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

/** === EXPORT === */
export {
  useCheckoutMaster,
  usePaymentDetailAccorrdion,
  useTermsAndConditionsModal,
  useParcelDetailModal,
  usePaymentTypeModal,
  usePaymentChannelModal,
  usePaymentAction,
  usePaymentChannelsData,
  useBackToCartModal,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 07102021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
