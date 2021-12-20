/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import {
  SnbText,
  SnbNumberCounter,
  color,
} from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === TYPE === */
interface QuantityModifierProps {
  title: string;
  loading: boolean;
  qty: number;
  onChangeQty: (val: number) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  minusDisabled?: boolean;
}
/** === COMPONENT === */
export const QuantityModifier: FC<QuantityModifierProps> = ({
  title,
  loading,
  qty,
  onChangeQty,
  onIncrease,
  onDecrease,
  minusDisabled = false,
}) => {
  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={ProductBundleStyle.quantityModifierContainer}>
          <View style={{ height: 24, width: '20%', borderRadius: 20 }} />
          <View style={{ height: 24, width: '50%', borderRadius: 20 }} />
        </View>
      </SkeletonAnimator>
    );
  }

  return (
    <View style={ProductBundleStyle.quantityModifierContainer}>
      <SnbText.C1 color={color.black60}>{title}</SnbText.C1>
      <SnbNumberCounter
        value={qty}
        onChange={onChangeQty}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        minusDisabled={minusDisabled}
      />
    </View>
  );
};
