/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { AccordionStyle } from '@core/styles';
/** === TYPE === */
export interface IAccordionData {
  name: string;
  description: string;
}

interface AccordionProps {
  data: Array<IAccordionData>;
}
/** === COMPONENT === */
export const Accordion: FC<AccordionProps> = ({ data }) => {
  /** == HOOK === */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** == VIEW === */
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
              <SnbText.B3>{item.description}</SnbText.B3>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
