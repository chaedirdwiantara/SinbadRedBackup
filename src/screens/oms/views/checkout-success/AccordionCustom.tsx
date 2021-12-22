/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { SnbText, SnbIcon, color, SnbHtml } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { AccordionStyle } from '@core/styles';
/** === TYPE === */
export interface IAccordionData {
  name: string;
  instruction: string;
}

interface AccordionProps {
  data: Array<IAccordionData>;
  loading?: boolean;
}
/** === COMPONENT === */
export const AccordioCustom: FC<AccordionProps> = ({ data, loading }) => {
  /** == HOOK === */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** == VIEW === */
  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={{ paddingHorizontal: 16 }}>
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              style={{
                ...AccordionStyle.skeleton,
                marginBottom: index < 2 ? 10 : 0,
              }}
            />
          ))}
        </View>
      </SkeletonAnimator>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      {data.map((item, itemIndex) => (
        <View key={itemIndex}>
          <TouchableWithoutFeedback
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setActiveIndex((prevActive) => {
                if (prevActive === itemIndex) {
                  return null;
                }
                return itemIndex;
              });
            }}>
            <View style={AccordionStyle.panel}>
              <SnbText.B3>{item.name}</SnbText.B3>
              <SnbIcon
                name={itemIndex === activeIndex ? 'expand_less' : 'expand_more'}
                size={30}
              />
            </View>
          </TouchableWithoutFeedback>
          {itemIndex === activeIndex && (
            <View style={AccordionStyle.contentContainer}>
              <SnbHtml value={item.instruction} fontSize={12} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
