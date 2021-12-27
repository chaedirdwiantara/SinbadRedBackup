/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
/** === IMPORT COMPONENTS AND UTILS ===  */
import { SnbIcon, SnbText, color } from '@sinbad/react-native-sinbad-ui';
import Html from '@core/components/Html';
/** === IMPORT TYPE ===  */
interface IAccordionData {
  name: string;
  instruction: string;
}
/** === TYPE === */
interface AccordionProps {
  data: Array<IAccordionData>;
  /** Index of the initially opened panel */
  defaultValue?: number;
  testID?: string;
}
/** === COMPONENT === */
const CustomAccordion: FC<AccordionProps> = ({
  data,
  defaultValue,
  testID,
}) => {
  const initiallyOpenedPanelIndex =
    defaultValue === undefined ||
    (defaultValue !== undefined && defaultValue > data.length - 1)
      ? null
      : defaultValue;
  /** == HOOK === */
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initiallyOpenedPanelIndex,
  );
  /** == VIEW === */
  return (
    <View style={{ flex: 1, backgroundColor: color.white }} testID={testID}>
      {data?.map((item, itemIndex) => (
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
              <Html value={item.instruction} fontSize={12} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
/** === STYLE === */
const AccordionStyle = StyleSheet.create({
  panel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: color.black10,
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
});

export default CustomAccordion;
