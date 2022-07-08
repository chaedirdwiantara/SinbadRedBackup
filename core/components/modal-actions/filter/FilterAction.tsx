/** === IMPORT PACKAGES === */
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react';
import { View, Keyboard } from 'react-native';
import {
  SnbButton2,
  SnbText2,
  spacingV2,
  SnbChips2,
  PriceRangeInputSlider,
} from 'react-native-sinbad-ui';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
/** === TYPE === */
interface FilterActionProps {
  testID: string;
  idSortFilter?: string;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val?: number) => void;
  setMaxPrice: (val?: number) => void;
  handleSliderChange: (val: Array<number>) => void;
  onButtonPress: ({
    type,
    value,
    show,
  }: {
    type: BottomActionPressHandlerType;
    value: {
      minPrice?: number;
      maxPrice?: number;
      sortBy?: string;
      sort?: string;
    };
    show: boolean;
    idSort?: string;
  }) => void;
}

interface FilterActionRef {
  reset: () => void;
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
const FilterAction = forwardRef<FilterActionRef, FilterActionProps>(
  (
    {
      idSortFilter,
      testID,
      maxPrice,
      minPrice,
      setMaxPrice,
      setMinPrice,
      onButtonPress,
    },
    ref,
  ) => {
    const [value, setValue] = useState<[number, number]>([0, 0]);
    const [priceSort, setPriceSort] = useState<typeof filterPrice[0]>();
    // function
    // function change input range price
    const onChangeRange = useCallback(([start, end]: Array<number>) => {
      setMinPrice(start);
      setMaxPrice(end);
    }, []);
    // function submit button
    const onSubmit = useCallback(() => {
      const min = value[0] || undefined;
      const max = value[1] || undefined;

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
    // register ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue([0, 0]);
        setPriceSort();
      },
    }));
    /** === VIEW === */
    return (
      <>
        <View style={{ marginBottom: spacing.sm }}>
          <SnbText2.Body.Default>Urutkan</SnbText2.Body.Default>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
          {filterPrice.map((i) => (
            <View style={{ marginRight: spacing.sm }} key={i.id}>
              <SnbChips2.Choice
                onPress={() => onSetSortPrice(i)}
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
        <PriceRangeInputSlider
          testID={testID}
          value={value}
          onChange={onChangeRange}
        />
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
  },
);

export default memo(FilterAction);
