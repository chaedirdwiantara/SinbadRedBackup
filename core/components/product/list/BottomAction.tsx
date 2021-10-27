/** === IMPORT PACKAGES ===  */
import React from 'react';
import { SnbBottomActions } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  buildBottomAction,
  buildBottomActionHandler,
} from '@core/functions/product';
/** === TYPES === */
export type LayoutDisplay = 'grid' | 'list';

export type BottomActionPressHandlerType =
  | 'sort'
  | 'applySort'
  | 'filter'
  | 'resetFilter'
  | 'applyFilter'
  | 'layout'
  | 'category';

export type SortIndex = number | null;

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export type BottomActionPressHandler = ({
  type,
  value,
}: {
  type: BottomActionPressHandlerType;
  value?: SortIndex | PriceRange;
}) => void;

interface BottomActionProps {
  sort?: boolean;
  filter?: boolean;
  layout?: boolean;
  category?: boolean;
  sortActive?: boolean;
  filterActive?: boolean;
  layoutDisplay?: LayoutDisplay;
  onActionPress: BottomActionPressHandler;
}
/** === COMPONENT === */
const BottomAction: React.FC<BottomActionProps> = ({
  onActionPress,
  ...props
}) => {
  /** === DERIVED VALUES === */
  const { actions, actionNames } = buildBottomAction(props);
  const handleActionPress = buildBottomActionHandler({
    onActionPress,
    actionNames,
  });
  /** === VIEW === */
  /** => Main */
  return <SnbBottomActions item={actions} onPress={handleActionPress} />;
};

export default BottomAction;
