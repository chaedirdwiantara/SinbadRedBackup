/** === IMPORT PACKAGES === */
import { useState } from 'react';
/** === IMPORT TYPES === */

export interface MerchantStatus {
  sinbadStatus: 'verified' | 'rejected' | 'updating' | 'pending' | 'guest';
  supplierStatus: 'verified' | 'rejected' | 'updating' | 'pending' | 'guest';
}

export interface DataMerchant {
  type: 'close' | 'sendDataToSupplier' | 'goToProfile';
}

export const useCheckDataSupplier = () => {
  /** => state */
  const [modalUserUnverified, setModalUserUnverified] = useState(false);
  const [modalUserRejected, setModalUserRejected] = useState(false);
  const [modalUserSendData, setModalUserSendData] = useState(false);
  const [modalCheckDataSupplier, setModalCheckDataSupplier] = useState(false);

  /** => parentFunction */
  const parentFunction = (data: DataMerchant) => {
    switch (data.type) {
      case 'close':
        //
        break;
      case 'sendDataToSupplier':
        //
        break;
      case 'goToProfile':
        //
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
        userPending();
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
  const userVerified = (supplier: string) => {
    if (supplier === 'guest') {
      showSendData();
    } else {
      //addSkuToCartAfterCheckVerified
    }
  };
  /** STATUS REJECTED */
  const userRejected = () => {
    showRejected();
  };
  /** STATUS UPDATING */
  const userUpdating = (supplier: string) => {
    if (supplier === 'guest' || supplier === 'verified') {
      showUnverified();
    } else {
      //addSkuToCartAfterCheckVerified
    }
  };
  /** STATUS PENDING */
  const userPending = () => {
    showUnverified();
  };
  /** STATUS GUEST */
  const userGuest = (supplier: string) => {
    if (supplier !== 'pending') {
      showUnverified();
    }
  };

  /** CHANGE MODAL STATE STATUS */
  const showUnverified = () => {
    //close Open Order
    setModalUserUnverified(true);
    setModalCheckDataSupplier(true);
  };
  const showRejected = () => {
    //close Open Order
    setModalUserRejected(true);
    setModalCheckDataSupplier(true);
  };
  const showSendData = () => {
    //close Open Order
    setModalUserSendData(true);
    setModalCheckDataSupplier(true);
  };

  return {
    modalUserRejected,
    modalUserUnverified,
    modalUserSendData,
    modalCheckDataSupplier,
    parentFunction,
    checkUser,
  };
};
