/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
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
  const deliveryFee = 0;
  const totalBarangPrice = () => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total = total + data[i].qty * data[i].price;
    }
    return total;
  };

  const productDetail = () => {
    if (data === null) {
      return null;
    }

    return (
      <View style={{ paddingBottom: 16 }}>
        <SnbText.H4 color={color.black80}>Produk</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        {productList(data)}
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.B1 color={color.black80}>Total Pengiriman</SnbText.B1>
          </View>
          <SnbText.B1 color={color.green50}>Rp {deliveryFee}</SnbText.B1>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.H4 color={color.black100}>Total</SnbText.H4>
          </View>
          <SnbText.B2 color={color.black100}>
            Rp {totalBarangPrice() + deliveryFee}
          </SnbText.B2>
        </View>
      </View>
    );
  };

  const productList = (data: models.BrandCheckout[]) => {
    const products = data;
    return products.map((product) => (
      <>
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ width: '50%' }}>
            <SnbText.B1>
              {product.productName} {product.qty}
            </SnbText.B1>
          </View>
          <SnbText.B1>Rp {product.price * product.qty}</SnbText.B1>
        </View>
      </>
    ));
  };

  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ScrollView
          style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {productDetail()}
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
 * updatedBy: Andi Chaedir Dwiantara (valkyrie)
 * updatedDate: 08032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
