/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbText, SnbRadioButton } from 'react-native-sinbad-ui';
/** === IMPORT TYPE === */
import { SortOption } from './SortAction';
/** === IMPORT STYLE === */
import { ModalActionStyle } from '@core/styles';
/** === TYPE === */
interface SortActionOptionProps {
  option: SortOption;
  optionIndex: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}
/** === COMPONENT === */
export const SortActionOption: FC<SortActionOptionProps> = ({
  option,
  optionIndex,
  activeIndex,
  setActiveIndex,
}) => (
  <TouchableOpacity
    key={option.name}
    onPress={() => setActiveIndex(optionIndex)}>
    <View style={ModalActionStyle.boxContentItemSortType1}>
      <View style={{ flex: 1 }}>
        <SnbText.B3>{option.name}</SnbText.B3>
      </View>
      <View style={ModalActionStyle.boxIconRight}>
        {optionIndex === activeIndex ? (
          <SnbRadioButton
            status="selected"
            onPress={() => setActiveIndex(null)}
          />
        ) : (
          <SnbRadioButton
            status="unselect"
            onPress={() => setActiveIndex(optionIndex)}
          />
        )}
      </View>
    </View>
    <View style={[ModalActionStyle.lines, { marginLeft: 16 }]} />
  </TouchableOpacity>
);
