/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
/** === IMPORT COMPONENTS AND UTILS ===  */
import { SnbIcon, SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
import HtmlV2 from '@core/components/HtmlV2';
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
const ThankYouPageCustomAccordion: FC<AccordionProps> = ({
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
    <View style={{ flex: 1, backgroundColor: colorV2.bgColor.light }} testID={testID}>
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
            <View style={ThankYouAccordionStyle.panel}>
              <SnbText2.Body.Default align={'center'}>{item.name}</SnbText2.Body.Default>
              <SnbIcon
                name={itemIndex === activeIndex ? 'expand_less' : 'expand_more'}
                size={30}
              />
            </View>
          </TouchableWithoutFeedback>
          {itemIndex === activeIndex && (
            <View style={ThankYouAccordionStyle.contentContainer}>
              <HtmlV2 value={item.instruction} fontSize={14}/>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
/** === STYLE === */
const ThankYouAccordionStyle = StyleSheet.create({
  panel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: colorV2.strokeColor.default,
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
});

export default ThankYouPageCustomAccordion;
