/** === IMPORT PACKAGES ===  */
import { useState, useEffect, useMemo, useCallback } from 'react';
/** === IMPORT FUNCTIONS ===  */
import { goToCategory } from '@screen/category/functions';
import {
  useStockReminderContext,
  useTagContext,
} from 'src/data/contexts/product';
import { useStockReminderActions } from '@screen/product/functions';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import {
  LayoutDisplay,
  BottomActionPressHandler,
  SortIndex,
  PriceRange,
} from '@core/components/product/list/BottomAction';
import {
  ListDisplayState,
  ITag,
} from '@core/components/product/list/product-list-core.type';
/** === TYPE ===  */
export interface SortOption {
  name: string;
  sortBy: string;
  sort: 'asc' | 'desc';
}

export type SortQuery = Omit<SortOption, 'name'>;

interface UseListDisplayStateParams {
  loading: boolean;
  error: models.ErrorProps | null;
  dataLength: number;
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

  const handleActionClick: BottomActionPressHandler = ({
    type,
    value,
    show,
  }) => {
    switch (type) {
      case 'sort':
        setSortModalVisible(show);
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
        setFilterModalVisible(show);
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
  const filterIsApplied = useMemo(
    () => appliedFilterQuery !== null,
    [appliedFilterQuery],
  );
  const [minPrice, setMinPrice] = useState(
    filterIsApplied ? appliedFilterQuery.minPrice : 0,
  );
  const [maxPrice, setMaxPrice] = useState(
    filterIsApplied ? appliedFilterQuery.maxPrice : 0,
  );

  const resetValues = useCallback(() => {
    setMinPrice(0);
    setMaxPrice(0);
  }, []);

  const handleSliderChange = useCallback((values: Array<number>) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  }, []);

  const handleSliderFinishChange = useCallback((values: Array<number>) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  }, []);

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

export const useListDisplayState = ({
  loading,
  error,
  dataLength,
}: UseListDisplayStateParams) => {
  const [displayState, setDisplayState] = useState<ListDisplayState>('success');

  useEffect(() => {
    if (loading) {
      setDisplayState('loading');
    } else if (!loading && error) {
      setDisplayState('error');
    } else if (!loading && dataLength === 0) {
      setDisplayState('empty');
    } else {
      setDisplayState('success');
    }
  }, [loading, error, dataLength]);

  return displayState;
};

export const useProductTags = (
  fetchProductFn: (tags: Array<string>) => void,
) => {
  const {
    stateTag: {
      list: { data: tagsFromContext },
    },
  } = useTagContext();
  const [tags, setTags] = useState<Array<ITag>>([]);
  const selectedTags: Array<string> = useMemo(
    () => tags.filter((tag) => tag.selected).map((filtered) => filtered.value),
    [tags],
  );

  useEffect(() => {
    const formattedTags: Array<ITag> = tagsFromContext.map((tag) => ({
      value: tag.tags,
      selected: false,
    }));
    setTags(formattedTags);
  }, [tagsFromContext]);

  const handleTagPress = (tagIndex: number) => {
    const toggledTag = tags[tagIndex];
    toggledTag.selected = !toggledTag.selected;
    const updatedTags = [...tags];
    updatedTags[tagIndex] = toggledTag;
    const tagsQuery = updatedTags
      .filter((tag) => tag.selected)
      .map((filtered) => filtered.value);

    setTags(updatedTags);
    fetchProductFn(tagsQuery);
  };

  return { tags, selectedTags, handleTagPress };
};
// shorthand function known is type boolean
const isBoolean = (status?: boolean) => typeof status == 'boolean';
// util helper for proudct type grid & list
export const useProductCardUtil = (
  product: models.ProductCard,
  layout: 'grid' | 'list',
) => {
  // hooks stock reminder list
  const {
    stateStockReminder: { list: stockReminderList },
    dispatchStockReminder,
  } = useStockReminderContext();
  const { createReminder, deleteReminder } = useStockReminderActions({
    warehouseId: Number(product.warehouseOriginId),
    productId: product.id,
  });
  // find stock product
  const stockReminder = useMemo(() => {
    return stockReminderList.data.find(
      (i) =>
        `${i.productId}${i.warehouseId}` ==
        `${product.id}${product.warehouseOriginId}`,
    );
  }, [stockReminderList.data]);
  // define the badge
  const badge = useMemo(() => {
    if (product.hasBulkPrice)
      return {
        title: 'Harga Grosir',
        type: 'information',
        iconName: 'cart',
      };
    if (product.isExclusive)
      return {
        title: 'Exclusive',
        type: 'warning',
        iconName: 'stars',
      };
    return undefined;
  }, [product.isExclusive, product.hasBulkPrice]);
  // check condition is stock available
  const outOfStock = useMemo(() => {
    if (isBoolean(product.isStockAvailable)) {
      return !product.isStockAvailable;
    }
    // false outOfStock = product ada
    return false;
  }, [product.isStockAvailable]);
  // check condition is have stock reminder
  const isHaveStockReminder = useMemo(() => {
    if (isBoolean(stockReminder?.stockRemind)) {
      return stockReminder?.stockRemind;
    }
    // false outOfStock = product ada
    return false;
  }, [stockReminder?.stockRemind]);
  const deleteReminderLabel = useMemo(
    () => (layout === 'grid' ? 'Hapus Pengingat' : 'Hapus'),
    [layout],
  );
  const addReminderLabel = useMemo(
    () => (layout === 'grid' ? 'Ingatkan Saya' : 'Ingatkan'),
    [layout],
  );
  // button text label
  const buttonText = useMemo(() => {
    if (outOfStock) {
      return isHaveStockReminder ? deleteReminderLabel : addReminderLabel;
    }
    return 'Pesan';
  }, [
    stockReminder?.stockRemind,
    outOfStock,
    deleteReminderLabel,
    addReminderLabel,
  ]);
  // make outline button if out of stock
  const buttonOutline = useMemo(() => outOfStock, [outOfStock]);
  // make button grey if have stock reminder
  const buttonType: 'secondary' | 'primary' = useMemo(
    () => (isHaveStockReminder ? 'secondary' : 'primary'),
    [isHaveStockReminder],
  );
  // callback button order & reminder
  const onButtonPress = useCallback(() => {
    if (outOfStock) {
      if (isHaveStockReminder) {
        // action call remove reminder
        deleteReminder(dispatchStockReminder);
      } else {
        // action call create reminder
        createReminder(dispatchStockReminder);
      }
      return void 0;
    }
    product.onOrderPress();
  }, [outOfStock, product.onOrderPress, isHaveStockReminder]);

  return {
    badge,
    outOfStock,
    buttonOutline,
    buttonText,
    buttonType,
    onButtonPress,
  };
};
