/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import { VoucherDetailStyles } from '../../styles';
/** === INTERFACE === */
interface VoucherDetailDescriptionProps {
  voucherDescription: string;
}
/** === COMPONENT ===  */
export const VoucherDetailDescription: FC<VoucherDetailDescriptionProps> = ({
  voucherDescription,
}) => {
  return (
    <View style={VoucherDetailStyles.sectionContainer}>
      <SnbTextSeeMore
        maxLine={3}
        toggleColor={color.red50}
        toggleShowMore={'Lihat Semua'}
        toggleShowLess={'Lihat Lebih Sedikit'}
        content={<SnbText.B1>{voucherDescription}</SnbText.B1>}
      />
      <SnbDivider style={{ marginTop: 20 }} />
    </View>
  );
};
