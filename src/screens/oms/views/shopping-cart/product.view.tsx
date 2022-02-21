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
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import * as models from '@models';

interface ProductViewProps {
  product: models.CartMasterSellersProducts;
}

export const ProductView: FC<ProductViewProps> = ({ product }) => {
  return (
    <View
      style={{
        ...ShoppingCartStyles.horizontalBottomCardSlot,
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              marginRight: 20,
              justifyContent: 'center',
            }}>
            <SnbCheckbox status={'unselect'} onPress={() => {}} />
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {}}>
            <Image
              source={{
                uri: product.productImageUrl,
              }}
              style={{ width: 65, height: 65, marginRight: 5 }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}>
            {product.isPriceAfterTax ? (
              <View style={{ marginBottom: 5 }}>
                <SnbBadge.Label
                  type="warning"
                  value={`Include PPN ${product.taxPercentage}%`}
                />
              </View>
            ) : (
              <View />
            )}
            <View
              style={{
                width: '100%',
              }}>
              <SnbText.B4 color={color.black80}>
                {product.productName}
              </SnbText.B4>
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
                  {toCurrency(product.price, { withFraction: false })}
                </SnbText.B4>
                <SnbIcon
                  name="arrow_drop_down_circle"
                  style={{ color: color.green50, marginLeft: 5 }}
                  size={16}
                />
              </View>
            </View>
            {Number(product.stock) < 11 ? (
              <View>
                <SnbText.B4
                  color={
                    color.red70
                  }>{`Tersedia ${product.stock} Kardus`}</SnbText.B4>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 12,
          }}>
          <TouchableOpacity onPress={() => {}} style={{ marginRight: 5 }}>
            <SnbIcon name="delete_outline" color={color.black80} size={32} />
          </TouchableOpacity>
          <SnbNumberCounter
            value={product.qty}
            maxLength={6}
            onBlur={() => {}}
            onFocus={() => {}}
            onIncrease={() => {}}
            onDecrease={() => {}}
            onChange={() => {}}
            minusDisabled={false}
            plusDisabled={false}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 12,
          }}>
          <SnbText.B4
            color={
              color.black60
            }>{`${product.qtyPerBox}pcs dalam 1 Kardus`}</SnbText.B4>
        </View>
      </View>
    </View>
  );
};
