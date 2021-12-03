/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SnbContainer, SnbText, SnbDivider } from 'react-native-sinbad-ui';
import moment from 'moment';
import { VerificationOrderStyle } from '../../styles';
import { contexts } from '@contexts';
/** === IMPORT COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
import { ErrorPromoModal } from './error-promo-modal';
import { ErrorVoucherModal } from './error-voucher-modal';
import { VerificationOrderHeader } from './verification-order-header.view';
import { VerificationOrderDiscountList } from './verification-order-discount-list.view';
import { VerificationOrderBonusList } from './verification-order-bonus-list.view';
import { VerificationOrderNonDiscountList } from './verification-order-non-discount-list.view';
import { VerificationOrderBottom } from './verification-order-bottom.view';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  goToCheckout,
  useReserveDataAction,
  useCartSelected,
  useStandardModalState,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useReserveStockAction } from '@screen/product/functions';
import {
  useVoucherLocalData,
  getSelectedVouchers,
} from '@screen/voucher/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';

/** === COMPONENT === */
const OmsVerificationOrderView: FC = () => {
  /** === HOOK === */
  const errorPromoModal = useStandardModalState();
  const errorVoucherModal = useStandardModalState();
  const errorStockModal = useStandardModalState();

  const reserveDataAction = useReserveDataAction();
  const { getCartSelected } = useCartSelected();
  const voucherLocalDataAction = useVoucherLocalData();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();

  React.useEffect(() => {
    return () => {
      /** => reset reserve discount context */
      reserveDiscountAction.resetPostGet(dispatchPromo);
      /** => reset reserve stock context */
      reserveStockAction.resetPostGet(dispatchReserveStock);
    };
  }, []);

  /**
   * VERIFICATION-ORDER SECTION
   */
  const { stateVerificationOrder } = React.useContext(
    contexts.VerificationOrderContext,
  );
  const verificationOrderDetailData = stateVerificationOrder.detail.data;

  /**
   * RESERVE SECTION
   * - POST reserved-discount (Promo & Voucher)
   * - GET reserved-discount (Promo & Voucher)
   * - POST reserved-stock
   * - GET reserved-stock
   */
  const { dispatchPromo, statePromo } = React.useContext(contexts.PromoContext);
  const { dispatchReserveStock, stateReserveStock } = React.useContext(
    contexts.ReserveStockContext,
  );

  /**
   * Listen Error POST reserved-stock
   * - error stock
   * - error fetch
   */
  React.useEffect(() => {
    if (stateReserveStock.create.error !== null) {
      if (stateReserveStock.create.error.code === 140037) {
        reserveStockAction.detail(dispatchReserveStock, getCartSelected.id);
      }
    }
  }, [stateReserveStock.create.error]);

  /**
   * Listen Success POST reserved-stock
   * - if success, hit POST reserved-discount
   */
  React.useEffect(() => {
    if (stateReserveStock.create.data !== null) {
      const createReserveDiscountParams = {
        ...getCartSelected,
        voucherIds: getSelectedVouchers(voucherLocalDataAction.selectedVoucher),
        potentialDiscountId: stateVerificationOrder.create.data?.id,
        reservedAt: moment().format().toString(),
      };
      reserveDiscountAction.create(dispatchPromo, createReserveDiscountParams);
    }
  }, [stateReserveStock.create.data]);

  /**
   * Listen Success GET error message reserved-stock
   */
  React.useEffect(() => {
    if (stateReserveStock.detail.data !== null) {
      errorStockModal.setOpen(true);
    }
  }, [stateReserveStock.detail.data]);

  /**
   * Listen Error POST reserved-discount
   * - error voucher
   * - error fetch
   */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.create.error !== null) {
      if (statePromo.reserveDiscount.create.error.code === 140037) {
        errorVoucherModal.setOpen(true);
      }
    }
  }, [statePromo.reserveDiscount.create.error]);

  /**
   * Listen Success POST reserved-discount
   */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.create.data !== null) {
      reserveDiscountAction.detail(
        dispatchPromo,
        statePromo.reserveDiscount.create.data.id,
      );
    }
  }, [statePromo.reserveDiscount.create.data]);

  /**
   * Listen Success GET reserved-discount
   * - error promo
   * - not error promo
   */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.detail.data !== null) {
      if (
        statePromo.reserveDiscount.detail.data.promoNotMatch.amount.length >
          0 ||
        statePromo.reserveDiscount.detail.data.promoNotMatch.bonus.length > 0
      ) {
        errorPromoModal.setOpen(true);
      } else {
        goToCheckout();
      }
    }
  }, [statePromo.reserveDiscount.detail.data]);

  /** => handleContinueToPayment */
  const handleContinuePayment = () => {
    // const invoices: ReserveStockPayloadData[] = [];
    // getCartSelected.data.map((invoiceArr: CartSelectedData) => {
    //   const brands: ReserveStockPayloadBrand[] = [];
    //   invoiceArr.brands.map((brandArr: CartSelectedBrand) => {
    //     const products: ReserveStockPayloadProducts[] = [];
    //     brandArr.products.map((productArr: CartSelectedProduct) => {
    //       products.push({
    //         productId: productArr.productId,
    //         qty: productArr.qty,
    //         warehouseId: productArr.warehouseId,
    //       });
    //     });
    //     brands.push({
    //       brandId: brandArr.brandId,
    //       products,
    //     });
    //   });
    //   invoices.push({
    //     invoiceGroupId: invoiceArr.invoiceGroupId,
    //     brands,
    //   });
    // });
    // const createReserveStockParams = {
    //   id: getCartSelected.id,
    //   data: invoices,
    //   reservedAt: moment().format().toString(),
    // };
    // reserveStockAction.create(dispatchReserveStock, createReserveStockParams);
<<<<<<< HEAD
    const reservedAt = moment().format().toString();
    reserveDataAction.setReservedAt(reservedAt);
    const createReserveDiscountParams = {
      ...getCartSelected,
      voucherIds: getSelectedVouchers(voucherLocalDataAction.selectedVoucher),
      potentialDiscountId: stateVerificationOrder.create.data?.id,
      reservedAt,
=======
    const createReserveDiscountParams = {
      ...getCartSelected,
      voucherIds: getSelectedVouchers(voucherData.dataVouchers),
      potentialDiscountId: stateVerificationOrder.create.data?.id,
      reservedAt: moment().format().toString(),
>>>>>>> ba3d9a8c (bypass reserve stock process)
    };
    reserveDiscountAction.create(dispatchPromo, createReserveDiscountParams);
  };

  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return <VerificationOrderHeader />;
  };
  /** => discount list */
  const renderDiscountList = () => {
    if (verificationOrderDetailData === null) {
      return null;
    }
    return (
      <VerificationOrderDiscountList
        promoProducts={verificationOrderDetailData.promoProducts}
      />
    );
  };
  /** => bonus list */
  const renderBonusList = () => {
    if (verificationOrderDetailData === null) {
      return null;
    }
    return (
      <VerificationOrderBonusList
        bonusProducts={verificationOrderDetailData.bonusProducts}
      />
    );
  };
  /** => non-discount list */
  const renderNonDiscountList = () => {
    if (verificationOrderDetailData === null) {
      return null;
    }
    return (
      <VerificationOrderNonDiscountList
        nonPromoProducts={verificationOrderDetailData.nonPromoProducts}
      />
    );
  };
  /** => bottom */
  const renderBottom = () => {
    if (verificationOrderDetailData === null) {
      return null;
    }
    return (
      <VerificationOrderBottom
        data={verificationOrderDetailData}
        buttonDisabled={
          verificationOrderDetailData.grandTotal.grandTotalPrice === 0 ||
          verificationOrderDetailData.grandTotal.grandTotalPrice -
            verificationOrderDetailData.grandTotal.grandTotalDiscount <
            0
        }
        buttonLoading={
          statePromo.reserveDiscount.create.loading ||
          statePromo.reserveDiscount.detail.loading ||
          stateReserveStock.create.loading ||
          stateReserveStock.detail.loading
        }
        buttonOnPress={handleContinuePayment}
      />
    );
  };
  /** => content */
  const renderContent = () => {
    return (
      <View style={VerificationOrderStyle.contentContainer}>
        <View>
          <SnbText.B4>BERIKUT INI ADALAH RINGKASAN ORDER ANDA</SnbText.B4>
          <SnbDivider style={VerificationOrderStyle.mainDivider} />
        </View>
        {renderDiscountList()}
        {renderBonusList()}
        {renderNonDiscountList()}
      </View>
    );
  };
  /** => error promo modal */
  const renderErrorPromoModal = () => {
    if (statePromo.reserveDiscount.detail.data === null) {
      return null;
    }
    return (
      <ErrorPromoModal
        visible={errorPromoModal.isOpen}
        onBackToCart={() => {
          errorPromoModal.setOpen(false);
          goBack();
        }}
        onContinueToPayment={() => {
          errorPromoModal.setOpen(false);
          goToCheckout();
        }}
        amountPromoList={
          statePromo.reserveDiscount.detail.data.promoNotMatch.amount
        }
        bonusPromoList={
          statePromo.reserveDiscount.detail.data.promoNotMatch.bonus
        }
      />
    );
  };
  /** => error voucher modal */
  const renderErrorVoucherModal = () => {
    return (
      <ErrorVoucherModal
        visible={errorVoucherModal.isOpen}
        onBackToCart={() => {
          /** => reset local voucher data */
          voucherLocalDataAction.reset();
          errorVoucherModal.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {stateVerificationOrder.detail.loading ? (
        <LoadingPage />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderContent()}
          </ScrollView>
          {renderBottom()}
        </>
      )}
      {/* modal */}
      {renderErrorPromoModal()}
      {renderErrorVoucherModal()}
    </SnbContainer>
  );
};

export default OmsVerificationOrderView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 09092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
