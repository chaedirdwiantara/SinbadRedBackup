/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
/** === IMPORT FUNCTION === */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE === */
interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  onSliderChange: (values: number[]) => void;
  onSliderFinishChange: (values: number[]) => void;
}
/** === CONSTANT === */
const { width } = Dimensions.get('window');
/** === COMPONENT === */
const PriceRangeSlider: FC<PriceSliderProps> = ({
  minPrice,
  maxPrice,
  onSliderFinishChange,
  onSliderChange,
}) => (
  <View style={{ alignItems: 'center' }}>
    <MultiSlider
      trackStyle={{ width: '100%' }}
      selectedStyle={{ backgroundColor: color.red50 }}
      unselectedStyle={{ backgroundColor: color.black10 }}
      markerStyle={{ backgroundColor: color.red50 }}
      min={0}
      max={1000000}
      values={[minPrice, maxPrice]}
      sliderLength={0.85 * width}
      onValuesChangeFinish={onSliderFinishChange}
      onValuesChange={onSliderChange}
      enabledOne={true}
      enabledTwo={true}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: -10,
      }}>
      <SnbText.C1>{toCurrency(minPrice)}</SnbText.C1>
      <SnbText.C1>{toCurrency(maxPrice)}</SnbText.C1>
    </View>
  </View>
);

export default PriceRangeSlider;
