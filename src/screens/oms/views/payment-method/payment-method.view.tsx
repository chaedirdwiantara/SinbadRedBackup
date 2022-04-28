/** === IMPORT PACKAGE HERE ===  */
import { LogBox } from 'react-native';
import React, { FC, useEffect, useState, useContext, useRef } from 'react';
import { SnbContainer } from '@sinbad/react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL COMPONENT === */
import { PaymentMethodHeader } from './payment-method-header.view';
import { PaymentMethodBottom } from './payment-method-bottom.view';
import { goToCheckout, goToThankYouPage } from '@screen/oms/functions';
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import {
  usePaymentMethodListContent,
  usePaymentMethodCreateOrder,
  usePaymentMethodSubRtdb,
  usePaymentMethodCommitCart,
} from '@screen/oms/functions/payment-method/payment-method-hook.function';
import PaymentMethodBody from './payment-method-body.view';
import PaymentMethodExpiredTimeModal from './payment-method-expired-time.modal.view';
import { goToShoppingCart } from '@core/functions/product';
import { useUpdateCartAction, useCheckoutAction } from '../../functions';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';
import { PaymentStatusModal } from './payment-method-payment-status.modal.view';
import PaymentMethodErrorModal from './payment-method-error-modal.view';
import * as models from '@models';
import { LoadingPage } from '@core/components/Loading';
import {
  useThankYouPageAction,
  useThankYouPageCancelOrderAction,
} from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
import { goBack } from '@screen/quest/function';
import { findIsSelected } from '@screen/oms/functions/payment-method/payment-method.function';

interface PaymentMethodInterface {
  props: {};
  route: any;
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = (props) => {
  /** => ACTION */
  LogBox.ignoreAllLogs();
  const { stateThankYouPage } = useContext(contexts.ThankYouPageContext);
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();
  const paymentMethodCreateOrder = usePaymentMethodCreateOrder();
  const paymentMethodCommitCart = usePaymentMethodCommitCart();
  const PaymentMethodSubRtdb = usePaymentMethodSubRtdb();
  const thankYouPageCancelOrderAction = useThankYouPageCancelOrderAction();
  const thankYouPageAction = useThankYouPageAction();
  const {
    stateThankYouPage: {
      detail: { data: thankYouPageData },
    },
    dispatchThankYouPage,
  } = useThankYouPageContext();
  /** => Hooks */
  const [selectMethod, setSelectMethod] = useState<string | null>(null); //handle selected method
  const [selectedPaymentMethodData, setSelectedPaymentMethodData] =
    useState<models.PaymentMethod | null>(null);
  const [isExpiredSession, setExpiredSession] = useState(false); //handle expired time
  const [isPaymentStatusSession, setPaymentStatusSession] = useState(false); //handle payment status
  const [isErrorSession, setErrorSession] = useState(false); //handle error modal
  const [getOrderStatus, setGetOrderStatus] = useState(false); //handle order status
  const [dataOrder, setDataOrder] = useState<any>(null); //handle order status
  const [handleStatusPayment, setHandleStatusPayment] = useState<any>(false); //handle order status
  const [isLoading, setLoading] = useState(false);
  const [createTheOrder, setCreateTheOrder] = useState(false);
  const [hitOrderDetail, setHitOrderDetail] = useState(true);
  const [isSelected, setIsSelected] = useState<models.PaymentMethod | any>([]);

  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const checkoutContextData = stateCheckout.checkout.data;
  /** => Get payment method  */
  const { statePaymentMethod } = useContext(contexts.PaymentMethodContext); //get id to sub rtdb

  const {
    statePaymentMethod: {
      paymentMethod: { data: paymentMethodData, loading: paymentMethodLoading },
    },
    dispatchPaymentMethod,
  } = usePaymentMethodContext();

  /** => data from checkout */
  const dataCheckout = props.route.params.data;

  /** => handle payment method */
  const payloadPaymentMethod: any = {
    amount: dataCheckout?.totalPaymentNumber,
    page: 1,
    perPage: 10,
    keyword: '',
    sort: 'desc',
    sortBy: '',
  };
  const getPaymentMethodListContent = usePaymentMethodListContent();
  const handlePaymentMethodList = () => {
    getPaymentMethodListContent.paymentMethodListContentGet(
      dispatchPaymentMethod,
      payloadPaymentMethod,
    );
  };

  let intervalCheckStatus = useRef<any>(null);

  const data = paymentMethodData;

  /** => set expired time  */
  const dateCurrent = new Date();
  const timeNow = dateCurrent.getTime() / 1000;
  const addTime = props.route.params.data.addTime;
  const timeToExpired = addTime - timeNow;
  const timeRef = useRef<any>(null);
  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setPaymentStatusSession(false);
      setErrorSession(false);
      setExpiredSession(true);
    }, timeToExpired);
  }, []);

  /** => get data if there's isSelected:true */
  const dataPaymentMethod = data[0]?.paymentMethods;

  useEffect(() => {
    if (dataPaymentMethod != undefined) {
      setIsSelected(findIsSelected(dataPaymentMethod));
    }
  }, [dataPaymentMethod]);

  useEffect(() => {
    selectedPaymentMethodData == null && isSelected != []
      ? setSelectedPaymentMethodData(isSelected[0])
      : null;
  }, [selectedPaymentMethodData, isSelected]);

  /** => to thank you page */
  const toThankYouPage = () => {
    setHitOrderDetail(false);
    clearInterval(intervalCheckStatus.current);
    setSelectedPaymentMethodData(null);
    clearTimeout(timeRef.current);

    /** fetch commit cart */
    if (checkoutContextData) {
      const paramsCommitCart: models.PaymentMethodCommitCartData = {
        checkoutId: checkoutContextData.id,
        orderId: Number(dataOrder.id),
      };
      paymentMethodCommitCart.fetch(dispatchPaymentMethod, paramsCommitCart);
    }

    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    goToThankYouPage('payment', Number(dataOrder?.id));
  };

  /** => call payment method list */
  useFocusEffect(
    React.useCallback(() => {
      handlePaymentMethodList();
    }, []),
  );

  /** => sub payment method create order for data Id*/
  useFocusEffect(
    React.useCallback(() => {
      if (statePaymentMethod.createOrder.data != null) {
        if (statePaymentMethod.createOrder.data != dataOrder) {
          setDataOrder(statePaymentMethod.createOrder.data);
        }
      }
    }, [statePaymentMethod.createOrder.data]),
  );

  /** => call subscribe rtdb for order */
  useFocusEffect(
    React.useCallback(() => {
      if (dataOrder) {
        PaymentMethodSubRtdb.fetch(dispatchPaymentMethod, dataOrder.id);
      }
    }, [dataOrder]),
  );

  /** => call navigation to thankyou page when there's an update from rtdb*/
  useFocusEffect(
    React.useCallback(() => {
      if (handleStatusPayment == false) {
        if (statePaymentMethod.subOrderRtdb.data) {
          if (statePaymentMethod.subOrderRtdb.data[0] == 'true') {
            toThankYouPage();
          } else if (statePaymentMethod.subOrderRtdb.data[0] == null) {
            if (statePaymentMethod.createOrder.data != null) {
              intervalCheckStatus.current = setInterval(() => {
                thankYouPageAction.thankYoupageOrderDetail(
                  dispatchThankYouPage,
                  statePaymentMethod.createOrder.data.id,
                );
                setGetOrderStatus(true);
              }, 1000);
            }
          }
        }
      } else if (handleStatusPayment == true) {
        if (statePaymentMethod.subOrderRtdb.data) {
          statePaymentMethod.subOrderRtdb.data[0] == 'true'
            ? toThankYouPage()
            : null;
        }
      }
    }, [
      handleStatusPayment,
      statePaymentMethod.subOrderRtdb.data,
      statePaymentMethod.createOrder.data,
    ]),
  );

  /** navigate to thankyou page if orderStatus == waiting_for_payment'*/
  React.useEffect(() => {
    if (getOrderStatus == true) {
      if (thankYouPageData?.orderStatus) {
        if (thankYouPageData?.orderStatus == 'waiting_for_payment') {
          toThankYouPage();
        } else if (thankYouPageData?.orderStatus != 'waiting_for_payment') {
          if (statePaymentMethod.createOrder.data) {
            thankYouPageCancelOrderAction.fetch(dispatchThankYouPage, {
              id: statePaymentMethod.createOrder.data?.id,
              status: 'created_timeout',
            });
            handleErrorStatus();
          } else {
            handleErrorStatus();
          }
        }
      }
    }
  }, [getOrderStatus, thankYouPageData]);

  /** => try to get status payment from order detail when there's no update from rtdb */
  React.useEffect(() => {
    if (
      handleStatusPayment == true &&
      statePaymentMethod.subOrderRtdb.data &&
      hitOrderDetail == true
    ) {
      if (
        statePaymentMethod.subOrderRtdb.data[0] != 'true' &&
        statePaymentMethod.createOrder.data?.id
      ) {
        thankYouPageAction.thankYoupageOrderDetail(
          dispatchThankYouPage,
          statePaymentMethod.createOrder.data?.id,
        );
        setGetOrderStatus(true);
      }
    }
  }, [
    handleStatusPayment,
    statePaymentMethod.createOrder.data,
    statePaymentMethod.subOrderRtdb.data,
  ]);

  /** => call 5 second checkout */
  React.useEffect(() => {
    if (isLoading == true) {
      setTimeout(() => {
        setHandleStatusPayment(true);
      }, 10000);
    }
  }, [isLoading]);

  //==> dispatch create order
  React.useEffect(() => {
    if (
      createTheOrder == true &&
      checkoutContextData &&
      selectedPaymentMethodData
    ) {
      // rename seller attributes
      const updatedSellerAttributes = checkoutContextData.sellers.map(
        (sellers) => {
          // rename products attributes
          const updatedProductsAttributes = sellers.products.map((products) => {
            return {
              productId: products.productId,
              warehouseId: products.warehouseId,
              warehouseCode: products.externalWarehouseCode,
              warehouseName: products.warehouseName,
              categoryId: products.categoryId,
              brandId: products.brandId,
              productCode: products.externalProductCode,
              productName: products.productName,
              productImageUrl: products.productImageUrl,
              brandName: products.brandName,
              qty: products.qty,
              qtyPerBox: products.qtyPerBox,
              uomLabel: products.uomLabel,
              productPriceBeforeTax: products.priceBeforeTax,
              taxPercentage: products.taxPercentage,
              productTax: products.taxPrice,
              productPriceAfterTax: products.priceAfterTax,
              totalProductPriceAfterTax: products.priceAfterTax * products.qty,
              leadTime: products.leadTime,
            };
          });

          return {
            sellerId: sellers.sellerId,
            sellerName: sellers.sellerName,
            sellerAdminEmail: sellers.sellerAdminEmail || '',
            sellerAdminId: sellers.sellerAdminId?.toString() || '',
            sellerAdminFullname: sellers.sellerAdminName || '',
            products: updatedProductsAttributes,
          };
        },
      );

      const params: models.PaymentMethodCreateOrderData = {
        userId: checkoutContextData.userId,
        cartId: checkoutContextData.cartId,
        sellers: updatedSellerAttributes,
        buyerId: checkoutContextData.buyerId,
        buyerCode: checkoutContextData.buyerCode,
        ownerId: checkoutContextData.ownerId.toString(),
        ownerFullname: checkoutContextData.ownerFullName,
        ownerPhoneNo: checkoutContextData.ownerPhoneNumber,
        buyerName: checkoutContextData.buyerName,
        buyerAddressLatitude: checkoutContextData.buyerAddress.latitude,
        buyerAddressLongitude: checkoutContextData.buyerAddress.longitude,
        buyerAddressProvince: checkoutContextData.buyerAddress.province,
        buyerAddressCity: checkoutContextData.buyerAddress.city,
        buyerAddressDistrict: checkoutContextData.buyerAddress.district,
        buyerAddressUrban: checkoutContextData.buyerAddress.urban,
        buyerAddressZipCode: checkoutContextData.buyerAddress.zipCode,
        buyerAddress: checkoutContextData.buyerAddress.address,
        buyerAddressNoteAddress: checkoutContextData.buyerAddress.noteAddress,
        buyerAddressLocationId: checkoutContextData.buyerAddress.locationId,
        paymentMethodId: selectedPaymentMethodData.id,
        paymentMethodCode: selectedPaymentMethodData.code,
        paymentMethodServiceFeeDeduct:
          selectedPaymentMethodData.serviceFeeDeduct,
        paymentMethodServiceFeeNonDeduct:
          selectedPaymentMethodData.serviceFeeNonDeduct,
        paymentMethodDisplayLabel: selectedPaymentMethodData.displayLabel,
        paymentMethodIsServiceFeeFree:
          selectedPaymentMethodData.isServiceFeeFree,
        paymentMethodIconUrl: selectedPaymentMethodData.iconUrl,
        reservedAt: checkoutContextData.createdAt,
      };

      paymentMethodCreateOrder.fetch(dispatchPaymentMethod, params);
      clearTimeout(timeRef.current);
      setLoading(true);
    }
  }, [createTheOrder]);

  //==> handle create order
  const handleCreateOrder = () => {
    if (checkoutContextData != null) {
      if (selectedPaymentMethodData?.isActive == true) {
        setPaymentStatusSession(true);
      } else {
        setCreateTheOrder(true);
      }
    }
  };

  /** => Error handling */
  // when failed create order
  React.useEffect(() => {
    if (handleStatusPayment == true) {
      if (statePaymentMethod.createOrder.error != null) {
        handleErrorStatus();
      }
    }
  }, [handleStatusPayment, statePaymentMethod.createOrder.data]);
  // when detail failed
  React.useEffect(() => {
    if (handleStatusPayment == true) {
      if (stateThankYouPage.detail.error != null) {
        handleErrorStatus();
      }
    }
  }, [handleStatusPayment, stateThankYouPage.detail.error]);
  // when cancel status order failed
  React.useEffect(() => {
    if (handleStatusPayment == true) {
      if (stateThankYouPage.cancelOrder.error != null) {
        handleErrorStatus();
      }
    }
  }, [handleStatusPayment, stateThankYouPage.cancelOrder.error]);
  // payment method list failed
  React.useEffect(() => {
    if (stateCheckout.checkout.error != null) {
      handleErrorStatus();
    }
  }, [stateCheckout.checkout.error]);

  /** => handle error status */
  const handleErrorStatus = () => {
    clearInterval(intervalCheckStatus.current);
    setHitOrderDetail(false);
    setErrorSession(true);
  };

  /** => handle selected method */
  const handleSelect = (selected: string) => {
    setSelectMethod(selected);
  };
  const handleOnDataChoosen = (selectedData: models.PaymentMethod) => {
    setSelectedPaymentMethodData(selectedData);
  };

  /** handle back to cart */
  const handleBackToCart = () => {
    clearInterval(intervalCheckStatus.current);
    setHitOrderDetail(false);
    setSelectedPaymentMethodData(null);
    updateCartAction.reset(dispatchCart);
    checkoutAction.reset(dispatchCheckout);
    paymentMethodCreateOrder.reset(dispatchPaymentMethod);
    PaymentMethodSubRtdb.reset(dispatchPaymentMethod);
    setExpiredSession(false);
    clearTimeout(timeRef.current);
    goToShoppingCart();
  };

  /** => back handler */
  const handleBackHardware = () => {
    isLoading ? null : goBack();
  };
  useCustomBackHardware(() => handleBackHardware());

  return (
    <SnbContainer color="grey">
      {isLoading ? (
        <>
          <LoadingPage />
          {/* Modal Status Error */}
          <PaymentMethodErrorModal
            isOpen={isErrorSession}
            close={handleBackToCart}
          />
        </>
      ) : (
        <>
          {/* HEADER */}
          <PaymentMethodHeader
            backAction={() => {
              handleBackHardware();
            }}
          />
          {/* BODY */}
          <PaymentMethodBody
            data={data}
            onSelectedType={handleSelect}
            dataFromCheckout={dataCheckout}
            onDataChoosen={handleOnDataChoosen}
            isSelected={isSelected}
          />

          {/* FOOTER */}
          <PaymentMethodBottom
            choice={selectMethod}
            isSelected={isSelected}
            onCreateOrder={handleCreateOrder}
          />

          {/* Modal Expired Time */}
          <PaymentMethodExpiredTimeModal
            isOpen={isExpiredSession}
            close={handleBackToCart}
          />
          {/* Modal Status Pending */}
          {/* { selectedPaymentMethodData  && */}
          <PaymentStatusModal
            isOpen={isPaymentStatusSession}
            handleNoAction={() => {
              setPaymentStatusSession(false);
            }}
            handleOkAction={() => {
              setCreateTheOrder(true);
            }}
          />
          {/* } */}
        </>
      )}
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
