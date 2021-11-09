/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import { color, SnbText, SnbButton } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS */
import PriceRangeInput from './PriceRangeInput';
import PriceRangeSlider from './PriceRangeSlider';
/** === IMPORT FUNCTIONS */
import { useKeyboardListener } from '@core/functions/hook/keyboard-listener';
import { usePriceRangeFilter } from '@core/functions/product';
/** === IMPORT TYPE */
import {
  BottomActionPressHandlerType,
  PriceRange,
} from '@core/components/product/list/BottomAction';
/** === IMPORT STYLE */
import { ModalActionStyle } from '@core/styles';
/** === TYPE === */
interface FilterActionProps {
  appliedFilterQuery: PriceRange | null;
  onButtonPress: ({
    type,
    value,
  }: {
    type: BottomActionPressHandlerType;
    value: { minPrice: number; maxPrice: number };
  }) => void;
}
/** === CONSTANT === */
const { height } = Dimensions.get('window');
/** === COMPONENTS === */
const FilterAction: FC<FilterActionProps> = ({
  appliedFilterQuery,
  onButtonPress,
}) => {
  /** === HOOKS === */
  const { keyboardVisible } = useKeyboardListener();
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetValues,
    handleSliderChange,
    handleSliderFinishChange,
  } = usePriceRangeFilter(appliedFilterQuery);
  /** === VIEW === */
  return (
    <View
      style={[
        ModalActionStyle.mainContainer,
        { maxHeight: keyboardVisible ? 0.4 * height : 0.8 * height },
      ]}>
      <ScrollView style={ModalActionStyle.boxContentItemFilterType1}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={resetValues}>
            <SnbText.C1 color={color.red50}>Reset</SnbText.C1>
          </TouchableOpacity>
        </View>
        <PriceRangeInput
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSliderChange={handleSliderChange}
          onSliderFinishChange={handleSliderFinishChange}
        />
      </ScrollView>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          type="primary"
          title="Simpan"
          onPress={() => {
            Keyboard.dismiss();
            onButtonPress({
              type: 'applyFilter',
              value: { minPrice, maxPrice },
            });
          }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default FilterAction;
