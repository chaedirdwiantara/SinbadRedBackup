/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Product'}
        backAction={() => goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>This page for list of product</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      <View>
        <SnbText.B1>This product</SnbText.B1>
      </View>
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
