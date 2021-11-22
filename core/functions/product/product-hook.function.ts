/** === IMPORT PACKAGES ===  */
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Alert } from 'react-native';
/** === IMPORT FUNCTIONS ===  */
import { goToCategory } from '@screen/category/functions';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import {
  LayoutDisplay,
  BottomActionPressHandler,
  SortIndex,
  PriceRange,
} from '@core/components/product/list/BottomAction';
import { EProductDisplayState } from '@core/components/product/list/product-list-core.type';
/** === TYPE ===  */
export interface SortOption {
  name: string;
  sortBy: string;
  sort: 'asc' | 'desc';
}

export type SortQuery = Omit<SortOption, 'name'>;

interface UseProductDisplayStateParams {
  loading: boolean;
  error: models.ErrorProps | null;
  productsLength: number;
}
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

export const usePriceRangeFilter = (appliedFilterQuery: PriceRange | null) => {
  const filterIsApplied = appliedFilterQuery !== null;
  const [minPrice, setMinPrice] = useState(
    filterIsApplied ? appliedFilterQuery.minPrice : 0,
  );
  const [maxPrice, setMaxPrice] = useState(
    filterIsApplied ? appliedFilterQuery.maxPrice : 0,
  );

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

export const useRegisterSupplierModal = () => {
  const [registerSupplierModalVisible, setRegisterSupplierModalVisible] =
    useState(false);

  const sendSupplierData = (
    setOrderModalVisible: Dispatch<SetStateAction<boolean>>,
  ) => {
    // Hit api send-store-supplier
    Alert.alert(
      'Send Data to Suplier',
      'Hit API send-store-supplier, jika sukses maka hit api add to cart, Jika gagal muncul modal error general',
      [
        {
          text: 'Cancel',
          onPress: () => setRegisterSupplierModalVisible(false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setRegisterSupplierModalVisible(false);
            setOrderModalVisible(true);
          },
        },
      ],
    );
  };

  return {
    visible: registerSupplierModalVisible,
    setVisible: setRegisterSupplierModalVisible,
    sendSupplierData,
  };
};

export const useOrderModalVisibility = () => {
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setOrderModalVisible((prevVisible) => !prevVisible);
  };

  return {
    orderModalVisible,
    setOrderModalVisible,
    toggleModalVisible,
  };
};

export const useProductDisplayState = ({
  loading,
  error,
  productsLength,
}: UseProductDisplayStateParams) => {
  const [displayState, setDisplayState] =
    useState<EProductDisplayState>('empty');

  useEffect(() => {
    if (loading) {
      setDisplayState('loading');
    } else if (!loading && error) {
      setDisplayState('error');
    } else if (!loading && productsLength === 0) {
      setDisplayState('empty');
    } else {
      setDisplayState('success');
    }
  }, [loading, error, productsLength]);

  return displayState;
};
