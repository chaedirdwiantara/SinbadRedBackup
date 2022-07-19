/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, Ref } from 'react';
import { View, Dimensions } from 'react-native';
import {
  SnbText2,
  SnbDivider2,
  colorV2,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';
import { totalBarangPrice } from '../../functions/checkout';
import { toCurrency } from '@core/functions/global/currency-format';

const { height } = Dimensions.get('window');

interface ModalParcelDetail {
  parentRef: Ref<SnbBottomSheet2Ref>;
  close: () => void;
  data?: models.CheckoutCartProduct[];
  sellerName?: string;
}
/** === COMPONENT === */
export const ModalParcelDetail: FC<ModalParcelDetail> = ({
  parentRef,
  close,
  data,
  sellerName,
}) => {
  if (!data || !sellerName) {
    return null;
  }

  /** === HOOK === */
  const deliveryFee = 0;
  const totalProductsPrice = totalBarangPrice(data);

  const productDetail = () => {
    return (
      <View style={{ paddingBottom: 16 }}>
        <SnbText2.Body.Default color={colorV2.textColor.secondary}>
          {sellerName}
        </SnbText2.Body.Default>
        <View style={{ marginVertical: 8 }}>
          <SnbDivider2 />
        </View>
        {productList(data)}
        <View style={{ marginVertical: 8 }}>
          <SnbDivider2 />
        </View>
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
              Ongkos Kirim
            </SnbText2.Paragraph.Default>
          </View>
          <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
            {toCurrency(deliveryFee, { withFraction: false })}
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{ marginVertical: 8 }}>
          <SnbDivider2 />
        </View>
        <View style={CheckoutStyle.modalDetailTotalContainer}>
          <View style={{ width: '50%' }}>
            <SnbText2.Headline.Small color={colorV2.textColor.default}>
              Total
            </SnbText2.Headline.Small>
          </View>
          <SnbText2.Headline.Small color={colorV2.textColor.default}>
            {totalProductsPrice}
          </SnbText2.Headline.Small>
        </View>
      </View>
    );
  };

  const productList = (products: models.CheckoutCartProduct[]) => {
    return products.map((product) => (
      <>
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ width: '50%' }}>
            <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
              {product.productName}
            </SnbText2.Paragraph.Default>
          </View>
          <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
            {' '}
            {toCurrency(product.priceAfterTax * product.qty, {
              withFraction: false,
            })}
          </SnbText2.Paragraph.Default>
        </View>
      </>
    ));
  };

  const content = () => {
    return (
      <View>
        <ScrollView
          style={{ maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {productDetail()}
        </ScrollView>
      </View>
    );
  };

  /** => title */
  const title = () => {
    return (
      <SnbBottomSheetPart.Title
        title="Detail Pesanan"
        titleType="center"
        swipeIndicator
      />
    );
  };
  /** => navigation */
  const navigation = () => {
    return (
      <SnbBottomSheetPart.Navigation
        iconRight1Name="x"
        onRight1Action={close}
      />
    );
  };

  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'checkoutParcelDetailModal'}
      type={'content'}
      contentHeight={250}
      title={title()}
      snap={true}
      content={content()}
      navigation={navigation()}
    />
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
