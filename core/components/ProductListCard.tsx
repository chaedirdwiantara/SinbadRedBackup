/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
import { Svg, Polygon } from 'react-native-svg';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE === */
import { ProductListCardStyle } from '../styles';
/** === TYPE === */
interface ProductListCardProps {
  name: string;
  imageUrl: string;
  price: number;
  isBundle?: boolean;
  isPromo?: boolean;
  isExclusive?: boolean;
  onCardPress?: () => void;
  withOrderButton?: boolean;
  onOrderPress?: () => void;
}
/** === COMPONENTS === */
const PromoTag = () => (
  <View style={ProductListCardStyle.promoTagContainer}>
    <View style={ProductListCardStyle.promoTagContent}>
      <SnbText.C1 color={color.white}>Promo</SnbText.C1>
    </View>
    <View>
      <Svg height="26" width="26" style={{ marginLeft: -0.1 }}>
        <Polygon points="0,0 0,26 13,13" fill={color.green50} />
      </Svg>
    </View>
  </View>
);

const ExclusiveTag = () => (
  <View style={ProductListCardStyle.exclusiveTagContainer}>
    <SnbIcon
      name="stars"
      color={color.yellow50}
      size={18}
      style={{ marginRight: 4 }}
    />
    <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
  </View>
);

export const ProductListCard: FC<ProductListCardProps> = (props) => (
  <View style={ProductListCardStyle.container}>
    <TouchableOpacity
      style={[
        ProductListCardStyle.shadowForBox5,
        ProductListCardStyle.clickableContainer,
      ]}
      onPress={() => {
        if (props.onCardPress) {
          props.onCardPress();
        }
      }}>
      {(props.isPromo || props.isBundle) && <PromoTag />}
      <Image
        source={{ uri: props.imageUrl }}
        style={ProductListCardStyle.image}
      />
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View>
          {props.isExclusive && <ExclusiveTag />}
          {/* Product Info */}
          <View style={{ marginTop: 8 }}>
            <SnbText.C1 color={color.black100}>{props.name}</SnbText.C1>
            {!props.isExclusive && (
              <View style={{ marginTop: 8 }}>
                <SnbText.C1 color={color.red50}>
                  {toCurrency(props.price, { withFraction: false })}
                </SnbText.C1>
              </View>
            )}
          </View>
        </View>
        {props.withOrderButton && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: props.isExclusive ? 'space-between' : 'flex-end',
              alignItems: 'center',
            }}>
            {props.isExclusive && (
              <SnbText.C1 color={color.red50}>
                {toCurrency(props.price, { withFraction: false })}
              </SnbText.C1>
            )}
            <TouchableOpacity
              style={ProductListCardStyle.orderButton}
              onPress={props.onOrderPress}>
              <SnbText.C1 color={color.white}>Pesan</SnbText.C1>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);
