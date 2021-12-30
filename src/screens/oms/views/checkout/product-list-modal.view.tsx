/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, Dimensions, Image } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

interface ModalProductList {
  isOpen: boolean;
  close: () => void;
  data: models.ProductCheckout[] | null;
}

/** === COMPONENT === */
export const ModalProductList: FC<ModalProductList> = ({
  isOpen,
  close,
  data,
}) => {
  /** === HOOK === */

  const productDetail = () => {
    return <View style={{ paddingBottom: 16 }}>{productList()}</View>;
  };

  const productList = () => {
    return data.map((product) => (
      <>
        <View style={CheckoutStyle.modalDetailItemContainer}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ marginRight: 8 }}>
              <Image
                source={{ uri: product.urlImages }}
                style={CheckoutStyle.skuImage}
              />
            </View>
            <View style={{ flexWrap: 'wrap', flex: 1, paddingRight: 8 }}>
              <View>
                <SnbText.B4>{product.productName}</SnbText.B4>
              </View>
              <SnbText.C2 color={color.red50}>
                {toCurrency(product.displayPrice, { withFraction: false })}
              </SnbText.C2>
              <SnbText.C1>
                x{product.qty} {product.uom}
              </SnbText.C1>
            </View>
          </View>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
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
      title={'Daftar Produk'}
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
