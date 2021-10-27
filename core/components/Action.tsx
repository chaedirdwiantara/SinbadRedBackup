/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {
  color,
  SnbText,
  SnbButton,
  SnbRadioButton,
} from 'react-native-sinbad-ui';
import { TextInputMask } from 'react-native-masked-text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
/** === IMPORT FUNCTIONS */
import { useKeyboardListener } from '@core/functions/hook/keyboard-listener';
import { useSortIndex, usePriceRangeFilter } from '@core/functions/product';
import { toCurrency } from '../functions/global/currency-format';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
/** === IMPORT STYLE */
import { ModalActionStyle } from '@core/styles';
/** === TYPE === */
interface SortOption {
  name: string;
  sortBy: string;
  sort: string;
}

interface ActionSortMenuType1Props {
  options: SortOption[];
  appliedOptionIndex: number | null;
  onButtonPress: ({
    type,
    value,
  }: {
    type: BottomActionPressHandlerType;
    value: number | null;
  }) => void;
}

interface ActionFilterMenuType1Props {
  onButtonPress: ({
    type,
    value,
  }: {
    type: BottomActionPressHandlerType;
    value: { minPrice: number; maxPrice: number };
  }) => void;
}
interface RenderPriceInputParams {
  value: number;
  handleTextChange: (formatted: string, extracted?: string) => void;
  handleWhenEditEnd: () => void;
}
/** === CONSTANT === */
const { height, width } = Dimensions.get('window');
/** === COMPONENTS === */
const SortMenuType1: FC<ActionSortMenuType1Props> = ({
  options,
  appliedOptionIndex,
  onButtonPress,
}) => {
  /** === HOOK === */
  const { activeIndex, setActiveSortIndex } = useSortIndex(appliedOptionIndex);
  /** === VIEW === */
  /** => Content */
  const renderContent = () => {
    return (
      Array.isArray(options) &&
      options.map((option, optionIndex) => (
        <TouchableOpacity
          key={option.name}
          onPress={() => setActiveSortIndex(optionIndex)}>
          <View style={ModalActionStyle.boxContentItemSortType1}>
            <View style={{ flex: 1 }}>
              <SnbText.B3>{option.name}</SnbText.B3>
            </View>
            <View style={ModalActionStyle.boxIconRight}>
              {optionIndex === activeIndex ? (
                <SnbRadioButton
                  status="selected"
                  onPress={() => setActiveSortIndex(null)}
                />
              ) : (
                <SnbRadioButton
                  status="unselect"
                  onPress={() => setActiveSortIndex(optionIndex)}
                />
              )}
            </View>
          </View>
          <View style={[ModalActionStyle.lines, { marginLeft: 16 }]} />
        </TouchableOpacity>
      ))
    );
  };
  /** => Apply Button */
  const renderApplyButton = () => (
    <View style={{ marginTop: 32, height: 72 }}>
      <SnbButton.Single
        type="primary"
        title="Simpan"
        onPress={() =>
          onButtonPress({
            type: 'applySort',
            value: activeIndex,
          })
        }
        disabled={activeIndex === appliedOptionIndex}
      />
    </View>
  );
  /** => Main */
  return (
    <View style={ModalActionStyle.mainContainer}>
      {renderContent()}
      {renderApplyButton()}
    </View>
  );
};

const FilterMenuType1: FC<ActionFilterMenuType1Props> = ({ onButtonPress }) => {
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
  } = usePriceRangeFilter();
  /** === VIEW === */
  /** => Reset Button */
  const renderResetButton = () => (
    <View style={{ alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={resetValues}>
        <SnbText.C1 color={color.red50}>Reset</SnbText.C1>
      </TouchableOpacity>
    </View>
  );
  /** => Price Input */
  const renderPriceInput = ({
    value,
    handleTextChange,
    handleWhenEditEnd,
  }: RenderPriceInputParams) => (
    <TextInputMask
      type="money"
      value={value.toString()}
      options={{
        precision: 0,
        separator: ',',
        delimiter: '.',
        unit: '',
        suffixUnit: '',
      }}
      placeholder=""
      keyboardType="number-pad"
      autoFocus={false}
      includeRawValueInChangeText={true}
      onChangeText={handleTextChange}
      onEndEditing={handleWhenEditEnd}
      style={[
        ModalActionStyle.text,
        ModalActionStyle.boxInput,
        ModalActionStyle.shadowForBox,
      ]}
    />
  );
  /** => Filter Price */
  const renderFilterPrice = () => (
    <View>
      <View>
        <SnbText.B2>Harga</SnbText.B2>
      </View>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <SnbText.C1>Rp</SnbText.C1>
          </View>
          <View style={{ justifyContent: 'center', marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            {renderPriceInput({
              value: minPrice,
              handleTextChange: (_, extracted: any) => {
                setMinPrice(isNaN(extracted) ? 0 : extracted);
              },
              handleWhenEditEnd: () => {
                setMaxPrice(maxPrice < minPrice ? minPrice + 1 : maxPrice);
              },
            })}
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
          <SnbText.C1>-</SnbText.C1>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <SnbText.C1>Rp</SnbText.C1>
          </View>
          <View style={{ flex: 1, marginRight: 2 }}>
            {renderPriceInput({
              value: maxPrice,
              handleTextChange: (_, extracted: any) => {
                setMaxPrice(isNaN(extracted) ? 0 : extracted);
              },
              handleWhenEditEnd: () => () => {
                setMinPrice(minPrice > maxPrice ? 0 : minPrice);
              },
            })}
          </View>
        </View>
      </View>
    </View>
  );
  /** => Filter Slider */
  const renderFilterSliderPrice = () => (
    <View style={{ alignItems: 'center' }}>
      <MultiSlider
        trackStyle={{ width: '100%' }}
        selectedStyle={{ backgroundColor: color.red50 }}
        unselectedStyle={{ backgroundColor: color.black10 }}
        markerStyle={{ backgroundColor: color.red50 }}
        min={0}
        max={5000000}
        values={[minPrice, maxPrice]}
        sliderLength={0.85 * width}
        onValuesChangeFinish={handleSliderFinishChange}
        onValuesChange={handleSliderChange}
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
  /** => Content */
  const renderContent = () => (
    <ScrollView style={ModalActionStyle.boxContentItemFilterType1}>
      {renderResetButton()}
      {renderFilterPrice()}
      {renderFilterSliderPrice()}
    </ScrollView>
  );
  /** => Apply Button */
  const renderApplyButton = () => (
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
  );
  /** => Main */
  return (
    <View
      style={[
        ModalActionStyle.mainContainer,
        { maxHeight: keyboardVisible ? 0.4 * height : 0.8 * height },
      ]}>
      {renderContent()}
      {renderApplyButton()}
    </View>
  );
};

export const Action = { SortMenuType1, FilterMenuType1 };
/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Maulana Ghozi
 * createdDate: 14 October 2021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 *
 */
