/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack, goToProduct } from '../functions';
/** === COMPONENT === */
const CategoryView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Kategori'}
        backAction={() => goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>This page for list of category</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      <TouchableOpacity onPress={() => goToProduct()}>
        <SnbText.B1>Go To Product</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default CategoryView;
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
