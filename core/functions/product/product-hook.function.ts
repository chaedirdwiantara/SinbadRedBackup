/** === IMPORT PACKAGE ===  */
import { useState } from 'react';
/** === IMPORT FUNCTION ===  */
import { goToCategory } from '@screen/category/functions';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import {
  LayoutDisplay,
  BottomActionPressHandler,
  SortIndex,
  PriceRange,
} from '@core/components/product/list/BottomAction';
/** === TYPE ===  */
export interface SortOption {
  name: string;
  sortBy: string;
  sort: 'asc' | 'desc';
}

type SortQuery = Omit<SortOption, 'name'>;
/** === CONSTANT === */
export const priceSortOptions: Array<SortOption> = [
  {
    name: 'Harga Tinggi ke Rendah',
    sortBy: 'price',
    sort: 'desc',
  },
  {
    name: 'Harga Rendah ke Tinggi',
    sortBy: 'price',
    sort: 'asc',
  },
];
/** === HOOKS ===  */
export const useBottomAction = (
  fetchFn: (queryOptions: models.ProductListQueryOptions) => void,
  additionalQueryOptions: models.ProductListQueryOptions,
) => {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortIndex, setSortIndex] = useState<number | null>(null);
  const [sortQuery, setSortQuery] = useState<SortQuery | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filterQuery, setFilterQuery] = useState<PriceRange | null>(null);
  const [layoutDisplay, setLayoutDisplay] = useState<LayoutDisplay>('grid');

  const getQueryOptions = ({
    sort = true,
    filter = true,
  }: {
    sort?: boolean;
    filter?: boolean;
  }): models.ProductListQueryOptions => {
    let queryOptions: models.ProductListQueryOptions = {
      ...additionalQueryOptions,
    };

    if (sort && sortQuery !== null) {
      queryOptions.sortBy = sortQuery?.sortBy;
      queryOptions.sort = sortQuery?.sort;
    }

    if (filter && filterQuery !== null) {
      if (!(filterQuery.minPrice === 0 && filterQuery.maxPrice === 0)) {
        queryOptions.minPrice = filterQuery?.minPrice;
        queryOptions.maxPrice = filterQuery?.maxPrice;
      }
    }

    return queryOptions;
  };

  const handleActionClick: BottomActionPressHandler = ({ type, value }) => {
    switch (type) {
      case 'sort':
        setSortModalVisible((prev) => !prev);
        break;
      case 'applySort':
        setSortIndex(value as SortIndex);
        setSortModalVisible(false);
        setSortActive(value !== null);
        const sortValue =
          value !== null ? priceSortOptions[value as number] : null;
        const sortQueryValue: SortQuery | null =
          sortValue !== null
            ? { sort: sortValue.sort, sortBy: sortValue.sortBy }
            : null;
        const sortQueryOption = sortQueryValue ?? {};
        setSortQuery(sortQueryValue);
        fetchFn({
          ...getQueryOptions({ sort: Boolean(sortQueryValue) }),
          ...sortQueryOption,
        });
        break;
      case 'filter':
        setFilterModalVisible((prev) => !prev);
        break;
      case 'applyFilter':
        const filterValue = value as PriceRange;
        setFilterQuery(filterValue);
        setFilterModalVisible(false);
        setFilterActive(
          filterValue.minPrice === 0 && filterValue.maxPrice === 0
            ? false
            : true,
        );
        const filterQueryValue: PriceRange | null =
          filterValue !== null
            ? { minPrice: filterValue.minPrice, maxPrice: filterValue.maxPrice }
            : null;
        const filterQueryOption = filterQueryValue ?? {};
        setFilterQuery(filterQueryValue);
        fetchFn({
          ...getQueryOptions({ filter: Boolean(filterQueryValue) }),
          ...filterQueryOption,
        });
        break;
      case 'resetFilter':
        setFilterQuery(null);
        setFilterModalVisible(false);
        setFilterActive(false);
        break;
      case 'layout':
        setLayoutDisplay((prev) => (prev === 'grid' ? 'list' : 'grid'));
        break;
      case 'category':
        goToCategory();
        break;
      default:
        throw new Error(`Unknown bottom action type: ${type}`);
    }
  };

  return {
    sortModalVisible,
    sortActive,
    sortIndex,
    sortQuery,
    filterModalVisible,
    filterActive,
    filterQuery,
    layoutDisplay,
    handleActionClick,
  };
};

export const useSortIndex = (initialIndex: number | null) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex);

  const setActiveSortIndex = (index: number | null) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return { activeIndex, setActiveSortIndex };
};

export const usePriceRangeFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const resetValues = () => {
    setMinPrice(0);
    setMaxPrice(0);
  };

  const handleSliderChange = (values: Array<number>) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleSliderFinishChange = (values: Array<number>) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  return {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetValues,
    handleSliderChange,
    handleSliderFinishChange,
  };
};
