/** === EXTERNAL === */
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbImageCompressor } from 'react-native-sinbad-ui';
/** === STYLE === */
import { Images } from 'src/assets';
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
    <SnbImageCompressor
      uri={props.imageUrl}
      style={BrandCardStyle.image}
      defaultSource={Images.opacityPlaceholder}
      resizeMode="contain"
    />
  </TouchableOpacity>
);
