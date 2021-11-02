/** === EXTERNAL === */
import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
/** === STYLE === */
import { BrandCardStyle } from '../styles';
/** === TYPE === */
interface BrandCardProps {
  id: string;
  imageUrl: string;
  height?: number;
  width?: number;
  onCardPress?: () => void;
}
/** === COMPONENT === */
export const BrandCard: FC<BrandCardProps> = ({
  height = 150,
  width = 110,
  ...props
}) => (
  <TouchableOpacity
    style={[
      BrandCardStyle.container,
      BrandCardStyle.shadowForBox5,
      { height, width },
    ]}
    onPress={props.onCardPress}>
    <Image source={{ uri: props.imageUrl }} style={BrandCardStyle.image} />
  </TouchableOpacity>
);
