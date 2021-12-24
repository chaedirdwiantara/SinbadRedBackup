/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbIcon,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import {
  handleTransformProductBrands,
  useParcelDetailModal,
} from '../../functions/checkout';
import * as models from '@models';
const dummyPaymentDetail = [
  {
    name: 'Total Barang (2)',
    value: 330596,
    type: 'normal',
  },
  {
    name: 'Total Potongan Harga',
    value: 626,
    type: 'price_cut',
  },
  {
    name: 'PPN 10%',
    value: 32997,
    type: 'normal',
  },
  {
    name: 'Layanan Pembayaran',
    value: 4400,
    type: 'normal',
  },
];

interface ModalParcelDetail {
  isOpen: boolean;
  close: () => void;
  data: any;
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
    console.log('Modal Data', data);
    return data !== null ? (
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
    ) : (
      <View />
    );
  };

  const productList = (brands: models.BrandCheckout[]) => {
    const products = handleTransformProductBrands(brands);
    return products.map((product) => (
      <>
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.B1>{product.productName}</SnbText.B1>
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
    return (
      <View style={{ paddingBottom: 16 }}>
        <SnbText.H4>Potongan Harga</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.B1 color={color.green50}>
              Voucher 'Berkah Ramadhan'
            </SnbText.B1>
          </View>
          <SnbText.B1 color={color.green50}>
            {toCurrency(626, {
              withFraction: false,
            })}
          </SnbText.B1>
        </View>
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.H4 color={color.black80}>Total Potongan</SnbText.H4>
          </View>
          <SnbText.B2 color={color.black80}>
            {toCurrency(626, {
              withFraction: false,
            })}
          </SnbText.B2>
        </View>
      </View>
    );
  };
  const total = () => {
    return (
      <View>
        {parcelDetailModal.isDetailOpen ? (
          <View style={{ marginLeft: 32 }}>
            {dummyPaymentDetail.map((item, index) => {
              return (
                <View key={index} style={CheckoutStyle.detailItemContainer}>
                  <SnbText.B3
                    color={
                      item.type === 'normal' ? color.black100 : color.green50
                    }>
                    {item.name}
                  </SnbText.B3>
                  <SnbText.B3
                    color={
                      item.type === 'normal' ? color.black100 : color.green50
                    }>
                    {toCurrency(item.value, {
                      withFraction: false,
                    })}
                  </SnbText.B3>
                </View>
              );
            })}
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
          <SnbText.H4>Rp367.367,00</SnbText.H4>
        </TouchableOpacity>
      </View>
    );
  };
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ paddingVertical: 16 }}>
          {productDetail()}
          {discountDetail()}
          {total()}
        </View>
      </View>
    );
  };
  return (
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      title={'Detail Pesanan'}
      closeAction={close}
      actionIcon={'close'}
    />
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
