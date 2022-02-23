/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText,
  SnbCheckbox,
  SnbIcon,
  color,
  SnbNumberCounter,
  SnbBadge,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useCartLocalData } from '../../functions';
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import * as models from '@models';

interface ProductViewProps {
  product: models.CartMasterSellersProducts;
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
}

export const ProductView: FC<ProductViewProps> = ({
  product,
  handleRemoveProductModal,
}) => {
  const { updateQty } = useCartLocalData();
  /** => REMAINING STOCK */
  const renderRemainingStock = () => {
    if (Number(product.stock) < 11) {
      return (
        <View>
          <SnbText.B4
            color={
              color.red70
            }>{`Tersedia ${product.stock} Kardus`}</SnbText.B4>
        </View>
      );
    }
  };
  /** => PRODUCT IMAGE */
  const renderProductImage = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{
            uri: product.productImageUrl,
          }}
          style={ShoppingCartStyles.productImg}
        />
      </View>
    );
  };
  /** => PPN BADGE */
  const renderPPNBadge = () => {
    if (product.isPriceAfterTax) {
      return (
        <View style={{ marginBottom: 5 }}>
          <SnbBadge.Label
            type="warning"
            value={`Include PPN ${product.taxPercentage}%`}
          />
        </View>
      );
    }
  };
  /** => REMOVE PRODUCT ICON */
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
  return (
    <View style={ShoppingCartStyles.horizontalCardContent}>
      <View style={{ flexDirection: 'row' }}>
        <View style={ShoppingCartStyles.checkboxContainer}>
          <SnbCheckbox
            status={product.selected ? 'selected' : 'unselect'}
            onPress={() => {}}
          />
        </View>
        {renderProductImage()}
        <View style={{ justifyContent: 'center' }}>
          {renderPPNBadge()}
          <View
            style={{
              width: '100%',
            }}>
            <SnbText.B4 color={color.black80}>{product.productName}</SnbText.B4>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{ marginRight: 5 }}>
              <SnbText.B4
                color={color.black60}
                textDecorationLine="line-through">
                {toCurrency(Number(product.lastUsedPrice), {
                  withFraction: false,
                })}
              </SnbText.B4>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SnbText.B4 color={color.black100}>
                {toCurrency(Number(product.price), { withFraction: false })}
              </SnbText.B4>
              <SnbIcon
                name="arrow_drop_down_circle"
                style={{ color: color.green50, marginLeft: 5 }}
                size={16}
              />
            </View>
          </View>
          {renderRemainingStock()}
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer}>
        {renderRemoveProductIcon()}
        <SnbNumberCounter
          value={product.qty}
          maxLength={6}
          onBlur={() => {}}
          onFocus={() => {}}
          onIncrease={() => {
            updateQty({
              productId: product.productId,
              sellerId: product.sellerId,
              warehouseId: product.warehouseId,
              type: 'increase',
            });
          }}
          onDecrease={() => {
            updateQty({
              productId: product.productId,
              sellerId: product.sellerId,
              warehouseId: product.warehouseId,
              type: 'decrease',
            });
          }}
          onChange={() => {}}
          minusDisabled={false}
          plusDisabled={false}
        />
      </View>
      <View style={ShoppingCartStyles.actionContainer} />
    </View>
  );
};
