/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbIcon,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import {
  handleSubTotalPrice,
  handleTransformProductBrands,
  useParcelDetailModal,
} from '../../functions/checkout';
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

interface ModalParcelDetail {
  isOpen: boolean;
  close: () => void;
  data: models.IInvoiceCheckout | null;
}

interface ContentListData {
  name: string;
  price: number;
  type: 'normal' | 'green';
}
/** === COMPONENT === */
export const ModalParcelDetail: FC<ModalParcelDetail> = ({
  isOpen,
  close,
  data,
}) => {
  /** === HOOK === */
  const parcelDetailModal = useParcelDetailModal();

  const productDetail = () => {
    if (data === null) {
      return null;
    }

    return (
      <View style={{ paddingBottom: 16 }}>
        <SnbText.H4>Produk</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        {productList(data.brands)}
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.H4 color={color.black80}>Total Order</SnbText.H4>
          </View>
          <SnbText.B2 color={color.black80}>
            {toCurrency(data.totalPriceBeforeTax, {
              withFraction: false,
            })}
          </SnbText.B2>
        </View>
      </View>
    );
  };

  const productList = (brands: models.BrandCheckout[]) => {
    const products = handleTransformProductBrands(brands);
    return products.map((product) => (
      <>
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.B1>
              {product.productName} ({product.qty}
              {product.uom})
            </SnbText.B1>
          </View>
          <SnbText.B1>
            {toCurrency(product.displayPrice * product.qty, {
              withFraction: false,
            })}
          </SnbText.B1>
        </View>
      </>
    ));
  };
  const discountDetail = () => {
    if (
      (data && data.voucherSeller !== null) ||
      (data && data.promoSellers && data.promoSellers.length > 0)
    ) {
      return (
        <View style={{ paddingBottom: 16 }}>
          <SnbText.H4>Potongan Harga</SnbText.H4>
          <SnbDivider style={{ marginVertical: 8 }} />
          <View style={{ marginBottom: 8 }}>
            {data.voucherSeller ? (
              discountVoucherList(data.voucherSeller)
            ) : (
              <View />
            )}
            {data.promoSellers && data.promoSellers.length > 0 ? (
              discountPromoList(data.promoSellers)
            ) : (
              <View />
            )}
          </View>
          {data.totalPromoSellerAndVoucher !== 0 && (
            <View style={CheckoutStyle.modalDetailTotalContainer}>
              <View style={{ width: '50%' }}>
                <SnbText.H4 color={color.black80}>Total Potongan</SnbText.H4>
              </View>
              <SnbText.B2 color={color.black80}>
                -{' '}
                {toCurrency(data?.totalPromoSellerAndVoucher as number, {
                  withFraction: false,
                })}
              </SnbText.B2>
            </View>
          )}
        </View>
      );
    }
  };

  const discountVoucherList = (voucherData: models.ReserveDiscountVouchers) => {
    return (
      <View style={CheckoutStyle.modalDetailItemContainer}>
        <View style={{ width: '50%' }}>
          <SnbText.B3 color={color.green50}>
            Voucher '{voucherData.name}'
          </SnbText.B3>
        </View>
        <SnbText.B3 color={color.green50}>
          -{' '}
          {toCurrency(voucherData.amount, {
            withFraction: false,
          })}
        </SnbText.B3>
      </View>
    );
  };

  const discountPromoList = (
    promoData: models.ReserveDiscountPromoSellers[],
  ) => {
    return promoData.map((detailPromo) => {
      return detailPromo.benefitType === 'amount' ||
        detailPromo.benefitType === 'percent'
        ? contentListData(
            detailPromo.name,
            detailPromo.amount as number,
            'benefit',
          )
        : contentListData(
            `${detailPromo.productName} x${detailPromo.bonusQty}`,
            0,
            'benefit',
          );
    });
  };

  const totalDiscountList = (price: number) => {
    return (
      <View style={CheckoutStyle.detailItemContainer}>
        <SnbText.B3 color={color.green50}>{'Total Potongan Harga'}</SnbText.B3>
        <SnbText.B3 color={color.green50}>
          {'- '}
          {toCurrency(price, {
            withFraction: false,
          })}
        </SnbText.B3>
      </View>
    );
  };

  const contentListData = (
    name: string,
    price: number,
    type: 'normal' | 'benefit',
  ) => {
    return (
      <View style={CheckoutStyle.detailItemContainer}>
        <SnbText.B3 color={type === 'normal' ? color.black100 : color.green50}>
          {name}
        </SnbText.B3>
        <SnbText.B3 color={type === 'normal' ? color.black100 : color.green50}>
          {type === 'benefit' && price !== 0 ? '- ' : ''}
          {price !== 0
            ? toCurrency(price, {
                withFraction: false,
              })
            : 'Free'}
        </SnbText.B3>
      </View>
    );
  };
  const total = () => {
    if (data === null) {
      return null;
    }
    const products = handleTransformProductBrands(data.brands);
    return (
      <View>
        {parcelDetailModal.isDetailOpen ? (
          <View style={{ marginLeft: 32 }}>
            {contentListData(
              `Total Produk (${products.length})`,
              data.totalPriceBeforeTax,
              'normal',
            )}
            {data.totalPromoSellerAndVoucher !== 0
              ? totalDiscountList(data.totalPromoSellerAndVoucher as number)
              : null}
            {contentListData(
              `PPN ${data.tax}%`,
              data.totalPriceAfterTax - data.totalPriceBeforeTax,
              'normal',
            )}
            {data.totalPromoPayment !== 0 && data.totalPromoPayment !== null
              ? contentListData(
                  'Promo Pembayaran',
                  data.totalPromoPayment as number,
                  'benefit',
                )
              : null}
            {data.totalFee !== 0
              ? contentListData(
                  'Layanan Pembayaran',
                  data.totalFee as number,
                  'normal',
                )
              : null}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => {
            parcelDetailModal.toggleDetail();
          }}
          style={CheckoutStyle.detailExpandButton}>
          <View style={{ flexDirection: 'row' }}>
            <SnbIcon
              name={
                parcelDetailModal.isDetailOpen ? 'expand_less' : 'expand_more'
              }
              size={24}
              color={color.black100}
            />
            <View style={{ marginLeft: 8 }}>
              <SnbText.H4>Total</SnbText.H4>
            </View>
          </View>
          <SnbText.H4>
            {handleSubTotalPrice(data, { withFraction: false })}
          </SnbText.H4>
        </TouchableOpacity>
      </View>
    );
  };
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ScrollView
          style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {productDetail()}
          {discountDetail()}
          {total()}
        </ScrollView>
      </View>
    );
  };
  return data !== null ? (
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      title={'Detail Pesanan'}
      closeAction={close}
      actionIcon={'close'}
    />
  ) : (
    <View />
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
