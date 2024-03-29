/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText2,
  SnbCheckbox2,
  SnbIcon,
  SnbNumberCounter2,
  colorV2,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { Images } from 'src/assets';
import * as models from '@models';
import Svg from '@svg';
import { testProps } from '@core/functions/global/test-props';

interface ProductViewProps {
  product: models.CartMasterSellersProducts;
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleUpdateQty: ({
    productId,
    sellerId,
    warehouseId,
    type,
  }: models.UpdateCartQty) => void;
  handleUpdateSelected: ({
    productId,
    sellerId,
    warehouseId,
  }: models.ProductKeyObject) => void;
  keyboardFocus: { isFocus: boolean; setFocus: (val: boolean) => void };
  testID: string;
}

export const ProductView: FC<ProductViewProps> = ({
  product,
  handleRemoveProductModal,
  handleUpdateQty,
  handleUpdateSelected,
  keyboardFocus,
  testID,
}) => {
  /** => HANDLE DISPLAY PRICE */
  const handleDisplayPrice = () => {
    let displayPrice: number = 0;
    let lastPrice: number = 0;

    if (product.priceRules.length > 0) {
      const priceRulesFirstItem = product.priceRules[0];
      if (product.qty < priceRulesFirstItem.minQty) {
        displayPrice = product.priceAfterTax;
      } else {
        for (let x = 0; x < product.priceRules.length; x++) {
          const isLast = x === product.priceRules.length - 1;
          if (!isLast) {
            if (
              product.qty >= product.priceRules[x].minQty &&
              product.qty < product.priceRules[x + 1].minQty
            ) {
              displayPrice = product.priceRules[x].priceAfterTax;
              break;
            }
          } else {
            displayPrice = product.priceRules[x].priceAfterTax;
          }
        }
      }
    } else {
      displayPrice = product.priceAfterTax;
    }

    lastPrice = product.lastUsedPrice;

    // make a string variable to determine if the price is higher / lower / same
    let priceDifference = '';
    if (displayPrice === lastPrice) {
      priceDifference = 'same';
    } else if (displayPrice < lastPrice) {
      priceDifference = 'lower';
    } else {
      priceDifference = 'higher';
    }

    return { displayPrice, lastPrice, priceDifference };
  };
  /** => HANDLE ON BLUR */
  const handleOnBlur = () => {
    keyboardFocus.setFocus(false);
  };
  /** => RENDER UOM INFORMAATION */
  const renderUOMInformation = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <SnbText2.Paragraph.Tiny
          testID={`uomLabel.product${product.productId}.${testID}`}
          color={colorV2.textColor.secondary}>
          {product.uomLabel}
        </SnbText2.Paragraph.Tiny>
        {renderRemainingStock()}
      </View>
    );
  };
  /** => RENDER REMAINING STOCK */
  const renderRemainingStock = () => {
    if (Number(product.stock) < 11) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <SnbText2.Paragraph.Tiny color={colorV2.strokeColor.default}>
            {'  |  '}
          </SnbText2.Paragraph.Tiny>
          <SnbText2.Paragraph.Tiny
            testID={`remainingStock.product${product.productId}.${testID}`}
            color={
              colorV2.strokeColor.primary
            }>{`Sisa ${product.stock} ${product.uomLabel}`}</SnbText2.Paragraph.Tiny>
        </View>
      );
    }
  };
  /** => RENDER PRODUCT IMAGE */
  const renderProductImage = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
        <Image
          {...testProps(`img.product${product.productId}.${testID}`)}
          source={{
            uri: product.productImageUrl,
          }}
          defaultSource={Images.opacityPlaceholder}
          style={ShoppingCartStyles.productImg}
        />
      </View>
    );
  };
  /** => RENDER REMOVE PRODUCT ICON */
  const renderRemoveProductIcon = () => {
    return (
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
            source: 'available',
            removedProducts,
          });
        }}
        style={{ marginRight: 20 }}>
        <SnbIcon
          {...testProps(
            `icon.btn-removeProduct.product${product.productId}.${testID}`,
          )}
          name="delete"
          color={colorV2.btnSecColor.default}
          size={24}
        />
      </TouchableOpacity>
    );
  };
  /** => RENDER PRICE SECTION */
  const renderPriceSection = () => {
    const { displayPrice, lastPrice, priceDifference } = handleDisplayPrice();

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {priceDifference !== 'same' && !product.isQtyChanged ? (
          <View style={{ marginRight: 5 }}>
            <SnbText2.Paragraph.Small
              testID={`priceDifference.price.product${product.productId}.${testID}`}
              color={colorV2.textColor.disable}
              textDecorationLine="line-through">
              {toCurrency(lastPrice, {
                withFraction: false,
              })}
            </SnbText2.Paragraph.Small>
          </View>
        ) : (
          <View />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SnbText2.Body.Small
            testID={`displayPrice.price.product${product.productId}.${testID}`}
            color={colorV2.textColor.default}>
            {toCurrency(displayPrice, {
              withFraction: false,
            })}
          </SnbText2.Body.Small>
          {priceDifference !== 'same' && !product.isQtyChanged ? (
            <View style={{ marginLeft: 4 }}>
              <Svg
                {...testProps(
                  `icon.price.product${product.productId}.${testID}`,
                )}
                name={
                  priceDifference === 'higher'
                    ? 'price_changes_up'
                    : 'price_changes_down'
                }
                size={16}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  };

  // determine inc / dec disabled
  let isDecreaseDisabled = false;
  let isIncreaseDisabled = false;
  const stock = product.stock ?? 0;

  isDecreaseDisabled = !(product.qty > product.minQty);
  isIncreaseDisabled = !(product.qty < stock);

  return (
    <View style={ShoppingCartStyles.horizontalCardContent}>
      <View style={{ flexDirection: 'row' }}>
        <View style={ShoppingCartStyles.checkboxContainer}>
          <SnbCheckbox2
            testID={`checkbox.product${product.productId}.${testID}`}
            checked={product.selected}
            onChange={() => {
              if (product.sellerId) {
                handleUpdateSelected({
                  productId: product.productId,
                  sellerId: product.sellerId,
                  warehouseId: product.warehouseId,
                });
              }
            }}
          />
        </View>
        {renderProductImage()}
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <View>
            <SnbText2.Paragraph.Default
              testID={`productName.product${product.productId}.${testID}`}
              color={colorV2.textColor.secondary}>
              {product.productName}
            </SnbText2.Paragraph.Default>
          </View>
          {renderPriceSection()}
          {renderUOMInformation()}
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer}>
        <View>
          <SnbText2.Caption.Default
            testID={`qtyPerBox.product${product.productId}.${testID}`}
            color={
              colorV2.textColor.secondary
            }>{`${product.qtyPerBox} Pcs dalam 1 ${product.uomLabel}`}</SnbText2.Caption.Default>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderRemoveProductIcon()}
          <SnbNumberCounter2
            testID={`numberCounter.product${product.productId}.${testID}`}
            value={product.qty}
            maxLength={6}
            onBlur={() => {
              handleOnBlur();
            }}
            onFocus={() => {
              keyboardFocus.setFocus(true);
            }}
            onIncrease={() => {
              if (product.sellerId) {
                handleUpdateQty({
                  productId: product.productId,
                  sellerId: product.sellerId,
                  warehouseId: product.warehouseId,
                  type: 'increase',
                });
              }
            }}
            onDecrease={() => {
              if (product.sellerId) {
                handleUpdateQty({
                  productId: product.productId,
                  sellerId: product.sellerId,
                  warehouseId: product.warehouseId,
                  type: 'decrease',
                });
              }
            }}
            onChange={(newQty: number) => {
              if (product.sellerId) {
                handleUpdateQty({
                  productId: product.productId,
                  sellerId: product.sellerId,
                  warehouseId: product.warehouseId,
                  type: 'onChange',
                  newQty,
                });
              }
            }}
            minusDisabled={isDecreaseDisabled}
            plusDisabled={isIncreaseDisabled}
          />
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer} />
    </View>
  );
};
