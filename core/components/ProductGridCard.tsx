/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
import { Svg, Polygon } from 'react-native-svg';
/** === IMPORT FUNCTION === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE === */
import { ProductGridCardStyle } from '../styles';
/** === TYPES === */
interface ProductGridCardProps {
  flexOne?: boolean;
  name: string;
  imageUrl: string;
  price: number;
  currentPrice?: number;
  isBundle?: boolean;
  isPromo?: boolean;
  isExclusive?: boolean;
  onCardPress?: () => void;
  withOrderButton?: boolean;
  onOrderPress?: () => void;
}

interface ProductGridCardInfoProps {
  name: string;
  price: number;
  currentPrice?: number;
}
/** === COMPONENTS === */
const PromoTag = () => (
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

const ExclusiveTag = () => (
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

const ProductGridCardInfo: FC<ProductGridCardInfoProps> = ({
  name,
  currentPrice,
  price,
}) => {
  /** === DERIVED VALUES === */
  const hasCurrentPrice = Boolean(currentPrice);
  const usedPrice = hasCurrentPrice ? currentPrice! : price;
  /** === VIEW === */
  return (
    <>
      <SnbText.C1 color={color.black100}>{name}</SnbText.C1>
      {hasCurrentPrice && (
        <View style={{ marginTop: 8 }}>
          <SnbText.C3 color={color.black40}>
            {toCurrency(price, { withFraction: false })}
          </SnbText.C3>
        </View>
      )}
      <View style={{ marginTop: 8 }}>
        <SnbText.C1 color={color.red50}>
          {toCurrency(usedPrice, { withFraction: false })}
        </SnbText.C1>
      </View>
    </>
  );
};

export const ProductGridCard: FC<ProductGridCardProps> = (props) => (
  <View
    style={{
      flex: props.flexOne ? 1 : undefined,
      backgroundColor: color.white,
    }}>
    <View style={ProductGridCardStyle.innnerContainer}>
      <TouchableOpacity
        style={[
          ProductGridCardStyle.shadowForBox5,
          { borderRadius: 6, flex: 1 },
        ]}
        onPress={() => {
          if (props.onCardPress) {
            props.onCardPress();
          }
        }}>
        <View>
          {(props.isPromo || props.isBundle) && <PromoTag />}
          <Image
            source={{ uri: props.imageUrl }}
            style={ProductGridCardStyle.image}
          />
        </View>
        {props.isExclusive && <ExclusiveTag />}
        <View style={{ padding: 12 }}>
          <ProductGridCardInfo
            name={props.name}
            price={props.price}
            currentPrice={props.currentPrice}
          />
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
