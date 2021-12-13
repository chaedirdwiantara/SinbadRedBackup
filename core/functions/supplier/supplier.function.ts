/** === IMPORT PACKAGES === */
import { useState } from 'react';
/** === IMPORT TYPES === */
export interface MerchantStatus {
  sinbadStatus: 'verified' | 'rejected' | 'updating' | 'pending' | 'guest';
  supplierStatus:
    | 'verified'
    | 'rejected'
    | 'updating'
    | 'pending'
    | 'guest'
    | null;
}

export interface DataMerchant {
  type: 'close' | 'sendDataToSupplier';
  onSendDataSupplier?: () => void;
}

export const useCheckDataSupplier = () => {
  /** => state */
  const [modalWaitingApproval, setModalWaitingApproval] = useState(false);
  const [modalRejectApproval, setModalRejectApproval] = useState(false);
  const [modalRegisterSupplier, setModalRegisterSupplier] = useState(false);

  /** => parentFunction */
  const onFunctionActions = (data: DataMerchant) => {
    switch (data.type) {
      case 'close':
        setModalWaitingApproval(false);
        setModalRejectApproval(false);
        setModalRegisterSupplier(false);
        break;
      case 'sendDataToSupplier':
        //hit endpoint
        if (data.onSendDataSupplier) {
          data.onSendDataSupplier();
        }
        break;
      default:
        break;
    }
  };

  const checkUser = (data: MerchantStatus) => {
    const { sinbadStatus, supplierStatus } = data;

    switch (sinbadStatus) {
      case 'verified':
        userVerified(supplierStatus);
        break;
      case 'rejected':
        userRejected();
        break;
      case 'updating':
        userUpdating(supplierStatus);
        break;
      case 'pending':
        userPending(supplierStatus);
        break;
      case 'guest':
        userGuest(supplierStatus);
        break;
      default:
        break;
    }
  };

  /** CHECK USER MATRIX*/
  /** STATUS VERIFIED */
  const userVerified = (supplier: string | null) => {
    if (supplier === 'guest' || supplier == null) {
      showSendData();
    } else {
      //addSkuToCartAfterCheckVerified
      onFunctionActions({ type: 'close' });
    }
  };
  /** STATUS REJECTED */
  const userRejected = () => {
    showRejected();
  };
  /** STATUS UPDATING */
  const userUpdating = (supplier: string | null) => {
    if (supplier == null) {
      showSendData();
    } else if (supplier === 'guest' || supplier === 'verified') {
      showUnverified();
    } else {
      //addSkuToCartAfterCheckVerified
      onFunctionActions({ type: 'close' });
    }
  };
  /** STATUS PENDING */
  const userPending = (supplier: string | null) => {
    if (supplier == null) {
      showSendData();
    } else {
      showUnverified();
    }
  };
  /** STATUS GUEST */
  const userGuest = (supplier: string | null) => {
    if (supplier == null) {
      showSendData();
    } else {
      showUnverified();
    }
  };

  /** CHANGE MODAL STATE STATUS */
  const showUnverified = () => {
    //close Open Order
    setModalWaitingApproval(true);
  };
  const showRejected = () => {
    //close Open Order
    setModalRejectApproval(true);
  };
  const showSendData = () => {
    //close Open Order
    setModalRegisterSupplier(true);
  };

  return {
    modalRejectApproval,
    modalWaitingApproval,
    modalRegisterSupplier,
    onFunctionActions,
    checkUser,
  };
};
