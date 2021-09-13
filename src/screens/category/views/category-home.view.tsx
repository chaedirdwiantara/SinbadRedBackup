/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { useProductListAction } from '../../product/functions';
/** === IMPORT STYLE HERE === */
import CategoryStyle from '../styles/category.style';
/** === COMPONENT === */
const CategoryHomeView: FC = () => {
  /** === HOOK === */
  const productListAction = useProductListAction();
  const { stateProduct, dispatchProduct } = React.useContext(
    contexts.ProductContext,
  );
  /** => main */
  return (
    <View style={CategoryStyle.categoryHomeContainer}>
      <TouchableOpacity onPress={() => productListAction.list(dispatchProduct)}>
        <SnbText.B1>Get List Product</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryHomeView;

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
