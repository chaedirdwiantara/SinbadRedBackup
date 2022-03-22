/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText2,
  SnbCheckbox,
  SnbIcon,
  color,
  SnbNumberCounter,
  SnbBadge,
  SnbText,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { Images } from 'src/assets';
import * as models from '@models';

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
}

export const ProductView: FC<ProductViewProps> = ({
  product,
  handleRemoveProductModal,
  handleUpdateQty,
  handleUpdateSelected,
  keyboardFocus,
}) => {
  /** => HANDLE DISPLAY PRICE */
  const handleDisplayPrice = () => {
    let displayPrice: number = 0;
    let lastPrice: number = 0;

    if (product.priceRules.length > 0) {
      const priceRulesLastItem =
        product.priceRules[product.priceRules.length - 1];
      if (priceRulesLastItem.maxQty <= product.qty) {
        displayPrice = priceRulesLastItem.price;
      } else {
        product.priceRules.map((priceRulesItem) => {
          if (
            product.qty >= priceRulesItem.minQty &&
            product.qty <= priceRulesItem.maxQty
          ) {
            displayPrice = priceRulesItem.price;
          }
        });
      }
    } else {
      displayPrice = product.price;
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
  const handleOnBlur = ({
    qty,
    minQty,
    multipleQty,
  }: models.updateCartQtyBlur) => {
    // if the user update qty using keyboard
    let updatedQty = 1;
    if (qty && Number.isInteger(qty)) {
      if (multipleQty > 1) {
        const isMod = (qty - minQty) % multipleQty === 0;
        const minValue = minQty;
        const maxValue = stock - ((stock + minQty) % multipleQty);
        if (qty <= maxValue && qty >= minValue) {
          if (isMod) {
            updatedQty = qty;
          } else {
            const modValue = (qty - minQty) % multipleQty;
            updatedQty = qty - modValue;
          }
        } else if (qty < minValue) {
          updatedQty = minValue;
        } else if (qty > maxValue) {
          updatedQty = maxValue;
        }
      } else {
        if (qty <= stock && qty >= minQty) {
          updatedQty = qty;
        } else if (qty < minQty) {
          updatedQty = minQty;
        } else if (qty > stock) {
          updatedQty = stock;
        }
      }
    }

    if (product.sellerId) {
      handleUpdateQty({
        productId: product.productId,
        sellerId: product.sellerId,
        warehouseId: product.warehouseId,
        type: 'onBlur',
        newQty: updatedQty,
      });
    }

    keyboardFocus.setFocus(false);
  };
  /** => RENDER REMAINING STOCK */
  const renderRemainingStock = () => {
    if (Number(product.stock) < 11) {
      return (
        <View>
          <SnbText.B4
            color={
              color.red70
            }>{`Tersedia ${product.stock} ${product.uomLabel}`}</SnbText.B4>
        </View>
      );
    }
  };
  /** => RENDER PRODUCT IMAGE */
  const renderProductImage = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{
            uri: product.productImageUrl,
          }}
          defaultSource={Images.opacityPlaceholder}
          style={ShoppingCartStyles.productImg}
        />
      </View>
    );
  };
  /** => RENDER PPN BADGE */
  const renderPPNBadge = () => {
    if (product.isPriceAfterTax) {
      return (
        <View style={{ marginBottom: 5 }}>
          <SnbBadge.Label
            type="warning"
            value={`Termasuk Pajak ${product.taxPercentage}%`}
          />
        </View>
      );
    }
  };
  /** => RENDER REMOVE PRODUCT ICON */
  const renderRemoveProductIcon = () => {
    return (
      <TouchableOpacity
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
        style={{ marginRight: 5 }}>
        <SnbIcon name="delete_outline" color={color.black80} size={32} />
      </TouchableOpacity>
    );
  };
  /** => RENDER PRICE SECTION */
  const renderPriceSection = () => {
    const { displayPrice, lastPrice, priceDifference } = handleDisplayPrice();

    let arrowIconName: string = 'arrow_drop_down';
    let arrowIconColor: string = color.green50;
    if (priceDifference === 'higher') {
      arrowIconName = 'arrow_drop_up';
      arrowIconColor = color.red50;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {priceDifference !== 'same' ? (
          <View style={{ marginRight: 5 }}>
            <SnbText.B4 color={color.black60} textDecorationLine="line-through">
              {toCurrency(lastPrice, {
                withFraction: false,
              })}
            </SnbText.B4>
          </View>
        ) : (
          <View />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SnbText.B4 color={color.black100}>
            {toCurrency(displayPrice, {
              withFraction: false,
            })}
          </SnbText.B4>
          {priceDifference !== 'same' ? (
            <SnbIcon
              name={arrowIconName}
              style={{ color: arrowIconColor, marginLeft: 5 }}
              size={24}
            />
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

  if (product.multipleQty > 1) {
    isDecreaseDisabled = !(product.qty - product.multipleQty >= product.minQty);
    isIncreaseDisabled = !(product.qty + product.multipleQty < stock);
  } else {
    isDecreaseDisabled = !(product.qty > product.minQty);
    isIncreaseDisabled = !(product.qty < stock);
  }

  return (
    <View style={ShoppingCartStyles.horizontalCardContent}>
      <View style={{ flexDirection: 'row' }}>
        <View style={ShoppingCartStyles.checkboxContainer}>
          <SnbCheckbox
            status={product.selected ? 'selected' : 'unselect'}
            onPress={() => {
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
          {renderPPNBadge()}
          <View style={{ flex: 1 }}>
            <SnbText2.Paragraph.Default
              color={color.black80}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {product.productName}
            </SnbText2.Paragraph.Default>
          </View>
          {renderPriceSection()}
          {renderRemainingStock()}
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer}>
        {renderRemoveProductIcon()}
        <View>
          <SnbNumberCounter
            value={product.qty}
            maxLength={6}
            onBlur={() => {
              handleOnBlur({
                qty: product.qty,
                minQty: product.minQty,
                multipleQty: product.multipleQty,
              });
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
          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <SnbText.B4
              color={
                color.black60
              }>{`${product.qtyPerBox}pcs dalam 1 ${product.uomLabel}`}</SnbText.B4>
          </View>
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer} />
    </View>
  );
};
