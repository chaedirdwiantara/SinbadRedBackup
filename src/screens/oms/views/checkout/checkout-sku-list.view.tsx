/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import { toCurrency } from '@core/functions/global/currency-format';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === TYPE === */
import * as models from '@models';
export interface CheckoutSKUListViewProps {
  products: models.CheckoutCartProduct[];
}

/** === COMPONENT === */
export const CheckoutSKUListView: FC<CheckoutSKUListViewProps> = ({
  products,
}) => {
  /** === HOOK === */
  const [showAllProduct, setShowAllProduct] = useState(false);

  const productLength = products.length;

  return (
    <>
      <View>
        {showAllProduct === false ? (
          <>
            <View style={CheckoutStyle.productsContainer}>
              <Image
                source={{ uri: products[0].productImageUrl }}
                style={CheckoutStyle.skuImage}
              />
              <View style={CheckoutStyle.productsDescription}>
                <SnbText.B4 color={color.black60}>
                  {products[0].productName}
                </SnbText.B4>
                <SnbText.B4 color={color.black60}>
                  {products[0].qty} {products[0].uomLabel}
                </SnbText.B4>
                <SnbText.B4 color={color.black100}>
                  {toCurrency(products[0].priceAfterTax, {
                    withFraction: false,
                  })}
                </SnbText.B4>
              </View>
            </View>
            {productLength > 1 ? (
              <TouchableOpacity
                onPress={() => setShowAllProduct(true)}
                style={CheckoutStyle.showMoreProduct}>
                <SnbText.B2 color={color.blue50}>
                  Lihat {productLength - 1} produk lainnya
                </SnbText.B2>
              </TouchableOpacity>
            ) : null}
          </>
        ) : (
          <>
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={products}
              renderItem={({ item }) => (
                <View style={CheckoutStyle.productsContainer}>
                  <Image
                    source={{ uri: item.productImageUrl }}
                    style={CheckoutStyle.skuImage}
                  />
                  <View style={CheckoutStyle.productsDescription}>
                    <SnbText.B4 color={color.black60}>
                      {item.productName}
                    </SnbText.B4>
                    <SnbText.B4 color={color.black60}>
                      {item.qty} {item.uomLabel}
                    </SnbText.B4>
                    <SnbText.B4 color={color.black100}>
                      {toCurrency(item.priceAfterTax, { withFraction: false })}
                    </SnbText.B4>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => setShowAllProduct(false)}
              style={CheckoutStyle.showMoreProduct}>
              <SnbText.B2 color={color.blue50}>
                Sembunyikan {productLength - 1} produk lainnya
              </SnbText.B2>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
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
