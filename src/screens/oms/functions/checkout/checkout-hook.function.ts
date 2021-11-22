/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useDataCheckout } from '@core/redux/Data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => master data checkout */
const useCheckoutMaster = () => {
  const dataCheckout = useDataCheckout();
  const dispatch = useDispatch();
  return {
    getCheckoutMaster: dataCheckout,
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
      dispatch(Actions.updatePromoPayementCheckout(data));
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
