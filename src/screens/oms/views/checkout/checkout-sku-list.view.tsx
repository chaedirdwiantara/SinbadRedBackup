/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import { toCurrency } from '@core/functions/global/currency-format';
import { SnbText2, colorV2 } from 'react-native-sinbad-ui';
import { testProps } from '@core/functions/global/test-props';
/** === TYPE === */
import * as models from '@models';
export interface CheckoutSKUListViewProps {
  products: models.CheckoutCartProduct[];
  testID: string;
}

/** === COMPONENT === */
export const CheckoutSKUListView: FC<CheckoutSKUListViewProps> = ({
  products,
  testID,
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
                {...testProps(`img.product${products[0].productId}.${testID}`)}
                source={{ uri: products[0].productImageUrl }}
                style={CheckoutStyle.skuImage}
              />
              <View style={CheckoutStyle.productsDescription}>
                <SnbText2.Paragraph.Default
                  testID={`productName.product${products[0].productId}.${testID}`}
                  color={colorV2.textColor.secondary}>
                  {products[0].productName}
                </SnbText2.Paragraph.Default>
                <SnbText2.Paragraph.Small
                  testID={`orderQty.product${products[0].productId}.${testID}`}
                  color={colorV2.textColor.secondary}>
                  {products[0].qty} {products[0].uomLabel}
                </SnbText2.Paragraph.Small>
                <SnbText2.Body.Default
                  testID={`displayPrice.product${products[0].productId}.${testID}`}
                  color={colorV2.textColor.default}>
                  {toCurrency(products[0].priceAfterTax, {
                    withFraction: false,
                  })}
                </SnbText2.Body.Default>
              </View>
            </View>
            {productLength > 1 ? (
              <TouchableOpacity
                {...testProps(`btn-seeAllProduct.${testID}`)}
                onPress={() => setShowAllProduct(true)}
                style={CheckoutStyle.showMoreProduct}>
                <SnbText2.Body.Tiny
                  testID={`title.btn-seeAllProduct.${testID}`}
                  color={colorV2.textColor.link}>
                  Lihat {productLength - 1} produk lainnya
                </SnbText2.Body.Tiny>
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
                    {...testProps(`img.product${item.productId}.${testID}`)}
                    source={{ uri: item.productImageUrl }}
                    style={CheckoutStyle.skuImage}
                  />
                  <View style={CheckoutStyle.productsDescription}>
                    <SnbText2.Paragraph.Default
                      testID={`productName.product${item.productId}.${testID}`}
                      color={colorV2.textColor.secondary}>
                      {item.productName}
                    </SnbText2.Paragraph.Default>
                    <SnbText2.Paragraph.Small
                      testID={`orderQty.product${item.productId}.${testID}`}
                      color={colorV2.textColor.secondary}>
                      {item.qty} {item.uomLabel}
                    </SnbText2.Paragraph.Small>
                    <SnbText2.Body.Default
                      testID={`displayPrice.product${item.productId}.${testID}`}
                      color={colorV2.textColor.default}>
                      {toCurrency(item.priceAfterTax, { withFraction: false })}
                    </SnbText2.Body.Default>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              testID={`btn-seeAllProduct.${testID}`}
              onPress={() => setShowAllProduct(false)}
              style={CheckoutStyle.showMoreProduct}>
              <SnbText2.Body.Tiny
                testID={`title.btn-seeAllProduct.${testID}`}
                color={colorV2.textColor.link}>
                Sembunyikan {productLength - 1} produk lainnya
              </SnbText2.Body.Tiny>
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
