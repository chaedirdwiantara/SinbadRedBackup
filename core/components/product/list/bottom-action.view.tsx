/** === IMPORT PACKAGES ===  */
import React from 'react';
import { SnbBottomActions } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  getBottomActionHandler,
  buildBottomAction,
} from '@core/functions/product';
/** === TYPES === */
export type BottomActionType = 'sort' | 'filter' | 'layout' | 'category';
export type LayoutDisplay = 'grid' | 'list';
export type BottomActionPressHandler = ({
  type,
  value,
}: {
  type: BottomActionType;
  value?: LayoutDisplay;
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
  ...booleanProps
}) => {
  /** === DERIVED VALUES === */
  const { actions, actionNames } = buildBottomAction(booleanProps);
  const handleActionPress = getBottomActionHandler({
    onActionPress,
    actionNames,
    layoutDisplay: booleanProps.layoutDisplay ?? 'grid',
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
