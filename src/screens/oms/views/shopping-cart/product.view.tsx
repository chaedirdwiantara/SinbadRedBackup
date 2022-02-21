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

interface ProductViewProps {}

export const ProductView: FC<ProductViewProps> = ({}) => {
  return (
    <View style={ShoppingCartStyles.horizontalCardContent}>
      <View style={{ flexDirection: 'row' }}>
        <View style={ShoppingCartStyles.checkboxContainer}>
          <SnbCheckbox status={'unselect'} onPress={() => {}} />
        </View>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {}}>
          <Image
            source={{
              uri: 'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/15731/image_1617790892428.png',
            }}
            style={ShoppingCartStyles.productImg}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ marginBottom: 5 }}>
            <SnbBadge.Label type="warning" value="Include PPN 10%" />
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '100%',
            }}>
            <SnbText.B4 color={color.black80}>
              SGM Ananda 1 - Varian Omicron
            </SnbText.B4>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{ marginRight: 5 }}>
              <SnbText.B4
                color={color.black60}
                textDecorationLine="line-through">
                {toCurrency(25000, { withFraction: false })}
              </SnbText.B4>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SnbText.B4 color={color.black100}>
                {toCurrency(15000, { withFraction: false })}
              </SnbText.B4>
              <SnbIcon
                name="arrow_drop_down_circle"
                style={{ color: color.green50, marginLeft: 5 }}
                size={16}
              />
            </View>
          </View>
          <View>
            <SnbText.B4 color={color.red70}>Tersedia 10 Kardus</SnbText.B4>
          </View>
        </View>
      </View>
      <View style={ShoppingCartStyles.actionContainer}>
        <TouchableOpacity onPress={() => {}} style={{ marginRight: 5 }}>
          <SnbIcon name="delete_outline" color={color.black80} size={32} />
        </TouchableOpacity>
        <SnbNumberCounter
          value={5}
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
      <View style={ShoppingCartStyles.actionContainer}>
        <SnbText.B4 color={color.black60}>40pcs dalam 1 Kardus</SnbText.B4>
      </View>
    </View>
  );
};
