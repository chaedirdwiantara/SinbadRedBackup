/** === IMPORT PACKAGES === */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import {
  SnbButton2,
  SnbText2,
  SnbSlider,
  Section,
  spacingV2,
  SnbChips2,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS */
import debounce from 'lodash/debounce';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
/** === IMPORT STYLE */
import { toCurrency } from '@core/functions/global/currency-format';
/** === TYPE === */
interface FilterActionProps {
  testID: string;
  idSortFilter?: string;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  handleSliderChange: (val: Array<number>) => void;
  onButtonPress: ({
    type,
    value,
    show,
  }: {
    type: BottomActionPressHandlerType;
    value: {
      minPrice: number;
      maxPrice: number;
      sortBy?: string;
      sort?: string;
    };
    show: boolean;
    idSort?: string;
  }) => void;
}
/** === CONSTANT === */
const { spacing } = spacingV2;
const filterPrice = [
  {
    id: 'btn-low-price',
    label: 'Harga Terendah',
    sortBy: 'price',
    sort: 'asc',
  },
  {
    id: 'btn-high-price',
    label: 'Harga Tertinggi',
    sortBy: 'price',
    sort: 'desc',
  },
];
/** === COMPONENTS === */
const FilterAction: FC<FilterActionProps> = ({
  handleSliderChange,
  idSortFilter,
  testID,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
  onButtonPress,
}) => {
  const [value, setValue] = useState([0, 0]);
  const [priceSort, setPriceSort] = useState<typeof filterPrice[0]>();
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
      value: {
        minPrice: min,
        maxPrice: max,
        sort: priceSort?.sort ?? undefined,
        sortBy: priceSort?.sortBy ?? undefined,
      },
      show: false,
      idSort: priceSort?.id,
    });

    setMinPrice(min);
    setMaxPrice(max);
  }, [value[0], value[1], priceSort?.sort, priceSort?.sortBy, priceSort?.id]);
  // set filter price
  const onSetSortPrice = useCallback((params: typeof filterPrice[0]) => {
    setPriceSort((prev) => {
      if (prev?.id === params.id) {
        return undefined;
      }
      return params;
    });
  }, []);
  // Effect
  // set default value min max range
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  // set default value sort asc|desc
  useEffect(() => {
    if (idSortFilter) {
      const filter = filterPrice.find((i) => i.id === idSortFilter);
      setPriceSort(filter);
    } else {
      setPriceSort(undefined);
    }
  }, [idSortFilter]);
  /** === VIEW === */
  return (
    <>
      <View style={{ marginBottom: spacing.sm }}>
        <SnbText2.Body.Default>Urutkan</SnbText2.Body.Default>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
        {filterPrice.map((i) => (
          <View style={{ marginRight: spacing.sm }}>
            <SnbChips2.Choice
              onPress={() => onSetSortPrice(i)}
              key={i.id}
              testID={i.id + '.' + testID}
              active={i.id === priceSort?.id}
              text={i.label}
            />
          </View>
        ))}
      </View>
      <View style={{ marginBottom: spacing.sm }}>
        <SnbText2.Body.Default>Harga</SnbText2.Body.Default>
      </View>
      <Section.PriceRange
        testID={testID}
        onChange={onChangeRange}
        values={[value[0], value[1]]}
        placeholders={['0', '0']}
      />
      <View style={{ marginTop: spacing.xl }}>
        <SnbSlider
          testID={testID}
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
          testID={'submit-filter.' + testID}
          full
          size="medium"
          title="Terapkan"
          onPress={onSubmit}
          disabled={false}
        />
      </View>
    </>
  );
};

export default FilterAction;
