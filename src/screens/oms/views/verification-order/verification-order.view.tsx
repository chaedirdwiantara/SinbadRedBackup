import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
  color,
  SnbIcon,
  SnbBadge,
  SnbButton,
} from 'react-native-sinbad-ui';
import { goBack, goToCheckout } from '../../functions';
import { VerificationOrderStyle } from '../../styles';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
import { contexts } from '@contexts';
import {
  VerificationOrderDetailBonusProduct,
  VerificationOrderDetailPromoProduct,
  VerificationOrderDetailNonPromoList,
  VerificationOrderDetailPromoList,
  VerificationOrderDetailVoucherList,
} from '@models';
import LoadingPage from '@core/components/LoadingPage';
import { useReserveStockContext } from 'src/data/contexts/product';
import { useReserveStockAction } from '@screen/product/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';
import { getSelectedVouchers } from '@screen/voucher/functions';
import { useCartSelected } from '@screen/oms/functions/shopping-cart/shopping-cart-hook.function';
import moment from 'moment';
import { useDataVoucher } from '@core/redux/Data';
import { ErrorPromoModal } from './ErrorPromoModal';
import { ErrorVoucherModal } from './ErrorVoucherModal';
import { useDispatch } from 'react-redux';
import * as Actions from '@actions';
/** === COMPONENT === */
const OmsVerificationOrderView: FC = () => {
  /** === HOOK === */
  const [activeSpoiler, setActiveSpoiler] = React.useState<null | number>(null);
  const [isErrorPromo, setErrorPromo] = React.useState(false);
  const [isErrorVoucher, setErrorVoucher] = React.useState(false);
  const [isErrorStock, setErrorStock] = React.useState(false);
  const [isErrorNetwork, setErrorNetwork] = React.useState();

  const dispatch = useDispatch();

  /**
   * VERIFICATION-ORDER SECTION
   */
  const { stateVerificationOrder } = React.useContext(
    contexts.VerificationOrderContext,
  );
  const verificationOrderDetailData = stateVerificationOrder.detail.data;

  /**
   * RESERVE SECTION
   * - POST Reserve Stock
   * - GET Reserve Stock
   * - POST Reserve Discount (Promo & Voucher)
   * - GET Reserve Discount (Promo & Voucher)
   */
  const { dispatchPromo, statePromo } = React.useContext(contexts.PromoContext);
  const { dispatchReserveStock, stateReserveStock } = useReserveStockContext();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();
  /** => get cart data */
  const { getCartSelected } = useCartSelected();
  /** => get voucher data */
  const voucherData = useDataVoucher();
  /** => if POST reserved-discount & reserved-stock both fail */
  React.useEffect(() => {
    /** => if POST reserved-discount error */
    if (
      statePromo.reserveDiscount.create.error !== null &&
      !stateReserveStock.create.loading
    ) {
      /** => if error voucher */
      if (statePromo.reserveDiscount.create.error.code === 140037) {
        setErrorVoucher(true);
      }
      /** => if error fetch */
      // do something
    }
    /**
     * TO DO:
     * - add logic if POST reserved-stock error
     */
  }, [statePromo.reserveDiscount.create.error, stateReserveStock.create.error]);
  /** => if POST reserved-discount & reserved-stock both success */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.create.data !== null) {
      /** => fetch GET `reserved-discount` */
      reserveDiscountAction.detail(
        dispatchPromo,
        statePromo.reserveDiscount.create.data.id,
      );
      /** => fetch GET `reserved stock */
      // do something
    }
  }, [statePromo.reserveDiscount.create.data]);

  /** => effect for listen GET reserved-discount */
  React.useEffect(() => {
    if (statePromo.reserveDiscount.detail.data !== null) {
      /** => if error promo */
      if (
        statePromo.reserveDiscount.detail.data.promoNotMatch.amount.length >
          0 ||
        statePromo.reserveDiscount.detail.data.promoNotMatch.bonus.length > 0
      ) {
        /** show modal error promo (bisa lanjut ke pembayaran) */
        setErrorPromo(true);
      } else {
        /** => if not error promo
         * pre-checkout codes should be in here! */
        goToCheckout();
      }
    }
  }, [statePromo.reserveDiscount.detail]);

  /** => handleContinueToPayment */
  const handleContinuePayment = () => {
    const createReserveDiscountParams = {
      ...getCartSelected,
      voucherIds: getSelectedVouchers(voucherData.dataVouchers),
      potentialDiscountId: stateVerificationOrder.create.data?.id,
      reservedAt: moment().format().toString(),
    };
    reserveStockAction.create(dispatchReserveStock, '1');
    reserveDiscountAction.create(dispatchPromo, createReserveDiscountParams);
  };

  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Verifikasi Order'}
        backAction={() => goBack()}
      />
    );
  };
  /** => discount list */
  const renderDiscountList = () => {
    if (verificationOrderDetailData?.promoProducts.length === 0) {
      return null;
    }
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{`Produk Mendapatkan Potongan Harga (${verificationOrderDetailData?.promoProducts.length} SKU)`}</SnbText.B4>
        </View>
        {verificationOrderDetailData?.promoProducts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderDiscountItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
              {renderDiscountDetail(
                item.promos,
                item.vouchers,
                item.promoPrice + item.voucherPrice,
                index,
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => discount item */
  const renderDiscountItem = (item: VerificationOrderDetailPromoProduct) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.productName}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>
            {toCurrency(item.displayPrice)}
          </SnbText.C2>
          <View style={VerificationOrderStyle.listItemProductPriceContainer}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{toCurrency(item.displayPrice * item.qty)}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => discount detail */
  const renderDiscountDetail = (
    promoList: VerificationOrderDetailPromoList[],
    voucherList: VerificationOrderDetailVoucherList[],
    totalDiscount: number,
    itemIndex: number,
  ) => {
    const isActive = activeSpoiler === itemIndex;
    return (
      <View>
        {isActive ? (
          <View style={VerificationOrderStyle.listItemProductDiscountList}>
            {promoList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.promoOwner !== 'none' ? (
                    <SnbBadge.Label
                      type={'error'}
                      value={item.promoOwner}
                      iconName={'local_offer'}
                    />
                  ) : (
                    <View />
                  )}
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountItem}>
                    <View
                      style={
                        VerificationOrderStyle.listItemProductDiscountName
                      }>
                      <SnbText.B3>{item.promoSellerName}</SnbText.B3>
                    </View>
                    <SnbText.B3 color={color.green50}>
                      {toCurrency(item.promoAmount)}
                    </SnbText.B3>
                  </View>
                  <SnbDivider style={{ marginBottom: 12 }} />
                </React.Fragment>
              );
            })}
            {voucherList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.voucherOwner !== 'none' ? (
                    <SnbBadge.Label
                      type={'error'}
                      value={item.voucherOwner}
                      iconName={'local_offer'}
                    />
                  ) : (
                    <View />
                  )}
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountItem}>
                    <View
                      style={
                        VerificationOrderStyle.listItemProductDiscountName
                      }>
                      <SnbText.B3>{item.voucherSellerName}</SnbText.B3>
                    </View>
                    <SnbText.B3 color={color.green50}>
                      {toCurrency(item.voucherAmount)}
                    </SnbText.B3>
                  </View>
                  <SnbDivider style={VerificationOrderStyle.listDivider} />
                </React.Fragment>
              );
            })}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => {
            if (isActive) {
              setActiveSpoiler(null);
            } else {
              setActiveSpoiler(itemIndex);
            }
          }}
          style={VerificationOrderStyle.listItemProductDiscountTouchable}>
          <View
            style={
              VerificationOrderStyle.listItemProductDiscountTotalTextContainer
            }>
            <SnbIcon
              name={isActive ? 'expand_less' : 'expand_more'}
              size={24}
              color={color.black100}
            />
            <SnbText.B4>Total Potongan</SnbText.B4>
          </View>
          <SnbText.B4>{toCurrency(totalDiscount)}</SnbText.B4>
        </TouchableOpacity>
      </View>
    );
  };
  /** => bonus list */
  const renderBonusList = () => {
    if (verificationOrderDetailData?.bonusProducts.length === 0) {
      return null;
    }
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{'Bonus SKU'}</SnbText.B4>
        </View>
        {verificationOrderDetailData?.bonusProducts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderBonusItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => bonus item */
  const renderBonusItem = (item: VerificationOrderDetailBonusProduct) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.bonusProductImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.bonusProductName}</SnbText.B4>
          </View>
          <SnbText.C3>{item.promoSellerName}</SnbText.C3>
          <SnbText.C2>{`x${item.bonusQty} Pcs`}</SnbText.C2>
        </View>
      </View>
    );
  };
  /** => non-discount list */
  const renderNonDiscountList = () => {
    if (verificationOrderDetailData?.nonPromoProducts.length === 0) {
      return null;
    }
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{'Produk Tidak Mendapatkan Potongan Harga'}</SnbText.B4>
        </View>
        {verificationOrderDetailData?.nonPromoProducts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderNonDiscountItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => non-discount item */
  const renderNonDiscountItem = (item: VerificationOrderDetailNonPromoList) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.productName}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>
            {toCurrency(item.displayPrice)}
          </SnbText.C2>
          <View style={VerificationOrderStyle.listItemProductPriceContainer}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{toCurrency(item.displayPrice * item.qty)}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => bottom */
  const renderBottom = () => {
    if (verificationOrderDetailData === null) {
      return null;
    }
    return (
      <View style={VerificationOrderStyle.bottomContainer}>
        <View>
          <View style={VerificationOrderStyle.bottomTextContainer}>
            <SnbText.B4>Total (Sebelum Pajak)</SnbText.B4>
            <SnbDivider style={{ marginVertical: 8 }} />
            <View style={VerificationOrderStyle.bottomTextRow}>
              <SnbText.B3>Total Transaksi</SnbText.B3>
              <SnbText.B3>
                {toCurrency(
                  verificationOrderDetailData.grandTotal.grandTotalPrice,
                )}
              </SnbText.B3>
            </View>
            <View style={VerificationOrderStyle.bottomTextRow}>
              <SnbText.B3>Total Potongan</SnbText.B3>
              <SnbText.B3 color={color.green50}>
                {toCurrency(
                  verificationOrderDetailData.grandTotal.grandTotalDiscount,
                )}
              </SnbText.B3>
            </View>
          </View>
          <View style={VerificationOrderStyle.bottomButtonContainer}>
            <SnbButton.Single
              type={'primary'}
              title={'Lanjut Ke Pembayaran'}
              loading={
                statePromo.reserveDiscount.create.loading ||
                statePromo.reserveDiscount.detail.loading ||
                stateReserveStock.create.loading
                // add loading stateReserveStock.detail here!
              }
              onPress={() => handleContinuePayment()}
            />
          </View>
        </View>
      </View>
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
        visible={isErrorPromo}
        onBackToCart={() => {
          setErrorPromo(false);
          goBack();
        }}
        onContinueToPayment={() => {
          setErrorPromo(false);
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
        visible={isErrorVoucher}
        onBackToCart={() => {
          setErrorVoucher(false);
          dispatch(Actions.saveSelectedVouchers(null));
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
