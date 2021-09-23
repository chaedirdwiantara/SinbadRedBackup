/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbBottomActions,
  SnbTabs,
  SnbChipsSlider,
} from 'react-native-sinbad-ui';
import { goBack, useTag } from '../functions';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === COMPONENT === */
const ProductTagView: React.FC = () => {
  /** === HOOK === */
  const { tags, selectTab } = useTag();
  /** === VIEW === */
  /** => main */
  return (
    <View style={{ paddingVertical: 8 }}>
      <SnbChipsSlider
        chipsList={tags}
        parentFunction={(item) => selectTab(item)}
      />
    </View>
  );
};

export default ProductTagView;
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
