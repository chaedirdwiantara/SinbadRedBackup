/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText2,
  SnbCheckbox2,
  SnbIcon,
  colorV2,
  SnbGrayscaleImage,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import { goToProduct } from '@screen/category/functions';
import * as models from '@models';
import { UnavailableAccordionView } from './product-not-available-accordion.view';
import { Images } from 'src/assets';
import { testProps } from '@core/functions/global/test-props';

interface ProductUnavailableViewProps {
  unavailableProducts: models.CartMasterUnavailable[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleScrollToBottom: () => void;
  testID: string;
}

export const ProductUnavailableView: FC<ProductUnavailableViewProps> = ({
  unavailableProducts,
  handleRemoveProductModal,
  handleScrollToBottom,
  testID,
}) => {
  /** => PRODUCT IMAGE */
  const renderProductImage = (product: models.CartMasterUnavailable) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
        <SnbGrayscaleImage grayscaleAmount={1} brightnessAmount={1}>
          <Image
            testID={`img.product${product.productId}.${testID}`}
            source={{
              uri: product.productImageUrl,
            }}
            defaultSource={Images.opacityPlaceholder}
            style={ShoppingCartStyles.productImg}
          />
        </SnbGrayscaleImage>
      </View>
    );
  };
  /** => ACTION SECTION */
  const renderActionSection = (product: models.CartMasterUnavailable) => {
    return (
      <View style={ShoppingCartStyles.unavailableActionContainer}>
        <TouchableOpacity
          {...testProps(
            `btn-searchSameKindProduct.product${product.productId}.${testID}`,
          )}
          onPress={() => {
            const category = {
              id: product.categoryId,
              name: '',
              icon: '',
              hasChild: false,
            };
            goToProduct(category);
          }}>
          <SnbText2.Body.Tiny
            testID={`label.btn-searchSameKindProduct.product${product.productId}.${testID}`}
            color={colorV2.textColor.link}>
            Cari Produk Sejenis
          </SnbText2.Body.Tiny>
        </TouchableOpacity>
        <TouchableOpacity
          {...testProps(
            `btn-removeProduct.product${product.productId}.${testID}`,
          )}
          onPress={() => {
            const removedProducts: models.RemovedProducts[] = [];
            removedProducts.push({
              productId: product.productId,
              warehouseId: product.warehouseId,
            });
            handleRemoveProductModal({
              source: 'unavailable',
              removedProducts,
            });
          }}>
          <SnbIcon
            {...testProps(
              `icon.btn-removeProduct.product${product.productId}.${testID}`,
            )}
            name="delete"
            color={colorV2.btnSecColor.default}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <React.Fragment>
      <View
        key={`${unavailableProducts[0].productId}.${unavailableProducts[0].sellerId}`}
        style={ShoppingCartStyles.horizontalCardContent}>
        <View style={{ flexDirection: 'row' }}>
          <View style={ShoppingCartStyles.checkboxContainer}>
            <SnbCheckbox2
              testID={`checkbox.product${unavailableProducts[0].productId}.${testID}`}
              disabled={true}
              checked={false}
              onChange={() => {}}
            />
          </View>
          {renderProductImage(unavailableProducts[0])}
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <SnbText2.Paragraph.Default
                testID={`productName.product${unavailableProducts[0].productId}.${testID}`}
                color={colorV2.textColor.disable}>
                {unavailableProducts[0].productName}
              </SnbText2.Paragraph.Default>
              <SnbText2.Paragraph.Tiny
                testID={`unavailableMessage.product${unavailableProducts[0].productId}.${testID}`}
                color={colorV2.textColor.default}>
                {unavailableProducts[0].unavailableMessage}
              </SnbText2.Paragraph.Tiny>
            </View>
          </View>
        </View>
        {renderActionSection(unavailableProducts[0])}
      </View>
      <UnavailableAccordionView
        totalRemaining={unavailableProducts.slice(1).length}
        handleScrollToBottom={handleScrollToBottom}>
        {unavailableProducts.slice(1).map((item) => {
          return (
            <View
              key={`${item.productId}.${item.sellerId}`}
              style={ShoppingCartStyles.horizontalCardContent}>
              <View style={{ flexDirection: 'row' }}>
                <View style={ShoppingCartStyles.checkboxContainer}>
                  <SnbCheckbox2
                    testID={`checkbox.product${item.productId}.${testID}`}
                    disabled={true}
                    checked={false}
                    onChange={() => {}}
                  />
                </View>
                {renderProductImage(item)}
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <SnbText2.Paragraph.Default
                      testID={`productName.product${item.productId}.${testID}`}
                      color={colorV2.textColor.disable}>
                      {item.productName}
                    </SnbText2.Paragraph.Default>
                    <SnbText2.Paragraph.Tiny
                      testID={`unavailableMessage.product${item.productId}.${testID}`}
                      color={colorV2.textColor.default}>
                      {item.unavailableMessage}
                    </SnbText2.Paragraph.Tiny>
                  </View>
                </View>
              </View>
              {renderActionSection(item)}
            </View>
          );
        })}
      </UnavailableAccordionView>
    </React.Fragment>
  );
};
