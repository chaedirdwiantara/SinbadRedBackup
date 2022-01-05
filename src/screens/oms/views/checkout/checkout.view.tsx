/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { usePaymentAction } from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutHeader } from './checkout-header.view';
import { ModalPaymentType } from './payment-type-modal.view';
import { ModalPaymentChannels } from './payment-channels-modal.view';
import { ModalParcelDetail } from './parcel-detail-modal.view';
import { ModalProductList } from './product-list-modal.view';
import { ModalTermAndCondition } from './term-and-condition-modal.view';
import { CheckoutBottomView } from './checkout-bottom.view';
import { CheckoutAddressView } from './checkout-address.view';
import { CheckoutInvoiceGroupView } from './checkout-invoice-group.view';
import ModalBottomErrorExpiredTime from './expired-time.modal.view';
import * as models from '@models';
/** === IMPORT EXTERNAL FUNCTION === */
import {
  useCheckoutViewActions,
  useCheckoutMaster,
  usePaymentTypeModal,
  usePaymentChannelModal,
  usePaymentChannelsData,
  useTermsAndConditionsModal,
  useBackToCartModal,
  useErrorModalBottom,
  useCheckoutFailedFetchState,
  useErrorWarningModal,
} from '@screen/oms/functions/checkout/checkout-hook.function';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
import { BackToCartModal } from './checkout-back-to-cart-modal';
import { useDispatch } from 'react-redux';
import * as Actions from '@actions';
import {
  backToCart,
  goToCheckoutSuccess,
  useExpiredTime,
  useCreateOrders,
  useCartCheckedoutActions,
  useModalParcelDetail,
  useModalProductList,
} from '@screen/oms/functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import {
  useCheckPromoPaymentAction,
  useCheckAllPromoPaymentAction,
} from '@screen/promo/functions';
import ModalBottomErrorCheckout from './checkout-error-bottom-modal.view';
import ModalErrorWarning from '@screen/oms/components/modal-error-warning.component';
import { ErrorFetchModal } from './checkout-error-fetch-modal';
import BottomSheetError from '@core/components/BottomSheetError';
import { usePrevious } from '@core/functions/hook/prev-value';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const backToCartModal = useBackToCartModal();
  /** => used for reset voucher */
  const dispatch = useDispatch();
  useCustomBackHardware(() => backToCartModal.setOpen(true));

  /** => this for payment channel modal */
  const checkPromoPaymentAction = useCheckPromoPaymentAction();
  /** => this for last payment channel */
  const checkAllPromoPaymentAction = useCheckAllPromoPaymentAction();

  const checkoutViewActions = useCheckoutViewActions();
  const paymentTypeModal = usePaymentTypeModal();
  const paymentChannelsModal = usePaymentChannelModal();
  const paymentChannelData = usePaymentChannelsData();
  const paymentTCModal = useTermsAndConditionsModal();
  const errorBottomModal = useErrorModalBottom();
  const expiredTime = useExpiredTime();
  const errorFetchModal = useCheckoutFailedFetchState();
  const errorWarningModal = useErrorWarningModal();
  const createOrders = useCreateOrders();
  const cartCheckedoutActions = useCartCheckedoutActions();
  const modalParcelDetail = useModalParcelDetail();
  const modalProductList = useModalProductList();
  const {
    stateCheckout: {
      checkout: {
        data: checkoutData,
        loading: checkoutLoading,
        error: checkoutError,
      },
    },
    dispatchCheckout,
  } = useCheckoutContext();
  const { dispatchShopingCart } = useShopingCartContext();
  const {
    setInvoiceBrand,
    checkoutMaster,
    setReserveDiscount,
    setPaymentChannel,
    setPromoPayment,
    resetCheckoutMasterData,
  } = useCheckoutMaster();
  const paymentAction = usePaymentAction();
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );
  const {
    paymentChannelsList,
    paymentLastChannelDetail,
    paymentTypesList,
    paymentTCCreate,
    paymentTCDetail,
  } = statePayment;
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const { stateCheckout } = React.useContext(contexts.CheckoutContext);
  const [isExpiredSession, setExpiredSession] = useState(false);
  const [modalErrorCheckout, setModalErrorCheckout] = useState(false);

  /** Set Loading Page */
  useEffect(() => {
    checkoutViewActions.fetch(dispatchCheckout);

    return () => {
      /** => reset get checkout data */
      checkoutViewActions.reset(dispatchCheckout);
      /** => reset checkout master data */
      resetCheckoutMasterData();
      /** => reset local voucher data */
      dispatch(Actions.saveSelectedVouchers(null));
      /** => reset check-all-promo-payment context data */
      checkAllPromoPaymentAction.reset(dispatchPromo);
      /** => reset payment last channel context data */
      paymentAction.resetLastChannel(dispatchPayment);
      /** => reset payment types list context data */
      paymentAction.resetTypesList(dispatchPayment);
      /** => reset list invoice channels */
      paymentAction.resetInvoicChannelList(dispatchPayment);
      /** => reset create orders */
      createOrders.reset(dispatchCheckout);
    };
  }, []);

  /** Error Handler */
  const [errorCreateOrders, setErrorCreateOrders] = React.useState(false);
  const prevDataErrorCreateOrders = usePrevious(stateCheckout.create.error);
  React.useEffect(() => {
    /** Error Handling Create Orders */
    if (
      stateCheckout.create.error !== null &&
      prevDataErrorCreateOrders === null
    ) {
      setErrorCreateOrders(true);
    }
  }, [stateCheckout.create.error]);
  /** Payment Modal */
  useEffect(() => {
    if (
      paymentTypesList.error ||
      paymentChannelsList.error ||
      paymentTCCreate.error ||
      paymentTCDetail.error
    ) {
      paymentTypeModal.setOpen(false);
      paymentChannelsModal.setOpen(false);
      paymentTCModal.setOpen(false);
      errorBottomModal.setOpen(true);
    }
  }, [
    paymentTypesList.error,
    paymentChannelsList.error,
    paymentTCCreate.error,
    paymentTCDetail.error,
  ]);
  useEffect(() => {
    if (checkoutData) {
      setInvoiceBrand(checkoutData);
    }
  }, [checkoutData]);

  useEffect(() => {
    /** => merge data reserve */
    if (
      Array.isArray(checkoutMaster.invoices) &&
      checkoutMaster.invoices.length > 0 &&
      statePromo.reserveDiscount.detail.data !== null
    ) {
      setReserveDiscount(statePromo.reserveDiscount.detail.data.promoMatch);
    }
  }, [checkoutMaster.invoices.length]);

  useEffect(() => {
    if (checkoutError !== null) {
      setModalErrorCheckout(true);
    }
  }, [checkoutError]);
  /** for post last payment channel */
  React.useEffect(() => {
    const invoices = checkoutMaster.invoices;

    if (invoices.length > 0 && !paymentLastChannelDetail.data) {
      const cartParcels: models.ILastChannelCreateProps[] = invoices.map(
        (item) => {
          return {
            invoiceGroupId: item.invoiceGroupId,
            totalCartParcel:
              item.totalPriceAfterTax - (item?.totalPromoSellerAndVoucher ?? 0),
          };
        },
      );
      const dataLastChannel = {
        data: {
          cartParcels,
        },
      };

      paymentAction.lastChannelCreate(dispatchPayment, dataLastChannel);
    }
  }, [checkoutMaster.invoices.length]);
  /** => Create orders if there is no payment TC */
  useEffect(() => {
    const detailTC = statePayment?.paymentTCDetail?.data;
    if (detailTC) {
      if (detailTC?.paymentTypes && detailTC?.paymentChannels) {
        paymentTCModal.setOpen(true);
      } else {
        cartCheckedoutActions.fetch(dispatchShopingCart);
        createOrders.create(dispatchCheckout);
      }
    }
  }, [statePayment?.paymentTCDetail?.data]);
  /** => navigate to Checkout Success if Create Orders Success */
  useEffect(() => {
    const data = stateCheckout.create.data;
    if (data !== null) {
      goToCheckoutSuccess();
    }
  }, [stateCheckout.create.data]);
  /** => get payment terms and conditions detail on success post TC  */
  React.useEffect(() => {
    const dataTC = statePayment?.paymentTCCreate?.data;
    if (dataTC) {
      paymentAction.tCDetail(dispatchPayment, dataTC.id);
    }
  }, [statePayment?.paymentTCCreate.data]);
  /** => get mongo data last type channels */
  React.useEffect(() => {
    const lastChannelId = statePayment?.paymentLastChannelCreate?.data?.id;
    if (lastChannelId) {
      paymentAction.lastChannelDetail(dispatchPayment, lastChannelId);
    }
  }, [statePayment.paymentLastChannelCreate]);
  /** => insert data payment channel to payment channel modal master */
  useEffect(() => {
    if (paymentChannelsList) {
      paymentChannelData.setPaymentChannels(paymentChannelsList.data);
    }
  }, [paymentChannelsList]);
  /** => insert data last payment channel to checkout master */
  useEffect(() => {
    const dataLastPaymentChannel =
      paymentLastChannelDetail?.data?.paymentTypeChannels;

    if (dataLastPaymentChannel) {
      dataLastPaymentChannel.map((item: any) =>
        paymentAction.invoiceChannelList(dispatchPayment, item.invoiceGroupId),
      );

      setPaymentChannel(dataLastPaymentChannel);

      // paymentAction.invoiceChannelList(dataLastPaymentChannel)
      /** => fetch promo payment channel */
      const checkAllPromoPaymentParams = dataLastPaymentChannel.map(
        (item: any) => {
          return {
            invoiceGroupId: item.invoiceGroupId,
            paymentTypeId: item.paymentType.id,
            paymentChannelId: item.paymentChannel.id,
            parcelPrice: item.totalPayment - item.totalFee,
          };
        },
      );
      checkAllPromoPaymentAction.create(
        dispatchPromo,
        checkAllPromoPaymentParams,
      );
    }
  }, [paymentLastChannelDetail]);
  /** => post promo payment that match last payment channel */
  useEffect(() => {
    if (statePromo.checkAllPromoPayment.create.data !== null) {
      checkAllPromoPaymentAction.list(
        dispatchPromo,
        statePromo.checkAllPromoPayment.create.data.id,
      );
    }
  }, [statePromo.checkAllPromoPayment.create]);

  /** => post promo payment that match last payment channel */
  useEffect(() => {
    if (statePromo.checkAllPromoPayment.list.data.length > 0) {
      const promoPaymentLastChannel =
        statePromo.checkAllPromoPayment.list.data.map((item) => {
          return {
            invoiceGroupId: item.invoiceGroupId,
            totalPromoPayment: item.promoPaymentAmount,
          };
        });
      setPromoPayment(promoPaymentLastChannel);
    }
  }, [statePromo.checkAllPromoPayment.list]);
  /** => get promo payment list that match payment channel list */
  useEffect(() => {
    if (
      paymentChannelData.paymentChannels.length > 0 &&
      statePromo.checkPromoPayment.list.data.length === 0
    ) {
      const paymentChannelId: Array<number> = [];
      paymentChannelData.paymentChannels.map(
        (paymentChannel: models.IPaymentChannels) => {
          paymentChannel.type.map((paymentChannelType) => {
            paymentChannelId.push(paymentChannelType.id);
          });
        },
      );
      const checkPromoPaymentParams = {
        paymentTypeId: paymentChannelData.paymentType.id,
        paymentChannelId,
        parcelPrice: paymentChannelData.totalCartParcel,
        invoiceGroupId: paymentChannelData.invoiceGroupId,
      };
      /** => fetch promo payment */
      checkPromoPaymentAction.list(dispatchPromo, checkPromoPaymentParams);
    }
  }, [paymentChannelData.paymentChannels]);
  /** => insert data promo payment to channel modal master */
  useEffect(() => {
    if (statePromo.checkPromoPayment.list.data.length > 0) {
      const payload = statePromo.checkPromoPayment.list.data.map((item) => {
        return {
          paymentChannelId: item.paymentChannelId,
          promPaymentDescription: item.promoPaymentDescription,
          promoPaymentAmount: item.promoPaymentAmount,
          promoPaymentAvailable: item.promoPaymentAvailable,
        };
      });
      paymentChannelData.updatePromoPaymentChannel(payload);
    }
    // if error
    if (statePromo.checkPromoPayment.list.error !== null) {
      const action = () => {
        const paymentChannelId: Array<number> = [];
        paymentChannelData.paymentChannels.map(
          (item: models.IPaymentChannels) => {
            paymentChannelId.push(item.id);
          },
        );
        const checkPromoPaymentParams = {
          paymentTypeId: paymentChannelData.paymentType.id,
          paymentChannelId,
          parcelPrice: paymentChannelData.totalCartParcel,
          invoiceGroupId: paymentChannelData.invoiceGroupId,
        };
        checkPromoPaymentAction.list(dispatchPromo, checkPromoPaymentParams);
      };
      errorFetchModal.setOpen(true);
      errorFetchModal.setErrorAction(() => action);
      errorFetchModal.setErrorText('Ulangi');
    }
  }, [statePromo.checkPromoPayment.list]);

  /** => function after select payment type */
  const selectedPaymentType = (item: any) => {
    const invoiceGroupId = paymentChannelData?.invoiceGroupId;
    const totalCartParcel = paymentChannelData?.totalCartParcel;
    const paymentTypeId = item?.id;
    paymentTypeModal.setOpen(false);
    paymentChannelsModal.setOpen(true);
    if (invoiceGroupId && paymentTypeId) {
      paymentAction.channelsList(
        dispatchPayment,
        invoiceGroupId,
        totalCartParcel,
        paymentTypeId,
      );
    }
  };
  /** => for close payment channel modal */
  const closePaymentChannel = () => {
    paymentChannelsModal.setOpen(false);
    /** => reset payment channel list context data */
    paymentAction.resetChannelList(dispatchPayment);
    /** => reset check-promo-payment context data */
    checkPromoPaymentAction.reset(dispatchPromo);
    /** => reset payment modal master data (payment channel) */
    paymentChannelData.resetPaymentModalMasterData();
  };
  /** for back from payment channel modal */
  const backModalPaymentChannel = () => {
    closePaymentChannel();
    paymentTypeModal.setOpen(true);
  };
  /** handle back to cart */
  const handleBackToCart = () => {
    createOrders.reset(dispatchCheckout);
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
    checkoutViewActions.reset(dispatchCheckout);
    setModalErrorCheckout(false);
    backToCartModal.setOpen(false);
    expiredTime.setOpen(false);
    backToCart();
  };
  /** close modal terms and condition */
  const closeModalTC = () => {
    paymentTCModal.setOpen(false);
    paymentAction.resetTCCreate(dispatchPayment);
    paymentAction.resetTCDetail(dispatchPayment);
  };

  const handleParcelDetail = (data: models.IInvoiceCheckout | null) => {
    modalParcelDetail.setData(data);
  };

  const handleProductList = (data: models.ProductCheckout[] | null) => {
    modalProductList.setData(data);
  };

  const handleCheckExpiredSession = () => {
    if (!expiredTime.check()) {
      return false;
    } else {
      setExpiredSession(true);
      return true;
    }
  };

  /** === VIEW === */
  const ModalErrorCreateOrders = () => {
    return (
      <BottomSheetError
        open={errorCreateOrders}
        error={stateCheckout.create.error}
        closeAction={() => handleBackToCart()}
      />
    );
  };

  const ModalInvoiceParcelDetail = () => {
    return (
      <ModalParcelDetail
        isOpen={modalParcelDetail.isOpen}
        close={() => {
          modalParcelDetail.setData(null);
        }}
        data={modalParcelDetail.data}
      />
    );
  };

  const renderModalProductList = () => {
    return (
      <ModalProductList
        isOpen={modalProductList.isOpen}
        close={() => {
          modalProductList.setData(null);
        }}
        data={modalProductList.data}
      />
    );
  };

  return (
    <SnbContainer color="grey">
      <CheckoutHeader
        backAction={() => {
          backToCartModal.setOpen(true);
        }}
      />
      {checkoutLoading ? (
        <LoadingPage />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CheckoutAddressView />
            {Array.isArray(checkoutMaster.invoices) &&
              checkoutMaster.invoices.length > 0 &&
              checkoutMaster.invoices.map((invoiceGroup, index) => (
                <CheckoutInvoiceGroupView
                  key={invoiceGroup.invoiceGroupId}
                  data={invoiceGroup}
                  openModalPaymentType={() => paymentTypeModal.setOpen(true)}
                  openModalParcelDetail={handleParcelDetail}
                  openModalProductList={handleProductList}
                  index={index}
                />
              ))}
          </ScrollView>
          <CheckoutBottomView
            data={checkoutMaster.invoices}
            openTCModal={() => paymentTCModal.setOpen(true)}
            openErrorWarning={() => errorWarningModal.setOpen(true)}
            closeErrorWarning={() => errorWarningModal.setOpen(false)}
            checkExpiredTime={handleCheckExpiredSession}
          />
          <ModalPaymentType
            isOpen={paymentTypeModal.isOpen}
            close={paymentTypeModal.close}
            openModalPaymentChannels={selectedPaymentType}
          />
          <ModalPaymentChannels
            isOpen={paymentChannelsModal.isOpen && !errorFetchModal.isOpen}
            back={backModalPaymentChannel}
            close={closePaymentChannel}
          />

          <ModalTermAndCondition
            isOpen={paymentTCModal.isOpen}
            close={() => closeModalTC()}
          />
          <ModalErrorWarning
            open={errorWarningModal.isOpen}
            content={'Anda belum memilih metode pembayaran'}
          />
          <BackToCartModal
            isOpen={backToCartModal.isOpen}
            handleNoAction={() => {
              backToCartModal.setOpen(false);
            }}
            handleOkAction={handleBackToCart}
          />
          <ModalBottomErrorCheckout
            isOpen={errorBottomModal.isOpen}
            close={() => errorBottomModal.setOpen(false)}
          />
          <ErrorFetchModal
            visible={errorFetchModal.isOpen}
            onPress={() => {
              errorFetchModal.setOpen(false);
              errorFetchModal.errorAction();
            }}
            buttonText={errorFetchModal.errorText}
          />
          <ModalBottomErrorExpiredTime
            isOpen={isExpiredSession}
            close={handleBackToCart}
          />
          <BottomSheetError
            open={modalErrorCheckout}
            error={checkoutError}
            closeAction={handleBackToCart}
          />
          {ModalErrorCreateOrders()}
          {ModalInvoiceParcelDetail()}
          {renderModalProductList()}
        </>
      )}
    </SnbContainer>
  );
};

export default OmsCheckoutView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 10092021
 * updatedBy: Maulana Ghozi (pyramid)
 * updatedDate: 25112021
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
