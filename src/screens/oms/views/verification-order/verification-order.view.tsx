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
import { ErrorStockModal } from './error-stock-modal';
import { ErrorFetchModal } from './error-fetch-modal';
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
  useStandardLoadingState,
  useVerificationFailedFetchState,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useReserveStockAction } from '@screen/product/functions';
import {
  useVoucherLocalData,
  getSelectedVouchers,
} from '@screen/voucher/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';
import {
  ReserveStockPayloadData,
  CartSelectedData,
  ReserveStockPayloadProducts,
  ReserveStockPayloadBrand,
  CartSelectedBrand,
  CartSelectedProduct,
} from '@models';

/** === COMPONENT === */
const OmsVerificationOrderView: FC = () => {
  /** === HOOK === */
  const errorPromoModal = useStandardModalState();
  const errorVoucherModal = useStandardModalState();
  const errorStockModal = useStandardModalState();
  const errorFetchModal = useVerificationFailedFetchState();

  const loadingVerificationToCheckout = useStandardLoadingState();

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
      if (stateReserveStock.create.error.code === 11008) {
        reserveStockAction.detail(dispatchReserveStock, getCartSelected.id);
      } else {
        const action = () => {
          loadingVerificationToCheckout.setLoading(true);
          const reservedAt = moment().format().toString();
          reserveDataAction.setReservedAt(reservedAt);
          const invoices: ReserveStockPayloadData[] = [];
          getCartSelected.data.map((invoiceArr: CartSelectedData) => {
            const brands: ReserveStockPayloadBrand[] = [];
            invoiceArr.brands.map((brandArr: CartSelectedBrand) => {
              const products: ReserveStockPayloadProducts[] = [];
              brandArr.products.map((productArr: CartSelectedProduct) => {
                products.push({
                  productId: productArr.productId,
                  qty: productArr.qty,
                  warehouseId: productArr.warehouseId,
                });
              });
              brands.push({
                brandId: brandArr.brandId,
                products,
              });
            });
            invoices.push({
              invoiceGroupId: invoiceArr.invoiceGroupId,
              brands,
            });
          });
          const createReserveStockParams = {
            id: getCartSelected.id,
            data: invoices,
            reservedAt,
          };
          reserveStockAction.create(
            dispatchReserveStock,
            createReserveStockParams,
          );
        };
        errorFetchModal.setOpen(true);
        errorFetchModal.setErrorAction(() => action);
        errorFetchModal.setErrorText('Ulangi');
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
        reservedAt: reserveDataAction.reserveData.reservedAt,
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
   * Listen Error GET error message reserved-stock
   */
  React.useEffect(() => {
    if (stateReserveStock.detail.error !== null) {
      const action = () => {
        reserveStockAction.detail(dispatchReserveStock, getCartSelected.id);
      };
      errorFetchModal.setOpen(true);
      errorFetchModal.setErrorAction(() => action);
      errorFetchModal.setErrorText('Ulangi');
    }
  }, [stateReserveStock.detail.error]);

  /**
   * Listen Error POST reserved-discount
   * - error voucher
   * - error fetch
   */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.create.error !== null) {
      if (statePromo.reserveDiscount.create.error.code === 140037) {
        errorVoucherModal.setOpen(true);
      } else if (statePromo.reserveDiscount.create.error.code === 140032) {
        const action = () => {
          goBack();
        };
        errorFetchModal.setOpen(true);
        errorFetchModal.setErrorAction(() => action);
        errorFetchModal.setErrorText('Kembali Ke Keranjang');
      } else {
        const action = () => {
          const createReserveDiscountParams = {
            ...getCartSelected,
            voucherIds: getSelectedVouchers(
              voucherLocalDataAction.selectedVoucher,
            ),
            potentialDiscountId: stateVerificationOrder.create.data?.id,
            reservedAt: reserveDataAction.reserveData.reservedAt,
          };
          reserveDiscountAction.create(
            dispatchPromo,
            createReserveDiscountParams,
          );
        };
        errorFetchModal.setOpen(true);
        errorFetchModal.setErrorAction(() => action);
        errorFetchModal.setErrorText('Ulangi');
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

  /**
   * Listen Error GET reserved-discount
   */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.detail.error !== null) {
      const action = () => {
        if (statePromo.reserveDiscount.create.data !== null) {
          reserveDiscountAction.detail(
            dispatchPromo,
            statePromo.reserveDiscount.create.data.id,
          );
        }
      };
      errorFetchModal.setOpen(true);
      errorFetchModal.setErrorAction(() => action);
      errorFetchModal.setErrorText('Ulangi');
    }
  }, [statePromo.reserveDiscount.detail.error]);

  /** => handle continue to payment */
  const handleContinuePayment = () => {
    loadingVerificationToCheckout.setLoading(true);
    const reservedAt = moment().format().toString();
    reserveDataAction.setReservedAt(reservedAt);
    const invoices: ReserveStockPayloadData[] = [];
    getCartSelected.data.map((invoiceArr: CartSelectedData) => {
      const brands: ReserveStockPayloadBrand[] = [];
      invoiceArr.brands.map((brandArr: CartSelectedBrand) => {
        const products: ReserveStockPayloadProducts[] = [];
        brandArr.products.map((productArr: CartSelectedProduct) => {
          products.push({
            productId: productArr.productId,
            qty: productArr.qty,
            warehouseId: productArr.warehouseId,
          });
        });
        brands.push({
          brandId: brandArr.brandId,
          products,
        });
      });
      invoices.push({
        invoiceGroupId: invoiceArr.invoiceGroupId,
        brands,
      });
    });
    const createReserveStockParams = {
      id: getCartSelected.id,
      data: invoices,
      reservedAt,
    };
    reserveStockAction.create(dispatchReserveStock, createReserveStockParams);
  };

  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <VerificationOrderHeader
        isLoading={loadingVerificationToCheckout.isLoading}
      />
    );
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
        buttonLoading={loadingVerificationToCheckout.isLoading}
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
  /** => error stock modal */
  const renderErrorStockModal = () => {
    if (stateReserveStock.detail.data === null) {
      return null;
    }
    return (
      <ErrorStockModal
        visible={errorStockModal.isOpen}
        errorData={stateReserveStock.detail.data}
        onBackToCart={() => {
          // tambahkan code buat edit cart data disini cc: mas ghozi
          errorStockModal.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => error fetch modal */
  const renderFetchStockModal = () => {
    return (
      <ErrorFetchModal
        visible={errorFetchModal.isOpen}
        onPress={() => {
          errorFetchModal.setOpen(false);
          errorFetchModal.errorAction();
        }}
        buttonText={errorFetchModal.errorText}
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
      {renderErrorStockModal()}
      {renderFetchStockModal()}
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
