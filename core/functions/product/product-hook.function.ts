/** === IMPORT PACKAGES ===  */
import { useState } from 'react';
/** === IMPORT FUNCTIONS ===  */
import { goToCategory } from '@screen/category/functions';
/** === IMPORT TYPES ===  */
import {
  LayoutDisplay,
  BottomActionPressHandler,
} from '@core/components/product/list/bottom-action.view';
/** === HOOKS ===  */
export const useBottomAction = () => {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [layoutDisplay, setLayoutDisplay] = useState<LayoutDisplay>('grid');

  const handleActionClick: BottomActionPressHandler = ({ type, value }) => {
    switch (type) {
      case 'sort':
        setSortModalVisible(true);
        console.log('Open sort modal');
        break;
      case 'filter':
        setFilterModalVisible(true);
        console.log('Open filter modal');
        break;
      case 'layout':
        setLayoutDisplay(value as LayoutDisplay);
        break;
      case 'category':
        goToCategory();
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  };

  return {
    sortModalVisible,
    filterModalVisible,
    layoutDisplay,
    handleActionClick,
  };
};
