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
/** === HOOKS ===  */
export const useBottomAction = () => {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [sortQuery, setSortQuery] = useState<SortQuery>({
    sortBy: '',
    sort: 'asc',
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
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
    sortQuery,
    filterModalVisible,
    filterActive,
    layoutDisplay,
    handleActionClick,
  };
};
