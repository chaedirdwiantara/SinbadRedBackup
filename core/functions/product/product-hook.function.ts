/** === IMPORT PACKAGES ===  */
import { useState } from 'react';
/** === IMPORT FUNCTIONS ===  */
import { goToCategory } from '@screen/category/functions';
/** === IMPORT TYPES ===  */
import {
  LayoutDisplay,
  BottomActionPressHandler,
} from '@core/components/product/list/bottom-action.view';
/** === TYPES ===  */
export interface SortQuery {
  sortBy: string;
  sort: 'asc' | 'desc';
}

export interface FilterQuery {
  minPrice?: number;
  maxPrice?: number;
}

export interface FilterParams {
  priceGteMasking: string | number;
  priceLteMasking: string | number;
  priceGte: number;
  priceLte: number;
}

/** === HOOKS ===  */
export const useBottomAction = () => {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortDataIndex, setSortDataIndex] = useState(null);
  const [sortQuery, setSortQuery] = useState<SortQuery>({
    sortBy: '',
    sort: 'asc',
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filterQuery, setFilterQuery] = useState<FilterQuery | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    priceGteMasking: "",
    priceLteMasking: "",
    priceGte: 0,
    priceLte: 0
  });
  const [layoutDisplay, setLayoutDisplay] = useState<LayoutDisplay>('grid');

  const handleActionClick: BottomActionPressHandler = ({ type, value }) => {
    switch (type) {
      case 'sort':
        setSortModalVisible((prev) => !prev);
        break;
      case 'applySort':
        setSortQuery(value as SortQuery);
        setSortModalVisible(false);
        setSortActive(true);
        break;
      case 'filter':
        setFilterModalVisible((prev) => !prev);
        break;
      case 'applyFilter':
        // setFilterQuery
        setFilterQuery(value as FilterQuery);
        setFilterModalVisible(false);
        if(!filterQuery) {
          setFilterActive(false);
        } else {
          setFilterActive(true);
        }
        break;
      case 'resetFilter':
        setFilterActive(false);
        setFilterQuery(null);
        setFilterModalVisible(false);
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
    sortQuery,
    sortDataIndex,
    filterModalVisible,
    filterParams,
    filterActive,
    layoutDisplay,
    handleActionClick,
  };
};

export const useDataSort = () => {
  const sortData = [
    {
      name: 'Harga Tinggi ke Rendah',
      sortBy: 'retail_buying_price',
      sort: 'desc',
    },
    {
      name: 'Harga Rendah ke Tinggi',
      sortBy: 'retail_buying_price',
      sort: 'asc',
    },
  ];

  return {
    sortData
  }
}
