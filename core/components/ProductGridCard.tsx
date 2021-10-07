/** === EXTERNAL === */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color, styles } from 'react-native-sinbad-ui';
import { Svg, Polygon } from 'react-native-svg';
/** === INTERNAL === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === STYLE === */
import { ProductGridCardStyle } from '../styles';
/** === TYPE === */
interface ProductGridCardProps {
  flexOne?: boolean;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  uom: string;
  isBundle?: boolean;
  isPromo?: boolean;
  isExclusive?: boolean;
  onCardPress?: () => void;
  withOrderButton?: boolean;
  onOrderPress?: () => void;
}
/** === COMPONENT === */
export const ProductGridCard: FC<ProductGridCardProps> = (props) => {
  /** => Promo Tag */
  const renderPromoTag = () => (
    <View style={ProductGridCardStyle.promoTagContainer}>
      <View>
        <Svg height="26" width="26" style={{ marginRight: -0.1 }}>
          <Polygon points="26,0 26,26 13,13" fill={color.green50} />
        </Svg>
      </View>
      <View style={ProductGridCardStyle.promoTagContent}>
        <SnbText.C1 color={color.white}>Promo</SnbText.C1>
      </View>
    </View>
  );
  /** => Exclusive Tag */
  const renderExclusiveTag = () => (
    <View
      style={{
        paddingHorizontal: 12,
        paddingTop: 8,
      }}>
      <View style={ProductGridCardStyle.exclusiveTagContainer}>
        <SnbIcon
          name="stars"
          color={color.yellow50}
          size={18}
          style={{ marginRight: 4 }}
        />
        <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
      </View>
    </View>
  );
  /** => Product Info */
  const renderProductInfo = () => (
    <>
      <SnbText.C1 color={color.black100}>{props.name}</SnbText.C1>
      <View style={{ marginVertical: 8 }}>
        <SnbText.C1 color={color.red50}>
          {toCurrency(props.price, { withFraction: false })}
        </SnbText.C1>
      </View>
      <SnbText.C1 color={color.black100}>
        {`Tersisa ${props.stock} ${props.uom}`}
      </SnbText.C1>
    </>
  );
  /** => Main */
  return (
    <View
      style={{
        flex: props.flexOne ? 1 : undefined,
        backgroundColor: color.white,
      }}>
      <View style={ProductGridCardStyle.innnerContainer}>
        <TouchableOpacity
          style={[styles.shadowForBox10, { borderRadius: 6, flex: 1 }]}
          onPress={() => {
            if (props.onCardPress) {
              props.onCardPress();
            }
          }}>
          <View>
            {(props.isPromo || props.isBundle) && renderPromoTag()}
            <Image
              source={{ uri: props.imageUrl }}
              style={ProductGridCardStyle.image}
            />
          </View>
          {props.isExclusive && renderExclusiveTag()}
          <View style={{ padding: 12 }}>
            {renderProductInfo()}
            {props.withOrderButton && (
              <TouchableOpacity
                style={ProductGridCardStyle.orderButton}
                onPress={props.onOrderPress}>
                <SnbText.C1 color={color.white}>Pesan</SnbText.C1>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
