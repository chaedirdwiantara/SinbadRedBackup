/** === IMPORT PACKAGES ===  */
import React from 'react';
import { SnbBottomActions } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  getBottomActionHandler,
  buildBottomAction,
  SortQuery,
} from '@core/functions/product';
/** === TYPES === */
export type BottomActionType = 'sort' | 'filter' | 'layout' | 'category';
export type LayoutDisplay = 'grid' | 'list';
export type BottomActionPressHandlerType =
  | 'sort'
  | 'applySort'
  | 'filter'
  | 'resetFilter'
  | 'applyFilter'
  | 'layout'
  | 'category';
export type BottomActionPressHandler = ({
  type,
  value,
}: {
  type: BottomActionPressHandlerType;
  value?: SortQuery; // add FilterQuery type/interface in product-hook.function
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
const BottomActionView: React.FC<BottomActionProps> = ({
  onActionPress,
  ...props
}) => {
  /** === DERIVED VALUES === */
  const { actions, actionNames } = buildBottomAction(props);
  const handleActionPress = getBottomActionHandler({
    onActionPress,
    actionNames,
  });
  /** === VIEW === */
  /** => Main */
  return <SnbBottomActions item={actions} onPress={handleActionPress} />;
};

export default BottomActionView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 12-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
