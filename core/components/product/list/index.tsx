/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import TagView from './tag.view';
import ItemView from './item.view';
import BottomActionView from './bottom-action.view';
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === IMPORT EXTERNAL COMPONENT HERE === */
interface ProductComponentProps {
  data: models.ListItemProps<models.ProductList[]>;
}
/** === COMPONENT === */
const ProductListView: React.FC<ProductComponentProps> = (props) => {
  /** === HOOK === */
  console.log(props.data);
  /** === VIEW === */
  /** => item */
  const item = () => {
    return <ItemView data={props.data} />;
  };
  /** => bottomAction */
  const bottomAction = () => {
    return <BottomActionView />;
  };
  /** => content */
  const content = () => {
    return <View style={{ flex: 1 }}>{item()}</View>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {content()}
      {bottomAction()}
    </SnbContainer>
  );
};

export default ProductListView;
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
