/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === COMPONENT === */
export const ProductDetailSupplierInfoSkeleton: FC<{ bottomSpaces?: number }> =
  ({ bottomSpaces = 8 }) => (
    <SkeletonAnimator>
      <View style={{ padding: 16, paddingBottom: bottomSpaces }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={ProductDetailStyle.supplierLogo} />
          <View style={{ flex: 1 }}>
            <View style={{ height: 12, width: '60%', borderRadius: 15 }} />
            <View
              style={{
                height: 12,
                width: '40%',
                borderRadius: 15,
                marginTop: 8,
              }}
            />
          </View>
          <View style={{ height: 28, width: '28%', borderRadius: 5 }} />
        </View>
      </View>
    </SkeletonAnimator>
  );
