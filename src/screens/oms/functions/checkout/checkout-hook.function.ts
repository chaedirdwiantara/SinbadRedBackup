/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
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
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
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
