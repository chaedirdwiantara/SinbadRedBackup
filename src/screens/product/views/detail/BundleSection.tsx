/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color, SnbDivider } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { ProductDetailSection } from './ProductDetailSection';
import * as models from '@models';
/** === TYPE ===  */
interface BundleSectionProps {
  bundleList: models.PotentialPromoProductCrossSelling[];
}
/** === COMPONENT ===  */
export const BundleSection: FC<BundleSectionProps> = ({ bundleList }) => {
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);

  const handleOnPressAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <ProductDetailSection title="Promo Bundle Special">
      {bundleList.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <React.Fragment>
            {index !== 0 && <SnbDivider style={{ marginVertical: 8 }} />}
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => handleOnPressAccordion(index)}>
              <View style={{ flex: 1 }}>
                <SnbText.B3>{item.name}</SnbText.B3>
              </View>
              <SnbIcon
                name={isActive ? 'expand_less' : 'expand_more'}
                size={24}
                color={color.black100}
              />
            </TouchableOpacity>
            {isActive && (
              <View style={{ marginTop: 8 }}>
                <SnbText.B3>{item.description}</SnbText.B3>
              </View>
            )}
          </React.Fragment>
        );
      })}
    </ProductDetailSection>
  );
};
