/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import ProductHeaderView from './product-header.view';
import ProductTabView from './product-tab.view';
import ProductTagView from './product-tag.view';
import ProductItemView from './product-item.view';
import ProductBottomActionView from './product-bottom-action.view';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return <ProductHeaderView />;
  };
  /** => tab */
  const tab = () => {
    return <ProductTabView />;
  };
  /** => tag */
  const tag = () => {
    return <ProductTagView />;
  };
  /** => item */
  const item = () => {
    return <ProductItemView />;
  };
  /** => bottomAction */
  const bottomAction = () => {
    return <ProductBottomActionView />;
  };
  /** => content */
  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        {tab()}
        {tag()}
        {item()}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {bottomAction()}
    </SnbContainer>
  );
};

export default ProductView;
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
