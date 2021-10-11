/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import GridLayoutView from './grid-layout.view';
import ListLayoutView from './list-layout.view';
interface ListProps {
  data: models.ListItemProps<models.ProductList[]>;
}
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === COMPONENT === */
const ItemView: React.FC = () => {
  /** === VIEW === */
  /** => main */
  return <GridLayoutView />;
};

export default ItemView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
