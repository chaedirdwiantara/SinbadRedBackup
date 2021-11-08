/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { ProductDetailSection } from './ProductDetailSection';
/** === TYPE ===  */
interface PromoSectionProps {
  description: string;
  onPress: () => void;
}
/** === COMPONENT ===  */
export const PromoSection: FC<PromoSectionProps> = ({
  description,
  onPress,
}) => (
  <ProductDetailSection title="Promosi" separator={false}>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View style={{ flex: 1 }}>
        <SnbText.C1 color={color.black80}>
          Anda Berpotensi mendapatkan:
        </SnbText.C1>
        <View style={{ marginTop: 4 }}>
          <SnbText.B3>{description}</SnbText.B3>
        </View>
      </View>
      <SnbIcon name="chevron_right" size={24} color={color.black60} />
    </TouchableOpacity>
  </ProductDetailSection>
);
