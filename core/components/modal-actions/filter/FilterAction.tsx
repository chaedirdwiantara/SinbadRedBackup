/** === IMPORT PACKAGES === */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import {
  SnbButton2,
  SnbSlider,
  Section,
  spacingV2,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS */
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
/** === IMPORT STYLE */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE === */
interface FilterActionProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  handleSliderChange: (val: Array<number>) => void;
  onButtonPress: ({
    type,
    value,
  }: {
    type: BottomActionPressHandlerType;
    value: { minPrice: number; maxPrice: number };
  }) => void;
}
/** === CONSTANT === */
const { spacing } = spacingV2;
/** === COMPONENTS === */
const FilterAction: FC<FilterActionProps> = ({
  handleSliderChange,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
  onButtonPress,
}) => {
  const [value, setValue] = useState([0, 0]);
  // function
  // function slider event
  const onSlider = useCallback(
    debounce((val: Array<number>) => {
      setValue(val);
    }, 10),
    [],
  );
  // function change input range price
  const onChangeRange = useCallback(([start, end]: Array<number>) => {
    setMinPrice(start);
    setMaxPrice(end);
  }, []);
  // function submit button
  const onSubmit = useCallback(() => {
    const min = value[0];
    const max = value[1];

    Keyboard.dismiss();

    onButtonPress({
      type: 'applyFilter',
      value: { minPrice: min, maxPrice: max },
    });

    setMinPrice(min);
    setMaxPrice(max);
  }, [value[0], value[1]]);
  // Effect
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  /** === VIEW === */
  return (
    <>
      <Section.PriceRange
        onChange={onChangeRange}
        values={[value[0], value[1]]}
        placeholders={['0', '0']}
      />
      <View style={{ marginTop: spacing.xl }}>
        <SnbSlider
          minValue={value[0]}
          maxValue={value[1]}
          higherLimit={1000000}
          lowerLimit={0}
          onSliderChange={onSlider}
          label={{
            start: toCurrency(value[0], { withFraction: false }),
            end: toCurrency(value[1], { withFraction: false }),
          }}
        />
      </View>
      <View style={{ marginTop: spacing.xl }}>
        <SnbButton2.Primary
          full
          size="medium"
          title="Simpan"
          onPress={onSubmit}
          disabled={false}
        />
      </View>
    </>
  );
};

export default FilterAction;
